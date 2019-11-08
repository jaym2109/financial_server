const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const sql = require("mssql");
require("msnodesqlv8");

const sqlConfig = require("../../config/sqlConfig");
const sqlQueries = require("../../config/sqlQueries");

// @route   GET api/financials
// @desc    Financials for all viewpoint and spruce queries
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    // Viewpoint Query request
    let pool1 = await sql.connect(sqlConfig.viewpoint);
    let results1 = await pool1.request().query(sqlQueries.viewpointQuery());

    // SpruceWare Query request
    let pool2 = await sql.connect(sqlConfig.spruce);
    let results2 = await pool2.request().query(sqlQueries.spruceQuery());

    // Microsoft Dynamics GP request
    let pool3 = await sql.connect(sqlConfig.dynamicsGP);
    let results3 = await pool3.request().query(sqlQueries.dynamicsQuery());
    let consolidatedResults = [];

    await results1.map(result => {
      result.Account = parseInt(result.Account);
      consolidatedResults.push(result);
    });

    await results2.map(result => {
      if (result.PostCycleNumber <= 2) {
        result.month = result.PostCycleNumber + 10;
        result.year = result.PostFiscalYear - 1;
      } else {
        result.month = result.PostCycleNumber - 2;
        result.year = result.PostFiscalYear;
      }

      if (
        result.Type === "budget" &&
        result.Account >= 40000 &&
        result.Account < 50000
      ) {
        result.Amount = -result.Amount;
      }
      result.Mth = new Date(result.year, result.month - 1, 1);
      consolidatedResults.push({
        GLCo: result.GLCo,
        Account: result.Account,
        Mth: result.Mth,
        Amount: result.Amount,
        Type: result.Type
      });
    });

    await results3.map(result => {
      result.Account = parseInt(result.Account);
      result.GLCo = parseInt(result.Company) === 601 ? 6 : 10;
      consolidatedResults.push({
        GLCo: result.GLCo,
        Mth: result.Mth,
        Account: result.Account,
        Amount: result.Amount,
        Type: result.Type
      });
    });
    res.json([{ consolidated: consolidatedResults }]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json([{ error: "SQL Query Error" }]);
  }
  sql.on("error", err => {
    console.error(err.message);
    res.status(500).json([{ error: "SQL Connection Error" }]);
  });
});

module.exports = router;

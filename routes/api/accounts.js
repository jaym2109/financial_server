const express = require("express");
const router = express.Router();

// Accounts File
const accounts = require("../../config/accounts.json");

// @route GET api/accounts
// @desc Get accounts
// @access Public
router.get("/", (req, res) => {
  accounts[0].sections.map(section => {
    if (section.type === "accounts") {
      section.accounts.map(account => {
        if (account.glacct.length > 0) {
          account.glacct.map(gl => {
            if (gl < 10000 || gl >= 100099) {
              accounts[1].sections[2].subsections[0].accounts[7].glacct.push(
                gl
              );
            }
          });
        }
      });
    }
  });

  return res.json(accounts);
});

module.exports = router;

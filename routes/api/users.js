const express = require("express");
const router = express.Router();
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

// Init Models
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register User
// @access  Private
router.post(
  "/",
  auth,
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      password,
      isAdmin,
      companys,
      defaultCompany
    } = req.body;

    console.log(isAdmin); 

    try {
      // See if there is a logged on user
      const loggedOnUser = await User.findById(req.user.id).select("-password");

      if (loggedOnUser.isAdmin) {
        // See if user exists
        let user = await User.findOne({ email });

        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User already exists" }] });
        }

        user = new User({
          name,
          email,
          password,
          isAdmin,
          companys,
          defaultCompany
        });
        // Encrypt password
        const salt = await bcrpyt.genSalt(10);

        user.password = await bcrpyt.hash(password, salt);

        await user.save();

        // Return jsonwebtoken
        const payload = {
          user: {
            id: user.id
          }
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 360000 }, // reset this to 3600
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } else {
        return res
          .status(400)
          .json({ msg: "You must be an administrator to access this route" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

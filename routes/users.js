var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR));
require("dotenv").config();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async function (req, res, next) {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltrounds);

    //create and store user
    const result = await User.create({
      username: username,
      password: password,
      email: email,
    });

    console.log(result);
  } catch (err) {
    res.send(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username: username,
    //first username is the title of the column in db, second username is the username from the body
  });

  if (user) {
    const comparePasswords = bcrypt.compareSync(password, user.password);
    if (comparePasswords) {
      const token = jwt.sign(
        {
          data: user.username,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.cookie("userToken", token);
      res.send("login successful");
      // res.redirect(`/profile/${user.id}`);
    } else {
      res.send("incorrect password, try again");
    }
  } else {
    res.send("cannot find user");
  }
});

module.exports = router;

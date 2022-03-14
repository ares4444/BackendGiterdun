var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async function (req, res, next) {
  const { username, password, email } = req.body;

  try {
    // const hashedPassword = await bcrypt.hash(password, 10)

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

router.post("/login", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;

var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
// const { userSchema } = require("../models/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", function (req, res, next) {
  const { username, password, email } = req.body;

  // const userSchema = new Schema();
  // userSchema.add({ username: "string", password: "password", price: email });

  // const createSchema = await userSchema.create({
  //   username: username,
  //   password: password,
  //   email: email,
  // });

  // console.log(username, password, email);
});

router.post("/login", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;

var express = require("express");
var router = express.Router();
const User = require("../models/User");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const allTodo = await User.find();
  
  res.render("index", {todo: allTodo});
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.get("/profile", async function (req, res, next) {
  res.render("profile", {});
});

module.exports = router;

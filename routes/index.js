var express = require("express");
var router = express.Router();
const User = require("../models/User");
const List = require("../models/List");
const isValidToken = require("../middleware/isValidToken");
const jwt = require("jsonwebtoken");
// const User = require("../models/User");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const allList = await List.find();
  res.render("index", {list: allList})
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.get("/profile/:id", isValidToken, async function (req, res, next) {
  const token = req.cookies["token"];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  var tokenUserId = decoded.userId;
  // console.log("the unique user ID is:", userId);

  const list = await List.findOne({
    userId: tokenUserId,
  });

  // console.log("user profile documents are:", user);
  res.render("profile", { listTitle: list.listTitle });
});

module.exports = router;

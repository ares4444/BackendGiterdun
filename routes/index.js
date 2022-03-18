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
  var userId = decoded.userId;
  // console.log("the unique user ID is:", userId);

  const user = await User.findOne({
    _id: userId,
  });

  // console.log("user profile documents are:", user);
  res.render("profile", { name: user.username, lists: user.lists });
});

module.exports = router;

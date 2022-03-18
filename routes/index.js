var express = require("express");
var router = express.Router();
const User = require("../models/User");
const isValidToken = require("../middleware/isValidToken");
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
  const { id } = req.params;

  const user = await User.findOne({
    _id: id,
  });

  console.log(user);
  res.render("profile", { name: user.username });
});

module.exports = router;

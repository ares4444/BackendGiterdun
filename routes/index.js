var express = require("express");
var router = express.Router();
const User = require("../models/User");
const List = require("../models/List");
const isValidToken = require("../middleware/isValidToken");
const jwt = require("jsonwebtoken");
// const User = require("../models/User");

/* GET home page. */
router.get("/", async (req, res, next) => {
  // const allList = await List.find();
  res.render("index");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.get("/profile/:id", isValidToken, async function (req, res) {
  const token = req.cookies["token"];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  var userTokenId = decoded.userId;

  const lists = await List.find({
    userId: userTokenId,
  });

  function renderPage(lists) {
    res.render("profile", { userLists: lists });
  }

  renderPage(lists);
});

router.get("/testRoute", async function (req, res, next) {
  const token = req.cookies["token"];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  var userTokenId = decoded.userId;

  const list = await List.find({
    userId: userTokenId,
  });

  let listsHtml = "";

  for (let i = 0; i < list.length; i++) {
    let titleHtml = `<h1>${list[i].listTitle}</h1>`;
    listsHtml += titleHtml;
    for (let j = 0; j < list[i].tasks.length; j++) {
      let taskHtml = `<li class="list-group-item">${list[i].tasks[j]}</li>`;
      listsHtml += taskHtml;
    }
  }

  console.log(listsHtml);
});
module.exports = router;

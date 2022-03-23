var express = require("express");
var router = express.Router();
const User = require("../models/User");
const List = require("../models/List");
const Task = require("../models/Task");
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

router.get("/list/:listId", isValidToken, async function (req, res) {
  const token = req.cookies["token"];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  var userTokenId = decoded.userId;

  const { listId } = req.params;
  const thisList = await List.findOne({
    _id: listId,
  });

  const tasks = await Task.find({
    listId: listId,
  });

  res.render("list", { singleList: thisList, tasks, listTasks: tasks });
});

module.exports = router;

var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const User = require("../models/User");
const List = require("../models/List");
const Task = require("../models/Task");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR));
require("dotenv").config();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/newList", async (req, res, next) => {
  const token = req.cookies["token"];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  var tokenUserId = decoded.userId;

  const { newListName } = req.body;

  try {
    //create and store List
    const createdList = await List.create({
      userId: tokenUserId,
      listTitle: newListName,
      tasks: [],
    });
    res.redirect(`/profile/${tokenUserId}`);
    console.log(createdList);
  } catch (err) {
    res.send(err);
  }
});

router.post("/newTask/:listId", async (req, res, next) => {
  const token = req.cookies["token"];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  var tokenUserId = decoded.userId;
  console.log(tokenUserId);

  const { listId } = req.params;
  console.log("button list ID is:", listId);
  const { newTaskText } = req.body;
  console.log("new task typed in:", newTaskText);

  try {
    //create and store Task
    const createdTask = await Task.create({
      userId: tokenUserId,
      listId: listId,
      task: newTaskText,
    });
    res.redirect(`/list/${listId}`);
    console.log(createdTask);
  } catch (err) {
    res.send(err);
  }
});

router.post("/register", async function (req, res, next) {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //create and store user
    const result = await User.create({
      username: username,
      password: hashedPassword,
      email: email,
    });
    res.redirect("../login");
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
    // console.log(comparePasswords);
    if (comparePasswords) {
      const token = jwt.sign(
        {
          data: user.username,
          userId: user._id,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.cookie("token", token);
      res.redirect(`/profile/${user._id}`);
    } else {
      res.send("incorrect password, try again");
    }
  } else {
    res.send("cannot find user");
  }
});

// router.delete("/deleteList/:listId", async (req, res, next) => {
//   const { listId } = req.params;

//   await List.findByIdAndRemove(listId);
//   console.log("deleted list");
//   res.redirect(`/list/${listId}`);
// });

router.delete("/deleteTask/:taskId/:listId", async (req, res, next) => {
  const { taskId, listId } = req.params;

  await Task.findByIdAndRemove(taskId);
  console.log("deleted task");

  res.redirect(`/list/${listId}`);
});

module.exports = router;

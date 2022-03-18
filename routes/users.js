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

router.post("/newList", async (req, res, next) => {
  const token = req.cookies["token"];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  var userId = decoded.userId;
  console.log(userId);

  const { newListName } = req.body;

  const user = await User.findOne({
    _id: userId,
  });

  console.log("starting user list:", user.lists);

  await User.findOneAndUpdate(
    { _id: userId },
    { $set: { lists: newListName } },
    console.log("result:", user.lists)
  );
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
      lists: {},
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

module.exports = router;

var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const User = require("../models/User");
const List = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR));
require("dotenv").config();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/newList", async (req, res, next) => {
  const { list } = req.body;
  console.log(list);
//   const user = await User.findOne({
//     username: username,
//   });
// });

  const newList = new List({list})
  
  newList.save()
  .then(() => {
    console.log("successfully added List!");
    res.render("../views/profile.ejs", {list});
    next()
  })
  .catch((err) => console.log(err))
})
.patch("/newList/:_id", (req, res, next) => {
  const { _id } = req.params;
  list.update({"items._id": 1}, {"$set": {
    'items.$.name': 'updated item1',
    'items.$.value': 'one updated'
  }})
  .catch((err) => console.log(err));
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
    console.log(comparePasswords);
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
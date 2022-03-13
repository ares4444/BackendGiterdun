var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new Schema({
  username: String,
  password: String,
  email: String,
  lists: {
    type: Map,
    of: Array,
  },
});
var userSchema = mongoose.model("User", user);
module.exports = userSchema;

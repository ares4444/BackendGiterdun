var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  lists: {
    type: Map,
    of: Array,
  },
  refreshToken: String,
});

// var listSchema = new Schema({
//   list: {
//     type: { type: Schema.Types.ObjectId, ref: "User" },
//     of: [String],
//     items: [{ id: Number, name: String, value: Number }],
//   },
// });

module.exports = mongoose.model("User", userSchema);

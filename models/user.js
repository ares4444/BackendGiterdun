var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  _id: Schema.Types.ObjectId,
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

  refreshToken: String,
});

var listSchema = new Schema({
  list: {
    type: { type: Schema.Types.ObjectId, ref: 'User' },
    of: [String],
    items: [
      {id: Number,
      name: String,
      value: Number
    }]
  },
});

module.exports = mongoose.model("List", listSchema);
module.exports = mongoose.model("User", userSchema);



var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var listSchema = new Schema({
  userId: {
    type: String,
  },
  listTitle: {
    type: String,
  },
});

module.exports = mongoose.model("List", listSchema);

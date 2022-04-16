var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  userId: {
    type: String,
  },
  listId: {
    type: String,
  },
  task: {
    type: String,
  },
});

module.exports = mongoose.model("Task", taskSchema);

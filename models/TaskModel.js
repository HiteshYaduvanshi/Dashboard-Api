const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  project: {
    type: String,
    required: true,
    lowercase: true
  },
  status: {
    type: String,
    default: "open",
    lowercase: true
  },
  type: {
    type: String,
    required: true,
    lowercase: true
  },
  priority: {
    type: String,
    required: true,
  },
  details:{
    type: String,
    required: true,
    lowercase: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  id:{
    type: Number,
    required: true,
  },
  projectTitle: {
    type: String,
    required: true,
    lowercase: true
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    required: true,
    lowercase: true
  },
  status: {
    type: String,
    default: "active",
    lowercase: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
});


const Project = mongoose.model("Project", projectSchema)

module.exports = Project;
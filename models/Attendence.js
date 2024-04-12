const mongoose = require("mongoose");

const attendenceSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String,
    required: true,
    // unique: true,
  },
  checkInTime: {
    type: Date,
    default: null,
  },
  checkOutTime: {
    type: Date,
    default: null,
  },
  breakStart:{
    type: Date,
    default: null,
  },
  breakEnd:{
    type: Date,
    default: null,
  }
});

const Attendence = mongoose.model("Attendence", attendenceSchema)

module.exports = Attendence
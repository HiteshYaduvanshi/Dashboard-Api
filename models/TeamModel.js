const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
})

const Team = mongoose.model("Team", teamSchema)

module.exports = Team

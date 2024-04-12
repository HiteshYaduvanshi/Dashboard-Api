const mongoose = require("mongoose");

const LeaveSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applyDate: {
        type: Date,
        default: Date.now
    },
    startDate: {
        type: Date,
        
    },
    endDate : {
        type: Date,
        
    },
    leaveType: {
        type: String,
        
    },
    status: {
        type: String,
        default: "pending",
        lowercase: true
    },
    leaveReason: {
        type: String,
        
    }
})

const Leave = mongoose.model('Leave', LeaveSchema)

module.exports = Leave
const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
    ticketID:{
        type: String,
        unique: true,
    },
    ticketSubject:{
        type: String,
        required: true,
        lowercase: true
    },
    createdDate:{
        type: Date,
        default: Date.now,
    },
    priority:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: 'New',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

TicketSchema.pre('save', async function(next) {
    if (!this.ticketID) {
        let newTicketID = 1;
        let found = false;
        while (!found) {
            const existingTicket = await this.constructor.findOne({ ticketID: newTicketID });
            if (!existingTicket) {
                found = true;
            } else {
                newTicketID++;
            }
        }
        this.ticketID = newTicketID.toString();
    }
    next();
});


const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
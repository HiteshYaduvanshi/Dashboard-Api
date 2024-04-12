const mongoose = require('mongoose');
const URL = "mongodb+srv://hiteshyaduvanshi85:Defaulter@cluster0.kuasrtw.mongodb.net/dashboard?retryWrites=true&w=majority&appName=Cluster0"

const connectDatabase = async ()=>{
    try {
        await mongoose.connect(URL)
        console.log("database connection established");
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDatabase
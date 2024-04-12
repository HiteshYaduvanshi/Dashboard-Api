const mongoose = require('mongoose');
const URL = "mongodb://127.0.0.1:27017/dashboard"

const connectDatabase = async ()=>{
    try {
        await mongoose.connect(URL)
        console.log("database connection established");
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDatabase
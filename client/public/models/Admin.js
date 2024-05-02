const mongoose = require("mongoose")

const Admin = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    date : {
        type : Date,
        default : Date.now
    },
})

module.exports = mongoose.model("Admin", Admin);
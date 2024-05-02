const mongoose = require("mongoose")

const Employee = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    mobile : {
        type : String,
        require : true
    },
    designation : {
        type : String,
        require : true
    },
    gender : {
        type : String,
        require : true
    },
    course : {
        type : String,
        require : true
    },
    file : {
        type : Object,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
})

module.exports = mongoose.model("Employee", Employee);
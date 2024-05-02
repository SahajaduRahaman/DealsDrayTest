const mongoose = require("mongoose")
const env = require("dotenv")

env.config()

const DATABASE_URL = process.env.DATABASE_URL

const ConnectToDatabase = (() => {
    mongoose.connect(DATABASE_URL, console.log("Database connected."))
})

module.exports = ConnectToDatabase

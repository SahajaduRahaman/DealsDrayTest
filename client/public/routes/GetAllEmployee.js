const express = require("express")
const Employee = require("../models/Employee")
const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const employee = await Employee.find({})

        res.status(200).json({
            status : "success",
            message : "All employee fetched successfully.",
            employee : employee
        })
    }
    catch (error) {
        res.status(500).send("Internal server error.")
    }
})

module.exports = router;
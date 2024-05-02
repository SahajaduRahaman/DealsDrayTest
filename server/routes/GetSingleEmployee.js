const express = require("express")
const Employee = require("../models/Employee")
const router = express.Router()

router.get("/:id", async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)

        if (!employee) {
            return res.status(404).send("Employee does not exist.")
        }

        res.status(200).json({
            status : "success",
            message : "Employee get successfully.",
            employee : employee
        })
    }
    catch (error) {
        res.status(500).send("Internal server error.")
    }


})

module.exports = router;
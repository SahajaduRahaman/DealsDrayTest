const express = require("express")
const FetchAdmin = require("../middleware/FetchAdmin")
const Employee = require("../models/Employee")
const cloudinary = require("../cloudinary")

const router = express.Router();

router.delete("/:id", FetchAdmin, async (req, res) => {
    try {
        let employee = await Employee.findById(req.params.id)

        if (!employee) {
            return res.status(404).send("Employee not found.")
        }

        const cloudinaryFilePath = employee.file.public_id

        if (cloudinaryFilePath) {
            await cloudinary.uploader.destroy(cloudinaryFilePath)
        }

        employee = await Employee.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status : "success",
            message : "Employee deleted successfully."
        })
    }
    catch (error) {
        res.status(500).send("Internel server error.")
    }
})

module.exports = router;
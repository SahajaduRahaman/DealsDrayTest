const express = require("express")
const Employee = require("../models/Employee")
const FetchAdmin = require("../middleware/FetchAdmin")
const ValidateEmployee = require("../middleware/ValidateEmployee")
const upload = require("../Storage")
const router = express.Router();
const fs = require('fs');
const cloudinary = require("../cloudinary")


router.post("/", FetchAdmin, upload.single("file"), ValidateEmployee, async (req, res) => {
    const { name, email, mobile, designation, gender, course, date } = req.body;
    const reqFile = req.file
    
    try {
        let result = await cloudinary.uploader.upload(reqFile.path, {
            upload_preset: "deals-dray"
        })
        if (result) {

            let employee = await Employee({
                adminId : req.admin.id,
                adminName : req.admin.name,
                file : result,
                name : name,
                email : email,
                mobile : mobile,
                designation : designation,
                gender : gender,
                course : course,
                date : date
            })

            employee.save();

            const filePath = `${employee.file.original_filename}.${employee.file.format}`;

            fs.unlink(`public/Files/${filePath}`, (err) => {
                if (err) {
                    console.error(err);
                }
            });

            res.status(200).json({
                status : "success",
                message : "Employee added successfully.",
            })
        }
    }
    catch (error) {
        res.status(500).send({
            status: "Internal server down.",
            message: "Internal server down.",
            error : error
        })
    }

})

module.exports = router;
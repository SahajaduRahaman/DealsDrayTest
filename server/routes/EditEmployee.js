const express = require("express");
const Employee = require("../models/Employee");
const upload = require("../Storage");
const fs = require("fs");
const cloudinary = require("../cloudinary");

const router = express.Router();

router.put("/:id", upload.single("file"), async (req, res) => {
  const { name, email, mobile, designation, gender, course, active } = req.body;
  const file = req.file;

  try {
    let employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).send("Item not found.");
    }

    const currentEmployee = {};

    if (file) {
      const cloudinaryFilePath = employee.file.public_id;

      if (cloudinaryFilePath) {
        cloudinary.uploader.destroy(cloudinaryFilePath);
      }

      let result = await cloudinary.uploader.upload(file.path, {
        upload_preset: "deals-dray",
      });

      currentEmployee.file = result;

      const filePath = `${currentEmployee.file.original_filename}.${currentEmployee.file.format}`;

      fs.unlink(`public/Files/${filePath}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    if (name) {
      currentEmployee.name = name;
    }

    if (email) {
      currentEmployee.email = email;
    }

    if (mobile) {
      currentEmployee.mobile = mobile;
    }

    if (designation) {
      currentEmployee.designation = designation;
    }

    if (gender) {
      currentEmployee.gender = gender;
    }

    if (course) {
      currentEmployee.course = course;
    }

    if (active !== undefined) {
      currentEmployee.active = active;
    }

    let data = await Employee.findByIdAndUpdate(req.params.id, currentEmployee);

    res.status(200).json({
      status: "success",
      message: "Employee updated successfully.",
      employee: currentEmployee,
    });
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;

const express = require("express");
const Employee = require("../models/Employee");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { deepFilter } = req.query;

    const filters = deepFilter ? JSON.parse(deepFilter) : {};
    const { sortBy, column } = filters || {};


    let query = Employee.find();

    if (sortBy && column) {
      query.sort({ [column]: sortBy === "asc" ? 1 : -1 });
    }

    const employee = await query;

    res.status(200).json({
      status: "success",
      message: "All employee fetched successfully.",
      employee: employee,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;

const express = require("express")
const FetchAdmin = require("../middleware/FetchAdmin")
const Admin = require("../models/Admin")

const router = express.Router()

router.post("/", FetchAdmin, async (req, res) => {

    try {
        const id = req.admin.id

        const admin = await Admin.findById(id)

        res.status(200).json({
            status : "success",
            message : "Admin fetched successfully.",
            admin : admin
        })
    }

    catch (error) {
        req.status(500).send("Internel server error.")
    }
})

module.exports = router;
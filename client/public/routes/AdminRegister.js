const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Admin = require("../models/Admin")

const router = express.Router()
const secretKey = process.env.SECRET_KEY;

router.post("/", async (req, res) => {
    const {name, email, password} = req.body

    try {
        let admin = await Admin.findOne({email});

        if (admin) {
            return res.status(400).json({
                message : "Email already registered."
            })
        }

        const salt = await bcrypt.genSalt(10)
        const secPassword = await bcrypt.hash(password, salt)

        admin = await Admin({
            name : name,
            email : email,
            password : secPassword,
        })

        admin.save();

        const data = {
            admin : {
                id : admin.id,
                name : admin.name
            }
        }

        const authToken = jwt.sign(data, secretKey)

        res.status(200).json({
            status : "success",
            message : "Admin registered successfully.",
            authToken : authToken
        })
    }

    catch (error) {
        res.status(500).json({
            message : "Internal server error."
        })
    }
})

module.exports = router;
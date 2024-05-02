const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const ValidateLogin = require("../middleware/ValidateLogin")
const Admin = require("../models/Admin")

const router = express.Router()

const secretKey = process.env.SECRET_KEY;

router.post("/", ValidateLogin, async (req, res) => {
    const {email, password} = req.body

    try {
        let admin = await Admin.findOne({email})

        if (!admin) {
            return res.status(400).json({
                message : "Please provide valid credentials."
            })
        }

        const comparePassword = await bcrypt.compare(password, admin.password)

        if (!comparePassword) {
            return res.status(400).json({
                message : "Please provide valid credentials."
            })
        }

        const data = {
            admin : {
                id : admin.id,
                name : admin.name
            }
        }

        const authToken = jwt.sign(data, secretKey)

        res.status(200).json({
            status : "success",
            message : "Logged in successfully.",
            authToken : authToken
        })

    }
    catch (error) {
        res.status(500).send("Internel server error.")
    }    
})

module.exports = router


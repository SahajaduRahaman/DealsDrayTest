const ValidateLogin = (req, res, next) => {
    
    const {email, password} = req.body

    if (!email) {
        return res.status(400).json({
            message : "Please provide email."
        })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message : "Please provide valid email."
        })
    }

    if (!password) {
        return res.status(400).json({
            message : "Please provide password."
        })
    }

    next();
}

module.exports = ValidateLogin;
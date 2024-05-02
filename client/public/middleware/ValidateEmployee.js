const ValidateEmployee = (req, res, next) => {
    const {name, email, mobile, designation, gender, course} = req.body

    //designation gender course file

    if (!name || !email || !mobile || !designation || !gender || !course ) {
        return res.status(400).json({
            message : "Please provide all fields."
        })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message : "Please provide correct email."
        })
    }

    const mobileRegex = /^[0-9]{10}$/;

    if (!mobileRegex.test(mobile)) {
        return res.status(400).json({
            message : "Please provide correct mobile."
        })
    }

    next()
}

module.exports = ValidateEmployee;


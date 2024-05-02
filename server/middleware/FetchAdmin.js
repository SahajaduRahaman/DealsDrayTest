const jwtToken = require("jsonwebtoken")

const secretKey = process.env.SECRET_KEY;

const FetchAdmin = (req, res, next) => {
    const authToken = req.header("authToken")

    if (!authToken) {
        return res.status(401).json({
            message : "Please provide valid authToken."
        })
    }

    try {
        const data = jwtToken.verify(authToken, secretKey)

        req.admin = data.admin;

        next();
    } 
    catch (error) {
        return res.status(401).json({
            message : "Internal auth error.",
            error : error
        })
    }

}

module.exports = FetchAdmin;
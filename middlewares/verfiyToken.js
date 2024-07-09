const jwt = require("jsonwebtoken")

function verfiyToken(req, res, next) {
    const token = req.headers.token
    if (token) {
        try {
            const decode = jwt.verify(token, process.env.SECRET_KEY)
            req.user = decode
            next()
        } catch (error) {
            res.status(401).json({ message: error })
        }
    } else {
        res.status(401).json({ message: " no token0" })
    }
}
module.exports={
    verfiyToken,
}
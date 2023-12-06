require('dotenv').config()
const jwt = require('jsonwebtoken')


function generateAccessToken(user) {

    const payload = {
        id: user._id,
        name: user.name,
        mail: user.mail
    }

    const secret = process.env.SECRET_KEY
    const options = { expiresIn: '2h'}
    return jwt.sign(payload, secret, options)
}


function verifyAccessToken(token) {
    const secret = process.env.SECRET_KEY

    try {
        const decoded = jwt.verify(token, secret)
        return { success: true, data: decoded }
    } catch (error) {
        return { success: false, error: error.message}
    }
}

function authenticateToken (req, res, next) {
    const token = req.cookies.SessionID
    console.log('está authenticando')

    if(!token) {
        console.log("no existe el token")
        return res.status(401).json({error: "Not authorized"})
    }

    const result = verifyAccessToken(token)

    if(!result.success) {
        return res.status(403).json({ error: result.error })
    }

    console.log(result.data)
    req.user = result.data;
    req.success = true;
    next();
}


module.exports = {generateAccessToken, verifyAccessToken, authenticateToken};

const jwt = require('jsonwebtoken')
require('dotenv').config();

// For authenticating the user
const verifyToken = (req, res, next) => {
    // const authHeader = req.headers.token;
    const authHeader = req.header('Authorization');
    
    // console.log("authHeader ", authHeader)

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        // console.log("Token ", token)

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.json({
                    status: 403,
                    message: "Token is invalid"
                });
            }

            req.user = user;
            //console.log("The user is ", user)
            next();
        });
    } else {
        return res.json({
            status: 401,
            message: "Unauthorized"
        });
    }
}


//Permission granted if the user wants is same or the user is the admin
// eg. A user can update their own information or admin can update any other information
const tokenVerifyAndAuthenticate = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.body.id || req.user.isAdmin) {
            next();
        } else {
            return res.json({
                status: 403,
                message: "You are not allowed"
            })
        }
    })
}


//Permission for only admin
const tokenVerifyAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.json({
                status: 403,
                message: "You are not allowed"
            })
        }
    })
}

module.exports = {
    verifyToken,
    tokenVerifyAndAuthenticate,
    tokenVerifyAndAdmin
}
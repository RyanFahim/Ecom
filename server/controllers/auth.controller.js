const User = require("../models/user.model")
const CryptoJS = require('crypto-js')
require('dotenv').config();
const jwt = require('jsonwebtoken')


//User registration
const userRegistration = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_PASSWORD_SECRET)
    });
    try {
        const savedUser = await newUser.save();

        res.json({
            status: 201,
            message: "New user added",
            body: savedUser
        })
    } catch (err) {
        res.json({
            status: 500,
            error: err,
        })
    }
}

//User Login
const userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.json({
                status: 401,
                success: false,
                message: "Wrong Credentials"
            })
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_PASSWORD_SECRET);
        console.log("Hashed password is ", hashedPassword)
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        console.log("original password is ", originalPassword)

        const inputPassword = req.body.password;
        console.log("input password is ", inputPassword)

        if (originalPassword != inputPassword) {
            return res.json({
                status: 401,
                message: "Wrong Credentials"
            });
        }
        else {
            const accessToken = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.JWT_SECRET,
                // {expiresIn: "3d"}
            )

            return res.json({
                status: 200,
                success: true,
                body: accessToken
            })
        }

        // originalPassword != inputPassword && res.json({
        //     status: 401,
        //     message: "Wrong Credentials"
        // });




    } catch (error) {
        res.json({
            status: 500,
            error: error,
        })
    }

}
module.exports = { userRegistration, userLogin }
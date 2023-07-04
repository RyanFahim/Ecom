const User = require('../models/user.model');
require('dotenv').config();
const CryptoJS = require("crypto-js")



//Update user
const updateUser = async(req, res) => {
    
    try{
        console.log(req.body.id)
        const updatedUser = await User.findByIdAndUpdate(req.body.id,{
            username: req.body.username,
            email: req.body.email,
            
            // password: req.body.password
        }, {new:true} )

        

        return res.json({
            status: 200,
            message: "Updated SUccessful",
            body: updatedUser

        })
    }
    catch(error){
        return res.json({
            status:500,
            error: "asd"
        })
    }
}


//Delete user
const deleteUser = async(req, res) => {
    try{
        console.log(req.body.id)
        const user = await User.findByIdAndDelete(req.body.id)

        res.json({
            status: 200,
            message: "The user has been deleted",
            body: user
        })
    }
    catch(error){
        res.json({
            status: 500,
            error: error
        })
    }
}

//get user information
const getUserInformation = async(req,res) =>{

    try{
        const user = await User.findById(req.body.id)
        console.log(user)
        const {password, ...others} = user._doc
        res.json({
            status: 200,
            message: "User information is shown",
            body: others
        })
    }
    catch(error){
        res.json({
            status: 500,
            error: error

        })
    }
}

//Get ALL users
const getAllUser = async(req, res) => {
    try{

        const users = await User.find().sort({_id: -1}).limit(2)

        res.json({
            status: 200,
            message: "User information is shown",
            body: users
        })


    }
    catch(error){
        res.json({
            status: 500,
            error:error
        })
    }
}

module.exports ={
    updateUser,
    deleteUser,
    getUserInformation,
    getAllUser
}
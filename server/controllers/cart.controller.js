const Cart = require('../models/cart.model')


//Create a cart
const addCart = async(req, res) => {
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save();
        res.json({
            status: 200,
            message: "Cart added",
            body: savedCart
        })
    }
    catch(err){
        res.status(500).json(err)
    }
}

//Update cart
const updateCart = async(req,res) => {
    
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.body.id,{
            $set: req.body,
        }, { new:true } )

        res.json({
            status: 200,
            message: "Cart updated successfully",
            body: updatedCart
        })
    }
    catch(err){
        res.status(500).json(err)
    }
}

//Delete a cart
const deleteCart = async(req, res) => {

    try{
        const deletedCart = await Cart.findByIdAndDelete(req.body.id)

        res.json({
            status: 200,
            message: "Cart deleted successfully",
            body: deletedCart
        })
    }
    catch(err){
        res.status(500).json(err)
    }
}

//Get user cart
const getUserCart = async (req,res) => {

    try{
        const cart = await Cart.findOne({userId: req.body.userId})

        res.json({
            status: 200,
            message: "Cart of the user",
            body: cart
        })

    }
    catch(err){
        res.status(500).json(err)
    }
}


// Get all carts
const getAllCart = async(req, res) =>{
    try{
        const carts = await Cart.find();
        res.json({
            status: 200,
            message: "All carts",
            body: carts
        })
    }
    catch(err){
        res.status(500).json(err)
    }
}

module.exports = {
    addCart,
    updateCart,
    deleteCart,
    getUserCart,
    getAllCart
}
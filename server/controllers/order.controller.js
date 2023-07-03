const Order = require('../models/order.model')

//Create order
const createOrder = async(req,res) => {
    const newOrder = new Order (req.body)

    try{
        const savedOrder = await newOrder.save();

        res.json({
            status: 200,
            message: "order has been placed",
            body: savedOrder
        })
    }
    catch(err){
        res.status(500).json(err)
    }
}

//Update order
const updateOrder = async(req,res) => {
    try{
        const updatedOrder = await order.findByIdAndUpdate(req.body.id,{
            $set: req.body,
        }, { new:true } )

        res.json({
            status: 200,
            message: "Order updated successfully",
            body: updatedOrder
        })
    }
    catch(err){
        res.status(500).json(err)
    }
}

//Delete order
const deleteOrder = async(req, res) => {

    try{
        const deletedOrder = await Order.findByIdAndDelete(req.body.id)

        res.json({
            status: 200,
            message: "Order deleted successfully",
            body: deletedOrder
        })
    }
    catch(err){
        res.status(500).json(err)
    }
}

//Get user Order
const getUserOrder = async (req,res) => {

    try{
        const order = await Order.findOne({userId: req.body.userId})

        res.json({
            status: 200,
            message: "Cart of the user",
            body: order
        })

    }
    catch(err){
        res.status(500).json(err)
    }
}

// Get all Orders
const getAllOrder = async(req, res) =>{
    try{
        const orders = await Order.find();
        res.json({
            status: 200,
            message: "All orders",
            body: carts
        })
    }
    catch(err){
        res.status(500).json(err)
    }
}



module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getUserOrder,
    getAllOrder
}
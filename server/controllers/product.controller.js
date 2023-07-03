const Product = require('../models/product.model');

// Create Product
const addProduct = async (req, res) => {

    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save();
        res.json({
            status: 200,
            message: "Product added successfully",
            body: savedProduct
        })
    }
    catch (error) {
        res.status(500).json(error)
    }
}


// Update Product
const updateProduct = async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.body.id, {
            title: req.body.tile,
            desc: req.body.desc,
            img: req.body.img,
            size: req.body.size,
            color: req.body.color,
            categories: req.body.categories,
        }, { new: true })

        res.json({
            status: 200,
            message: "Product has been updated !",
            body: updatedProduct
        })
    }
    catch(error){
        res.json({
            status: 500,
            error: error
        })
    }



}

//Delete Product
const deleteProduct = async (req, res) => {
    try{
        const deletedProduct = await Product.findByIdAndDelete(req.body.id);

        res.json({
            status: 200,
            message: "The product has been deleted",
            body: deletedProduct
        })
    }
    catch(err){
        res.json({
            status: 500,
            error: err
        })
    }
}

//Find a product
const getProduct = async(req, res) => {

    try{
        const product = await Product.findById(req.body.id)
    
        res.json({
            status: 200,
            message: "Product has been shown",
            body: product
        })
    }
    catch(err){
        res.json({
            status: 500,
            error: err
        })
    }
}

//Get all product
const getAllProduct = async (req,res) =>{

    const qNew = req.query.new;
    const qCategory = req.query.categories
    
    try{

        let products;

        if(qNew){
            products = await Product.find(). sort({createdAt: -1}).limit(2);
        }
        else if(qCategory){
           products = await Product.find({
            categories : {
                $in: [qCategory],
            }
           });
        }
        else{

            products = await Product.find().sort({_id: -1})
        }


        res.json({
            status: 200,
            message: "All products have been shown",
            body: products
        })
    }
    catch(err){
        res.json({
            status: 500,
            error: err
        })
    }
}


module.exports = {
    addProduct, 
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProduct
}
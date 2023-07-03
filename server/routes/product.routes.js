const router = require('express').Router();

const { addProduct,updateProduct, deleteProduct, getProduct, getAllProduct } = require('../controllers/product.controller')

const { tokenVerifyAndAdmin } = require('../controllers/verifyToken')

router.post('/add', tokenVerifyAndAdmin, addProduct)
router.put('/update', tokenVerifyAndAdmin, updateProduct)
router.delete('/delete', tokenVerifyAndAdmin, deleteProduct)
router.get('/get', tokenVerifyAndAdmin, getProduct)
router.get('/getAll', tokenVerifyAndAdmin, getAllProduct)

module.exports = router;
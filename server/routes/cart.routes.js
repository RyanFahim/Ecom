const router = require('express').Router();

const { addCart, updateCart, deleteCart, getUserCart, getAllCart } = require('../controllers/cart.controller')

const { verifyToken, tokenVerifyAndAdmin, tokenVerifyAndAuthenticate } = require('../controllers/verifyToken')

router.post('/add', verifyToken, addCart)
router.put('/update', tokenVerifyAndAuthenticate, updateCart)
router.delete('/delete', tokenVerifyAndAuthenticate, deleteCart)
router.delete('/getUser', tokenVerifyAndAuthenticate, getUserCart)
router.delete('/getAll', tokenVerifyAndAdmin, getAllCart)

module.exports = router;

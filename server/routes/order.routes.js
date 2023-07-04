const router = require('express').Router();

const { verifyToken, tokenVerifyAndAdmin, tokenVerifyAndAuthenticate } = require('../controllers/verifyToken')

const { createOrder, updateOrder, } = require('../controllers/order.controller')

router.post('/add',createOrder )
router.put('/update',updateOrder )
// router.put('/update',updateOrder )

//Work is remaining
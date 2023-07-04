const router = require('express').Router();

const { updateUser, deleteUser, getUserInformation, getAllUser } = require('../controllers/user.controller')

const {tokenVerifyAndAuthenticate,tokenVerifyAndAdmin} = require('../controllers/verifyToken')

router.put("/update",tokenVerifyAndAuthenticate, updateUser)
router.delete("/delete",tokenVerifyAndAuthenticate, deleteUser)
router.get('/find', tokenVerifyAndAdmin, getUserInformation)
router.get('/getAllUser', tokenVerifyAndAdmin, getAllUser)

module.exports = router
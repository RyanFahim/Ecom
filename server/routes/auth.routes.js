const router = require('express').Router();
const auth = require("../controllers/auth.controller")

router.post("/register", auth.userRegistration)
router.post("/login", auth.userLogin)

module.exports = router;
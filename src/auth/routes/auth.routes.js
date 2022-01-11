const router = require('express').Router();
const {register, logIn} = require('../controller/auth.controller');


router.route('/register').post(register);
router.route('/login').post(logIn);


module.exports = router;
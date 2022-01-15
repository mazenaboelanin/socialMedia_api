const router = require('express').Router();
const {register, logIn, verify} = require('../controller/auth.controller');


router.route('/register').post(register);
router.route('/login').post(logIn);
router.route('/verify/:token').get(verify);


module.exports = router;
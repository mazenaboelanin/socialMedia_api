const { getAllUsers } = require('../controllers/user.controller');

const router = require('express').Router();

router.route('/').get(getAllUsers);

module.exports = router ;
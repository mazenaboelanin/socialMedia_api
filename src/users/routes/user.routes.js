const { getAllUsersHandler, getUserHandler ,addUserHandler, updateUserHandler, deletUserHandler  } = require('../controllers/user.controller');

const router = require('express').Router();

router.route('/').get(getAllUsersHandler).post(addUserHandler);
router.route('/:id').get(getUserHandler).put(updateUserHandler).delete(deletUserHandler);

module.exports = router ;
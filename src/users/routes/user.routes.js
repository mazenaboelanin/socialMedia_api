const { getAllUsersHandler, getUserHandler ,addUserHandler, updateUserHandler, deletUserHandler  } = require('../controllers/user.controller');
const router = require('express').Router();

const requestValidation = require('../../../common/middleware/requestValidation');
const { addUserSchema } = require('../joi/userValidation');

router.route('/')
.get(getAllUsersHandler)
.post(requestValidation(addUserSchema) , addUserHandler);

router.route('/:id')
.get(getUserHandler)
.put(updateUserHandler)
.delete(deletUserHandler);

module.exports = router ;
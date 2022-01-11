const { getAllUsersHandler, getUserHandler ,addUserHandler, updateUserHandler, deletUserHandler  } = require('../controller/user.controller');
const router = require('express').Router();

// validation on request
const requestValidation = require('../../../common/middleware/requestValidation');

// authorization on request
const isAuthorized = require("../../../common/middleware/isAuthorized");
const { addUserSchema } = require('../joi/userValidation');

// endpoints
const {
    GET_ALL_USERS,
    DELETE_USER,
    GET_ALL_ADMINS,
    UPDATE_PROFILE,
    DEACTIVATE_ACCOUNT
} = require('../endPoints');


// routes
router.route('/')
.get(isAuthorized(GET_ALL_USERS),getAllUsersHandler)
.post(requestValidation(addUserSchema) , addUserHandler);

router.route('/:id')
.get(getUserHandler)
.put(updateUserHandler)
.delete(isAuthorized(DELETE_USER),deletUserHandler);

module.exports = router ;
const {StatusCodes} = require('http-status-codes');
const User = require('../model/user.model');

// @ desc       Get All Users
// @ route      GET api/v1/users
// @ access     Public
exports.getAllUsers = async(req, res, next)=>{
    res.json({msg: 'hello Users'});
}
const {StatusCodes} = require('http-status-codes');
const User = require('../../users/model/user.model');


exports.register = async(req, res, next)=>{
    res.status(StatusCodes.OK).json({success: true});
}


exports.logIn = async(req, res, next)=>{
    res.status(StatusCodes.OK).json({success: true});
}
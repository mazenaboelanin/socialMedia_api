const RBAC = require("easy-rbac");
const { StatusCodes } = require("http-status-codes");
const User = require('../../src/users/model/user.model');
const rbac = require('../rbac/rbac');
const jwt = require('jsonwebtoken');

module.exports =(endPoint)=>{
    return async( req, res, next)=>{
        console.log(".... is auth");
        if(req.headers.authorization.split(" ")[1]){
            const token = req.headers.authorization.split(" ")[1];

            try {
                let decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findOne({_id: decoded._id});
                if(!user){
                    res.status(StatusCodes.UNAUTHORIZED).json({ success: false, data: {}, message: "UNAUTHORIZED"});
                } else {
                    req.user = user;
                    const isAllowed = await rbac.can(user.role, endPoint);
                    if(isAllowed){
                        next();
                    }
                    else{
                        res.status(StatusCodes.UNAUTHORIZED).json({ success: false, data: {}, message: "UNAUTHORIZED"});
                    }
                }
            } catch (err) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, data: {}, err});
            }
        }
        
    }
}
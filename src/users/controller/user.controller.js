const req = require('express/lib/request');
const {StatusCodes} = require('http-status-codes');
const User = require('../model/user.model');

// @ desc       Get All Users
// @ route      GET api/v1/users
// @ access     Public
exports.getAllUsersHandler = async(req, res, next)=>{
   try {
    const users = await User.find();
    console.log('******', users);
    if(users.length > 0){
        res.status(StatusCodes.OK).json({ success: true,count: users.length, data: users});
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, message: "no users found" });
    }
    
   } catch (err) {
       res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, err});
   }
}

// @ desc       Get Specific Usser
// @ route      GET api/v1/users/:id
// @ access     Public
exports.getUserHandler = async(req, res, next)=>{
    const {id} = req.params;

    try {
        const user = await User.findById(id);
        if(user){
            res.status(StatusCodes.OK).json({ success: true, data: user});
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, message: `No user found with this id: ${id}` });
        }
        
       } catch (err) {
           res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, err});
       }
}


// @ desc       Add New User
// @ route      POST api/v1/users
// @ access     Public
exports.addUserHandler = async(req, res, next)=>{
   
   const {name, email, password, phone, role} = req.body;
   try {
       const user = await User.findOne({email});
       if(user){
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, message: "Email already Exists"});
       }
       else {
           const newUser = new User({name, email, password, phone, role});
           const data = await newUser.save();
          
           res.status(StatusCodes.CREATED).json({ success: true, data});
       }
   } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, data: {}, err});
   }
}

// @ desc       Update User
// @ route      PUT api/v1/users/:id
// @ access     Public
exports.updateUserHandler = async(req, res, next)=>{
    const {id} = req.params;
    const bodyToUpdate = req.body;

    try {
        const user = await User.findById(id);
        if(user){
            const updatedUser = await User.findByIdAndUpdate(id, bodyToUpdate, {
                new: true,
                runValidators: true
            });
            res.status(StatusCodes.OK).json({ success: true, data: updatedUser});
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, message: `No user found with this id: ${id}`});
        }
        
       } catch (err) {
           res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, err});
       }
}

// @ desc       Delete User
// @ route      DELETE api/v1/users/:id
// @ access     Public
exports.deletUserHandler = async(req, res, next)=>{
    const {id} = req.params;
   
    try {
        const userDeleted = await User.findByIdAndDelete(id);
        if(userDeleted){
            res.status(StatusCodes.OK).json({ success: true, data: id , message: "User Deleted Successfully"});
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, message: `No user found with this id: ${id}`});
        }
        
       } catch (err) {
           res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, err});
       }
}
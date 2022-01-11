const {StatusCodes} = require('http-status-codes');
const User = require('../../users/model/user.model');


exports.register = async(req, res, next)=>{
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


exports.logIn = async(req, res, next)=>{
    res.status(StatusCodes.OK).json({success: true});
}
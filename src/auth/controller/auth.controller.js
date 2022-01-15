const {StatusCodes} = require('http-status-codes');
const sendMail = require('../../../common/services/sendEmail');
const User = require('../../users/model/user.model');
const jwt = require('jsonwebtoken');


// @ desc       Register
// @ route      POST api/v1/auth/register
// @ access     Public

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

        // Create Token 
        const token = newUser.getSignedJwtToken();
           sendMail(process.env.MAIL_SENDER, process.env.MAIL_SENDER_PASSWORD, [email], 'Email VERIFICATION', `<a href="http://localhost:5000/api/v1/auth/verify/${token}"> Verify Email</a>`);

          
           res.status(StatusCodes.CREATED).json({ success: true, data, token});
       }
   } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, data: {}, err});
   }
}


// @ desc       Login
// @ route      POST api/v1/auth/login
// @ access     Public

exports.logIn = async(req, res, next)=>{
    const {email, password} = req.body;

    try {
        // validate email and password
        if(!email || !password ){
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, message: "Please enter email and password"});
         }
        
        // check for user
        const user = await User.findOne({email});
        if(!user){
         res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, message: "Invalid Email"});
        } else { 
            const isMatch = await user.matchPassword(password);
            if(!isMatch){
                res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, message: "Invalid password"});
            } else {
                // Create Token 
                const token = user.getSignedJwtToken();
           
                res.status(StatusCodes.OK).json({ success: true,user: user._id, token });
            }
 

        }
    } catch (err) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, data: {}, err});
    }
}



// @ desc       verify email
// @ route      GET api/v1/auth/verify/:token
// @ access     Public

exports.verify = async (req, res)=>{
    const {token} = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await User.findOne({_id: decoded.id});
    console.log(user);

    if (user){
        const updatedUser = await User.updateOne({_id: decoded.id}, {
            verified : true
        });
        res.status(StatusCodes.OK).json({message: "Email Verified"});
    }else {
        
        res.status(StatusCodes.FORBIDDEN).json({message: "FORBIDDEN"});
    }



}
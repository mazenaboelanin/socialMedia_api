const {StatusCodes} = require('http-status-codes');
const User = require('../../users/model/user.model');


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
                const token = newUser.getSignedJwtToken();
           
                res.status(StatusCodes.CREATED).json({ success: true, data, token});
            }
 

        }
    } catch (err) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, data: {}, err});
    }
}
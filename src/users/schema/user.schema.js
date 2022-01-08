const {Schema} = require('mongoose');


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email:{
        type:String,
        required: [true, "Please add an email"]
    },
    password: {
        type: String, 
        required: [true, "Please add a Password"]
    },
    phone: {
        type: Number,
        minlength: [11, "Please add a phone number of 11 numbers only"]
    },
    role:{
        type: String,
        enum: ["user" ,"admin", "superadmin"]
    }
},{
    timestamps:true
});



module.exports = userSchema;
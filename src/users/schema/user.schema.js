const {Schema} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email:{
        type:String,
        required: [true, "Please add an email"],
        unique: [true, "email already taken"]
    },
    password: {
        type: String, 
        required: [true, "Please add a Password"]
    },
    phone: {
        type: Number,
        min: [11, "Please add a phone number of 11 numbers only"]
    },
    role:{
        type: String,
        enum: ["user" ,"admin", "superadmin"],
    },
    postIds: [{ type: Schema.Types.ObjectId, ref: "post"}]
},{
    timestamps:true
});



// pre middleware to hash password before saving to DB
userSchema.pre('save', async function(next){
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        throw err;
    }
})

// pre middleware to add default role 
userSchema.pre('save', async function(next){
    try {
       if(!this.role){
           this.role = "user"
       } else {
           this.role = this.role
       }
        next();
    } catch (err) {
        throw err;
    }
})

module.exports = userSchema;
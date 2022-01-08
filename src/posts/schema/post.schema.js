const  {Schema, model}= require('mongoose');
// title,postbody,createdBy
const postSchema = new Schema({
    title:{
        type: String,
        required: [true, "Please Add title of the post"],
    },
    body: {
        type: String,
        required: [true, "Please add body of the post"],
    },
    createdBy:{
        type: Schema.Types.ObjectId, ref: "user"
    }
},{
    timestamps: true
});


module.exports = postSchema;
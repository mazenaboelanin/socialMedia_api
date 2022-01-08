const {Schema} = require('mongoose');
Description,commentowner,postid

const commentSchema = new Schema({
    description:{
        type: String,
        required: [true, "Please add a Comment"]
    },
    commentOwner:{
        type: Schema.Types.ObjectId, ref: "user"
    },
    postId:{
        type: Schema.Types.ObjectId, ref: "post"
    }

},{
    timestamps: true
});


module.exports = commentSchema;
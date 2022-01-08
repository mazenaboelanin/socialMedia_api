const mongoose = require('mongoose');
const commentSchema = require('../schema/comment.schema');

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;


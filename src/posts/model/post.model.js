const mongoose = require("mongoose");
const postSchema = require("../schema/post.schema");

const Post = mongoose.model('post',postSchema);

module.exports = Post;
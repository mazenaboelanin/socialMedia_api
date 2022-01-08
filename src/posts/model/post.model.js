const mongoose = require("mongoose");

const Post = mongoose.model('post',postSchema);

module.exports = Post;
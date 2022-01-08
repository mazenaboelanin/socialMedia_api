const {StatusCodes} = require('http-status-codes');
const Post = require('../model/post.model');


// @ desc       Get All Posts
// @ route      GET api/v1/posts
// @ access     Public
exports.getAllPostsHandler = async(req, res, next)=>{
    try {
     const posts = await Post.find();
     if(posts.length > 0){
         res.status(StatusCodes.OK).json({ success: true,count: users.length, data: posts});
     } else {
         res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, message: "no Posts found" });
     }
     
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, err});
    }
 }
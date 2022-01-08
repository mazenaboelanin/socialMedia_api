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


 
// @ desc       Add New Post
// @ route      POST api/v1/posts
// @ access     Public
exports.addPostHandler = async(req, res, next)=>{
    const {title, body, createdBy} = req.body;
    try {

        const newPost = new Post({title, body, createdBy});
        const data = await newPost.save();
        
        res.status(StatusCodes.CREATED).json({ success: true, data, message: "Post Created Successfully"});
        
    } catch (err) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, data: {}, err});
    }
 }
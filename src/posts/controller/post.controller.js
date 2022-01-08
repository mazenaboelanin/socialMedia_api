const {StatusCodes} = require('http-status-codes');
const Post = require('../model/post.model');
const User = require('../../users/model/user.model');

// @ desc       Get All Posts
// @ route      GET api/v1/posts
// @ access     Public
exports.getAllPostsHandler = async(req, res, next)=>{
    try {
     const posts = await Post.find();
     if(posts.length > 0){
         res.status(StatusCodes.OK).json({ success: true,count: posts.length, data: posts});
     } else {
         res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, message: "no Posts found" });
     }
     
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, err});
    }
 }

 
// @ desc       Get Specific Post
// @ route      GET api/v1/posts/:id
// @ access     Public
exports.getPostHandler = async(req, res, next)=>{
    const {id} = req.params;

    try {
        const post = await Post.findById(id);
        if(post){
            res.status(StatusCodes.OK).json({ success: true, data: post});
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, message: `No post found with this id: ${id}` });
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
        const user = await User.findById(createdBy);
        if(user){
            const newPost = new Post({title, body, createdBy});
            const data = await newPost.save();
            
            await User.updateOne({_id: createdBy}, {postIds: [...user.postIds, newPost._id]});
            res.status(StatusCodes.CREATED).json({ success: true, data, message: "Post Created Successfully"});
        }else {
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, message: `No user found with this id: ${createdBy}`});
        }


    } catch (err) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, data: {}, err});
    }
 }


 
// @ desc       Update Posts
// @ route      PUT api/v1/posts/:id
// @ access     Public
exports.updatePostHandler = async(req, res, next)=>{
    const {id} = req.params;
    const bodyToUpdate = req.body;

    try {
        const post = await Post.findById(id);
        if(post){
            const updatedPost = await Post.findByIdAndUpdate(id, bodyToUpdate, {
                new: true,
                runValidators: true
            });
            res.status(StatusCodes.OK).json({ success: true, data: updatedPost});
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, message: `No post found with this id: ${id}`});
        }
        
       } catch (err) {
           res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, err});
       }
}

// @ desc       Delete Posts
// @ route      DELETE api/v1/posts/:id
// @ access     Public
exports.deletePostHandler = async(req, res, next)=>{
    const {id} = req.params;
   
    try {
        const postDeleted = await Post.findByIdAndDelete(id);
        if(postDeleted){
            res.status(StatusCodes.OK).json({ success: true, data: id , message: "Post Deleted Successfully"});
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, message: `No posts found with this id: ${id}`});
        }
        
       } catch (err) {
           res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, err});
       }
}
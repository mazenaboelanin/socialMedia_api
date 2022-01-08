const {StatusCodes} = require('http-status-codes');
const Comment = require('../model/comment.model');

// @ desc       Get All comments
// @ route      GET api/v1/comments
// @ access     Public
exports.getAllCommentsHandler = async(req, res, next)=>{
    try {
     const comments = await Comment.find();
     if(comments.length > 0){
         res.status(StatusCodes.OK).json({ success: true,count: comments.length, data: comments});
     } else {
         res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, message: "no comments found" });
     }
     
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, err});
    }
 }


 
// @ desc       Get Specific comment
// @ route      GET api/v1/comments/:id
// @ access     Public
exports.getCommentHandler = async(req, res, next)=>{
    const {id} = req.params;

    try {
        const comment = await Comment.findById(id);
        if(comment){
            res.status(StatusCodes.OK).json({ success: true, data: comment});
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, message: `No comment found with this id: ${id}` });
        }
        
       } catch (err) {
           res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, err});
       }
}
 
// @ desc       Add New comment
// @ route      POST api/v1/comment
// @ access     Public
exports.addCommentHandler = async(req, res, next)=>{
    const {description, commentOwner, postId} = req.body;
    try {

        const newComment = new Comment({description, commentOwner, postId});
        const data = await newComment.save();
        
        res.status(StatusCodes.CREATED).json({ success: true, data, message: "Comment Created Successfully"});

    } catch (err) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, data: {}, err});
    }
 }


 
// @ desc       Update comments
// @ route      PUT api/v1/comments/:id
// @ access     Public
exports.updateCommentHandler = async(req, res, next)=>{
    const {id} = req.params;
    const bodyToUpdate = req.body;

    try {
        const comment = await Comment.findById(id);
        if(comment){
            const updatedComment = await Comment.findByIdAndUpdate(id, bodyToUpdate, {
                new: true,
                runValidators: true
            });
            res.status(StatusCodes.OK).json({ success: true, data: updatedComment});
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, message: `No comment found with this id: ${id}`});
        }
        
       } catch (err) {
           res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, err});
       }
}

// @ desc       Delete comments
// @ route      DELETE api/v1/comments/:id
// @ access     Public
exports.deleteCommentHandler = async(req, res, next)=>{
    const {id} = req.params;
   
    try {
        const commentDeleted = await Comment.findByIdAndDelete(id);
        if(commentDeleted){
            res.status(StatusCodes.OK).json({ success: true, data: id , message: "Comment Deleted Successfully"});
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, message: `No Comment found with this id: ${id}`});
        }
        
       } catch (err) {
           res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, err});
       }
}
 
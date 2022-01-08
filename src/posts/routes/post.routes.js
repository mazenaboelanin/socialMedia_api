const { getAllPostsHandler,getPostHandler, addPostHandler, updatePostHandler, deletePostHandler } = require('../controller/post.controller');
const router = require('express').Router();
const requestValidation = require('../../../common/middleware/requestValidation');
const { addNewPost } = require('../joi/postValidation');

router.route('/')
.get(getAllPostsHandler)
.post(requestValidation(addNewPost), addPostHandler);

router.route('/:id')
.get(getPostHandler)
.put(updatePostHandler)
.delete(deletePostHandler);

module.exports = router ;
const { getAllPostsHandler,getPostHandler, addPostHandler, updatePostHandler, deletePostHandler } = require('../controller/post.controller');
const router = require('express').Router();


router.route('/')
.get(getAllPostsHandler)
.post(addPostHandler);

router.route('/:id')
.get(getPostHandler)
.put(updatePostHandler)
.delete(deletePostHandler);

module.exports = router ;
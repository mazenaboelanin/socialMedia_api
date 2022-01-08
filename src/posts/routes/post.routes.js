const { getAllPostsHandler, addPostHandler } = require('../controller/post.controller');
const router = require('express').Router();


router.route('/')
.get(getAllPostsHandler)
.post(addPostHandler);

module.exports = router ;
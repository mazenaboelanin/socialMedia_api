const { getAllPostsHandler } = require('../controller/post.controller');
const router = require('express').Router();


router.route('/')
.get(getAllPostsHandler);

module.exports = router ;
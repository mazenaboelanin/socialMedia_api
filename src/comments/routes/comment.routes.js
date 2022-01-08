const {getAllCommentsHandler,getCommentHandler, addCommentHandler, updateCommentHandler, deleteCommentHandler } = require('../controller/comment.controller');
const router = require('express').Router();


router.route('/')
.get(getAllCommentsHandler)
.post( addCommentHandler);

router.route('/:id')
.get(getCommentHandler)
.put(updateCommentHandler)
.delete(deleteCommentHandler);

module.exports = router ;
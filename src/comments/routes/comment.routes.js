const {getAllCommentsHandler,getCommentHandler, addCommentHandler, updateCommentHandler, deleteCommentHandler } = require('../controller/comment.controller');
const router = require('express').Router();
const requestValidation = require('../../../common/middleware/requestValidation');
const { addCommentSchema } = require('../joi/commentValidation');


router.route('/')
.get(getAllCommentsHandler)
.post( requestValidation(addCommentSchema), addCommentHandler);

router.route('/:id')
.get(getCommentHandler)
.put(updateCommentHandler)
.delete(deleteCommentHandler);

module.exports = router ;
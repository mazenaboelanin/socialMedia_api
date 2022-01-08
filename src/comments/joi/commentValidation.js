const Joi = require('joi');

module.exports = {
    addCommentSchema: {
        body: Joi.object().required().keys({
            description: Joi.string().required(),
            commentOwner:Joi.string().required(),
            postId: Joi.string().required()
        })
    }
}

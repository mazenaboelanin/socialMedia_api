const Joi = require('joi');

module.exports = {
    addNewPost: {
        body: Joi.object().required().keys({
            title: Joi.string().required(),
            body:Joi.string().required(),
            createdBy: Joi.string().required()
        })
    }
}

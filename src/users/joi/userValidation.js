const Joi = require('joi');


module.exports = {
    addUserSchema: {
        body: Joi.object().required().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email().message({
                "any.required": "*** Custom Error for testing"
            }),
            password: Joi.string().required(),
            phone: Joi.number(),
            role: Joi.string(),
        })
    }
}
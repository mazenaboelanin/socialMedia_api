const { StatusCodes } = require("http-status-codes");

module.exports = (schema)=>{
    return (req, res, next)=>{
        const validationResult = schema.body.validate(req.body);
        if (validationResult.error){
            const error = validationResult.error.details[0].message;
            res.status(StatusCodes.BAD_REQUEST).json({ success: false, data: {}, error});
        } else{
            next();
        }
        
    }
}
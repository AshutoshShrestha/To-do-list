const {CustomError} = require('../errors/custom-error');

const errorHandler = (err, req, res, next) =>{
    console.log(err)
    if(err instanceof CustomError){
        return res.status(err.status).json({
            Error:{
                Message:err.message
            }
        });
    }
    return res.status(500).json({
        Error:{
            Name: err.name,
            Message: err.message,
            Detail:err.errors
        }
    });
}

module.exports = errorHandler;
const {errorConstants}= require('../constants/errorConstants')


const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode ? res.statusCode:500//if we have status code it will send stauts code, other wise  it will be 500
    switch(statusCode){////stacktrace is in which file the error is exist
        case errorConstants.BAD_REQUEST:
            res.json({
                title: "validation failed",
                message:err.message,
                stackTrace:err.stack


            });
            break;
            case errorConstants.NOT_FOUND:
                res.json({
                    title:"not found",
                    message: err.message,
                    stackTrace:err.stack
                })
                default :
                    break
    }
    res.json({message:err.message,stackTrace:err.stack})


}

module.exports = {errorHandler}
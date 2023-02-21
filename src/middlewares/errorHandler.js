export const errorHandler = (error,req,res,next) =>{
    return res.status(401).json({status:'error',message:error.message});
};
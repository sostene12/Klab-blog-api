export const successMessage = (res,status,data) =>{
    return res.status(status).json({status:"success",data:data});
}

export const errorMessage = (res,status,error) =>{
    return res.status(status).json({status:"error",error:error.message});
}
export function errorHandler(error, doThrow=false){
    let e = (typeof error == 'string') ? new Error(error): error;
    if(doThrow){
        throw e;
    }else{
        console.error(e);
    }
}

export function error500(error){
    response.status(500).json({"message": 'unknown error', error});
    errorHandler(error);
    return
}
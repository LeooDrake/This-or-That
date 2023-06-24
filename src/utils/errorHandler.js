export function errorHandler(error, doThrow=false){
    let e;
    if(error instanceof Error){
        e = error;
    }else{
        e = new Error(e);
    }
    if(doThrow){
        throw e;
    }else{
        console.error(e);
    }
}
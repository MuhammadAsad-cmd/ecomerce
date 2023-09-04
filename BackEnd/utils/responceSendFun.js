let sendResponce=(res,code,obj)=>{

    res.status(code).send(obj)
    
}

module.exports=sendResponce;
const addCookis=(name,res,email)=>{
    
    res.cookie(name,email,{
                maxAge: 365 * 24 * 60 * 60 * 1000
            })
        
}


module.exports=addCookis
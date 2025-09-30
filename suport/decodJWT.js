var jwt = require('jsonwebtoken');

const decode=(token)=>{
        const decode = jwt.verify(token,"0988599231")
        return decode.email
    }


module.exports=decode
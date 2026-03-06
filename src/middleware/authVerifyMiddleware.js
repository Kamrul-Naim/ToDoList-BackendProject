var jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{

    let token=req.headers['token-key'];
    jwt.verify(token,"dejavu",(err,decoded)=>{
        if(err){
            res.status(401).json({status:"Unauthorized"});
        }
        else{
            let username=decoded.data.UserName;
            req.headers.UserName=username;
            next();
        }
    })
}
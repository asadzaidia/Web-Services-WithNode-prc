var {User}=require('./../models/users');
//authication //middleware
var authenticate= (req,res,next)=>{
  var token=req.header('x-auth');
  User.findByToken(token).then((user)=>{
    if(!user){
      //res.send(401).send();
      //above is same as that below
      return Promise.reject();
    }
    req.user=user;
    req.token=token;
    next();
  }).catch((e)=>{
    res.send(401).send();
  });
};
module.exports={authenticate};

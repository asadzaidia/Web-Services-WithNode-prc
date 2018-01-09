const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');
const bcrypt=require('bcryptjs');
var UserSchema=new mongoose.Schema({
  email:{
    type:String,
    required:true,
    minlength:1,
    trim:true,
    unique:true,
    validate:{
      validator:validator.isEmail,
      message:'{VALUE} is not a valid email'
    }
  },
    password:{
      type:String,
      required:true,
      minlength:6
    },
    tokens:[{
        access:{
          type:String,
          required:true
        },
        token:{
          type:String,
          required:true
        }
      }]


});
UserSchema.methods.toJSON=function(){ //returning only id and email to client thats cool +_+
  var user=this;
  var userObject=user.toObject();
  return _.pick(userObject,['_id','email']);
};
//tokeninzing and authtecating +_+
UserSchema.methods.generateAuthToken=function(){ //because anonymus function dont work with this
var user=this;
var access='auth';
var token=jwt.sign({_id:user._id.toHexString(),access},'asadzaidi123').toString();
user.tokens.push({access,token});
return user.save().then(()=>{
  return token;
});
};

//logout
UserSchema.methods.removeToken=function(token){
  var user=this;
  return user.update({
    $pull:{ //mongodb $pull method to empty array
      tokens:{
        token:token
      }
    }
  });
};

UserSchema.statics.findByToken=function(token){ //.statics turns into Model function
var User=this;
var decoded;

  try{
    decoded=jwt.verify(token,'asadzaidi123');
  }catch(e){
      // return new Promise((resolve,reject)=>{
      //   reject();
      // });

      //above is same as that below
      return Promise.reject('test');

  }
  return User.findOne({
    '_id':decoded._id,
    'tokens.token':token, //nested documents means nested array
    'tokens.access':'auth'
  });
};
//
UserSchema.statics.findByCredentials=function(email,password){
  var User=this;
  return User.findOne({email}).then((user)=>{
    if(!user){
      return Promise.reject();
    }
    return new Promise((resolve,reject)=>{
      bcrypt.compare(password,user.password,(err,res)=>{
        if(res){
        resolve(user);
      }else{
        reject();
      }
      });

    });
  });
};

//mongoose middleware
//trigger before saving into db
UserSchema.pre('save',function(next){
  var user=this;
  if(user.isModified('password')){
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(user.password,salt,(err,hash)=>{
        user.password=hash;
        next();
      });
    });
  }else{
    next();
  }

});
var User=mongoose.model('Users',UserSchema);

module.exports={User};

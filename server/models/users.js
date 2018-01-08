const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');
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
UserSchema.methods.toJSON=function(){ //returning only id and email to client thats coll +_+
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
var User=mongoose.model('Users',UserSchema);

module.exports={User};

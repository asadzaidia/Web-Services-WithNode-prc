var mongoose=require('mongoose');
var Users=mongoose.model('Users',{
  email:{
    required:true,
    minlength:1,
    type:String,
    trim:true

  }

});

module.exports={Users};

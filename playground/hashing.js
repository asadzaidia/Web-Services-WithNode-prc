const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

//hasing password
var pass='123abc!';
bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(pass,salt,(err,hash)=>{
    console.log('aaaa',hash);
  });
});

var hashedPassword='$2a$10$3GM4fzPnASHYJVARE2PQP.ItuDO8maqHRCiQbxKMwqGcw.js6lWnW';
bcrypt.compare(pass,hashedPassword,(err,res)=>{
  console.log(res);
});
var data={
  id:10
}

var token=jwt.sign(data,'123abc');
console.log(token);
// jwt.verify
var decoded=jwt.verify(token,'123abc');
console.log('decoded',decoded);




// this is one way of tokeing and saving and hashing data
// var message='i am user number three 2';
// var hash=SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data={
//   id:4
// };
// var token={
//   data,
//   hash:SHA256(JSON.stringify(data)+ 'somesecret').toString()
//
// }
// token.data.id=5;
// token.hash=SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash=SHA256(JSON.stringify(token.data)+'somesecret').toString();
// if(resultHash=== token.hash){
//   console.log('Data was not changed');
// }else{
//   console.log('Data changed');
// }

// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb'); //destructing es6
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    console.log('Unable to connect to MongoDB server');
  }else{
  console.log('Connected to MongoDB server');
}
//findOneAndUpdate
db.collection('users').findOneAndUpdate({
  //filter
  name:"Sajid"

},
{
  //mongodb update operator
  $set:{
    age:53,
    location:"Malir"
  }
},
{
  //returnOrginal false optional true
  returnOrginal:false

}).then((result)=>{
  console.log(result);
},(err)=>{
  console.log(err);
});
db.collection('users').find().toArray().then((docs)=>{
  console.log(JSON.stringify(docs,undefined,2));
});

db.close();
});

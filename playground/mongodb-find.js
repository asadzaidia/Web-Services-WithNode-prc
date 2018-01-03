// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb'); //destructing es6
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    console.log('Unable to connect to MongoDB server');
  }else{
  console.log('Connected to MongoDB server');
}
db.collection('Todos').find().toArray().then((docs)=>{ //quering selecting find return pointers toarray collection them
    console.log(JSON.stringify(docs,undefined,2));
},(err)=>{
  console.log(err);


});
db.collection('Todos').find({completed:true}).toArray().then((docs)=>{ //quering selecting find return pointers toarray collection them
    console.log(JSON.stringify(docs,undefined,2));
},(err)=>{
  console.log(err);


});
db.collection('Todos').find({_id:new ObjectID('5a477d9fd1cf001f1889c6c4')}).toArray().then((docs)=>{ //quering selecting find return pointers toarray collection them
    console.log(JSON.stringify(docs,undefined,2));
},(err)=>{
  console.log(err);


});
db.collection('Todos').find().count((count,err)=>{
  if(count){
    console.log(`TODOS count: ${count}`);
  }else{
    console.log(err);
  }
});
db.collection('users').find({name:'Bilal'}).toArray().then((docs)=>{
  console.log(JSON.stringify(docs,undefined,2));
},(err)=>{
  console.log("Not found",err);
})
db.close();
});

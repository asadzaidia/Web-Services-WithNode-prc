// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb'); //destructing es6
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    console.log('Unable to connect to MongoDB server');
  }else{
  console.log('Connected to MongoDB server');
}
db.collection('Todos').insertOne({
  text:'Something to do',
  completed:false
},(err,result)=>{
  if(err){
    return console.log('Unable to insert todo', err);
  }
  console.log(JSON.stringify(result.ops,undefined,2));//result.ops have all the document we want to store .2 is identation ,undefined is filter 
});

db.collection('users').insertOne({
  name:'asad',
  age:21,
  location:'Karachi'
},(err,result)=>{
  if(err){
    console.log('Not inserted User',err);
  }else{
    console.log(JSON.stringify(result.ops,undefined,2));
  }
})
db.close();
});
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb'); //destructing es6
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    console.log('Unable to connect to MongoDB server');
  }else{
  console.log('Connected to MongoDB server');
}

//deleteMany  mean deleted all that matches query


//deleteOne mean deleted only one that matches first


//findOneAndDelete finds One then deleted and return proof of a deleted document

db.close();
});

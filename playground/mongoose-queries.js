const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');

var id='7a4d23837badbbe829c3e23a';

Todo.find({ //find all
  _id: id //in mongoose no need to add ObjectID
}).then((doc)=>{
  if(!doc){
    return console.log('id not found');
  }
  console.log('Todos',doc);
},(e)=>{
  console.log(e);
});

//.findOne //fetches out 1st that matches
//.findById(id) return matched id

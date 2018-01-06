const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');

var id='7a4d23837badbbe829c3e23a';

//  Todo.remove({}).then((res)=>{
// console.log(res);
// });  remove all

// Todo.findOneAndRemove()

Todo.findByIdAndRemove('5a4d37180bb342601be96969').then((todo)=>{
  console.log(todo,' Deleted');
},(e)=>{
  console.log(e);
});

const _=require('lodash');
const express=require('express');
const bodyParser=require('body-parser');//module to send json parses text into json and sends
const {ObjectID}=require('mongodb');
var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todo');
var {User}=require('./models/users');
var {authenticate}=require('./middleware/authenticate');

var port=process.env.PORT || 3000;
var app=express();
app.use(bodyParser.json());// middleware uses json data attaches with express response


//adding todo
//post/todos
app.post('/todos',(req,res)=>{
  var todo=new Todo({
    text:req.body.text

  });

  todo.save().then((docs)=>{
    res.send(docs);
  },(e)=>{
    res.status(400).send(e);
  });
});
//getting all todos
///todos
app.get('/todos',(req,res)=>{
  Todo.find().then((doc)=>{
    res.send({
    doc:doc //sending object so that we can send other data with todos array
    })
  },(e)=>{
    res.send(400).send(e);
  });
});

//todos/id

app.get('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send;
  });


});
app.delete('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
        return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });

});

app.patch('/todos/:id',(req,res)=>{
  var id=req.params.id;
  var body=_.pick(req.body,['text','completed']);
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  if(_.isBoolean(body.completed) && body.completed==true){

    body.completedAt=new Date().getTime();
  }else{

    body.completed=false;
    body.completedAt=null;
  }
  Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo:todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});
//post user request
app.post('/users',(req,res)=>{
  var body=_.pick(req.body,['email','password']);
  var user=new User(body);


  user.save().then(()=>{
    return user.generateAuthToken();
    // res.send(user);
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
    res.status(400).send(e);
  });
});


//user me
app.get('/users/me',authenticate,(req,res)=>{//applying middleware
  res.send(req.user);
});

//Post/users/login
app.post('/users/login',(req,res)=>{
  var body=_.pick(req.body,['email','password']);
  User.findByCredentials(body.email,body.password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
      res.header('x-auth',token).send(user);
    });
  }).catch((e)=>{
    res.status(400).send();
  });
});
app.listen(port,()=>{
  console.log(`started at port: ${port}`);
});




// var newUser=Users({
//   email:'     asad@gmail.com'
// }).save().then((res)=>{
//   console.log('User Saved: ',res);
// },(e)=>{
//   console.log('Error: ',e);
// });

// var newTodo=Todo({
//   text:'1st todo with mongoose'
// });
//
// newTodo.save().then((docs)=>{
//   console.log('Saved to db: ', docs);
// },(err)=>{
//   console.log('Not Saved: ',err);
// });
//
// var newTodo1=Todo({
//   text:'Cook Food',
//   completed:false,
//   completedAt:1234
// }).save().then((docs)=>{
//   console.log('saved 2nd todo: ',docs);
// },(err)=>{
//   console.log('Not saved there is an error: ',err);
// });

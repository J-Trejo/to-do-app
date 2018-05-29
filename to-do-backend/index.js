const express = require('express'),
      app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

const MONGO_URL = 'mongodb://localhost:27017/TodosList';
// we call .connect to connect.
mongoose.connect(MONGO_URL);

const connection = mongoose.connection;

connection.on('open', () => {
    console.log('Connected to mongo');
});


//for anyone working with mongo -- you can actually directly push into the db arrays instead of pulling=>updating=>updating

// Status.update({
//     status: "urgent"
// }, {
//     $push: {
//         items: savedItem._id
//     }
// })
const Todo = require('./models/Todo');


// FIND ALL TODOS
app.get('/Todos', (req , res)=>{

    Todo.find({})
        .then(oneTodo => {
            if(!oneTodo){
                return res.status(404).json({"msg":"none found"});
            }
            res.json(oneTodo);
        })
        .catch(error => {
            res.status(500).json({msg:'error!'});
        });
});     
//GET ONE SPECIFIC TODO
app.get('/Todos/:todoId', (req , res)=>{

    Todo.findById(req.params.TodoId)
        .then(oneTodo => {
            if(!oneTodo){
                return res.status(404).json({"msg":"none found"});
            }
            res.json(oneTodo);
        })
        .catch(error => {
            res.status(500).json({msg:'error!'});
        });
});  
//ADD NEW TODO
app.post('/todos', (req , res) => {
    console.log(req.body);
    //1 create an instance by using the model like a constructor
    let newTodo = Todo({
        text: req.body.text,
        completed: false
     });
    //2 take the instance and call.save on it, that will return a promise
    newTodo.save()
        .then(savedTodo => {
            //console.log(savedTodo);
        })
        .catch(error => {
            res.status(500).json({msg:'error!'});
        });
    res.send('success!');
});
//UPDATE TODO
app.put('/todos/:todoId', (req , res)=>{
    console.log(req.params.todoId);
     let updateData = {text:req.body.text};
     //console.log(updateData)
    Todo.findOneAndUpdate({_id:req.params.todoId},
        updateData)
        //console.log(req.body.todoId)
        .then(updateData => {
            //console.log(updatedTodo);
            res.send(updateData); 
        })
        .catch(error => {
            console.log(error);
        });
});
//DELETE TODO
app.delete('/todos/:todoId', (req, res) => {
   
    Todo.findOneAndRemove({ _id: req.params.todoId })
        //console.log(req.body.todoId)
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });
});


app.listen(8080, () => {
    console.log('Listening on 8080');
})
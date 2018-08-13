const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');


var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res)=>{
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    }, (e)=>{
        res.status(400).send(e);
    })
})

app.post('/users', (req,res)=>{
    var user = new User({
        email: "kyselovivan@gmail.com"
    })
    user.save().then((usr)=>{
        res.send(usr);
    }, (e)=>{
        res.status(400).send(e);
    })
})

app.get('/todos', (req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos})
    }, (error)=>{
        res.send(error);
    })
})

app.get('/users/:id', (req,res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send;
    }

    User.findById(id).then((found)=>{
        if(!found){
            return res.status(404).send();
        }
        return res.send(JSON.stringify(found, undefined,2));
    }).catch((e) => console.log(e))
});

app.get('/todos/:id', (req, res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>res.send(e));
})

app.listen(3000);

module.exports = {app};
// var newTodo = new Todo({
//     text: "Do 15 Node.js lessons"
// });

// newTodo.save().then((doc)=>{
//     console.log(JSON.stringify(doc, undefined,2))
// }, (err)=>{
//     console.log(err)
// })

// var newUser = new User({ email: 'kyselovivan@gmail.com'});
// newUser.save();
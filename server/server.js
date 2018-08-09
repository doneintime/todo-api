const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');


var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res)=>{
    console.log(req.body);
    var todo = new Todo({
        text: "Hello from todo"
    });

    todo.save().then((doc)=>{
        res.send(doc);
    }, (err)=>{
        console.log("can't add todo");
    })
})

app.post('/users', (req,res)=>{
    var user = new User({
        email: "kyselovivan@gmail.com"
    })
    user.save().then((usr)=>{
        res.send(usr);
    }, (e)=>{
        console.log(e);
    })
})

app.listen(3000);
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
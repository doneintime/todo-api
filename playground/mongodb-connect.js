//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');


MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client)=>{
    if(err){
        return console.log("Unable to connect mongodb server");
    }
    console.log("Connected to mongodb server");
    const db = client.db('TodoApp');

    /*db.collection('Todos').insertOne({
        text: "Something to do",
        completed: false
    }, (err, result)=>{
        if(err){
            return console.log("Unable to insert todo");
        }
        console.log(JSON.stringify(result.ops));
    })*/

    db.collection('User').insertOne({
        name: "Ivan",
        age: 33,
        location: "Kiev, Ukraine"
    }, (err, result)=>{
        if(err){
            return console.log("Unable to insert user");
        }
        console.log(JSON.stringify(result.ops));
    })
})
//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');


MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client)=>{
    if(err){
        return console.log("Unable to connect mongodb server");
    }
    console.log("Connected to mongodb server");
    const db = client.db('TodoApp');

    db.collection('User').find({name: "Ivan"}).toArray().then((users)=>{
        if(users.length === 0){
            return console.log("There's no such user");
        }
        console.log(JSON.stringify(users, undefined, 2));
    }, (err)=>{
            console.log("Can't fetch data");
        }
    )
})
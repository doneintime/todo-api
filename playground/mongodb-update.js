//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');


MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client)=>{
    if(err){
        return console.log("Unable to connect mongodb server");
    }
    console.log("Connected to mongodb server");
    const db = client.db('TodoApp');

    db.collection('User').findOneAndUpdate({_id: new ObjectId("5b6b22fac4192bc0170e5e06")}, {
        $set: {
            name: "Jane"
        },
        $inc: {
            age:-100
        }
    })
})
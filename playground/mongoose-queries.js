const {mongoose} = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user');

User.findById("5b6c3d754949783e0bc6e9f8")
    .then((found)=> {
        if(!found){
            return console.log("No such user with particular id")
        }
        console.log(JSON.stringify(found,undefined,2))}
    ).catch((e)=> console.log(e));


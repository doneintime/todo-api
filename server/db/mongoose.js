var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let db = {
    localhost: process.env.MONGODB_URI,
    mlab: 'mongodb://admin:a12345@ds219832.mlab.com:19832/tododb'
  };
  
mongoose.connect( process.env.PORT ? db.mlab : db.localhost); 


module.exports = { mongoose }; 
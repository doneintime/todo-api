var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// let db = {
//     localhost: 'mongodb://localhost:27017/TodoApp',
//     mlab: 'mongodb://admin:a12345@ds219832.mlab.com:19832/tododb'
//   };
  
mongoose.connect(process.env.MONGODB_URI); 


module.exports = { mongoose }; 
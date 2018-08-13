var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://<admin>:<a12345>@ds219832.mlab.com:19832/tododb" || "mongodb://localhost:27017/TodoApp");

module.exports = { mongoose }; 
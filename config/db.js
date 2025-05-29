const mongoose = require('mongoose');

const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/FitnessTracker').on('open',()=>{
    console.log("Mongodb Connected");
}).on('error',()=>{
    console.log("MongoDb connection error");
});

module.exports = connection;
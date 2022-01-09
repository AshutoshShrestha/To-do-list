const mongoose = require('mongoose');

const connectDB = (uri) =>{
    // returns a promise
    return mongoose.connect(uri,{
        useNewUrlParser:true,
        useFindAndModify:false,
        useUnifiedTopology: true,
    });
}

module.exports = connectDB;
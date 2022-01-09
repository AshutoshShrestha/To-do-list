const express = require('express');
const app = express();
const taskRoutes = require('./routes/tasks');
const connectDB = require('./db/connect');
var path = require('path');
const pageNotFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
require('dotenv').config();

// serve static file
app.use(express.static(path.join(__dirname, 'public')));

// middlewares
app.use(express.json()); // to access json obj from req.body 
app.use('/api/v1/tasks', taskRoutes); // site routes
app.use(pageNotFound); // for all other routes
app.use(errorHandler);

const port = 3000;

const startApp = async () =>{
    try{
        await connectDB(process.env.MONGODB_URI)
        console.log("DB Connected...")
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    }catch(err){
        console.log(err);
    }
}

startApp();


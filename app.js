const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

//import of controllers
const taskController = require('./controllers/taskController');
const subTaskController = require('./controllers/subTaskController');
const userController = require('./controllers/userController');
const securityController = require('./controllers/securityController');

//Connect mongoose to our database
mongoose.connect(config.database);

//Declaring Port
const port = 3001;

//Initialize our app variable
const app = express();

//Middleware for CORS
app.use(cors());

//Middlewares for bodyparsing using both json and urlencoding
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



/*express.static is a built in middleware function to serve static files.
 We are telling express server public folder is the place to look for the static files
*/
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.send("Invalid page");
})


//Routing all HTTP requests to all controllers
app.use('/task', taskController);
app.use('/subtask', subTaskController);
app.use('/user', userController);
app.use('/security', securityController);

//Listen to port 3001
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});
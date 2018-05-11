const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

//import of controllers
const collectionController = require('./controllers/collectionController');
const taskController = require('./controllers/taskController');
const userController = require('./controllers/userController');
const securityController = require('./controllers/securityController');
const projectController = require('./controllers/projectController');
const subTaskController = require('./controllers/subTaskController');
const floorController = require('./controllers/floorController');
const employeeController = require('./controllers/employeeController');
const departmentController = require('./controllers/departmentController');
const positionController = require('./controllers/positionController');
const commonServiceController = require('./controllers/commonServiceController');
const departmentTaskController = require('./controllers/departmentTaskController');
const departmentSubTaskController = require('./controllers/departmentSubTaskController');
const commonServiceTaskController = require('./controllers/commonServiceTaskController');
const commonServiceSubTaskController = require('./controllers/commonServiceSubTaskController');
const employeeProjectController = require('./controllers/employeeProjectController');





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

app.use('/collection', collectionController);
app.use('/task', taskController);
app.use('/subtask', subTaskController);
app.use('/user', userController);
app.use('/security', securityController);
app.use('/project', projectController);
app.use('/floor', floorController);
app.use('/employee', employeeController);
app.use('/department', departmentController);
app.use('/position', positionController);
app.use('/commonservice', commonServiceController);
app.use('/departmenttask', departmentTaskController);
app.use('/departmentsubtask', departmentSubTaskController);
app.use('/commonservicetask', commonServiceTaskController);
app.use('/commonservicesubtask', commonServiceSubTaskController);
app.use('/employeeproject', employeeProjectController);


//Listen to port 3001
app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});
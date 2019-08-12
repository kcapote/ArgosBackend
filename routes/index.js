const collection = require('./collection.route');
const commonService = require('./commonService.route');
const commonServiceSubTask = require('./commonServiceSubTask.route');
const department = require('./department.route');
const departmentSubTask = require('./departmentSubTask.route');
const departmentTask = require('./departmentTask.route');
const employee = require('./employee.route');
const employeeProject = require('./employeeProject.route');
const employeeSubTask = require('./employeeSubTask.route');
const floor = require('./floor.route');
const position = require('./position.route');
const project = require('./project.route');
const projectEstructure = require('./projectEstructure.route');
const security = require('./security.route');
const subTask = require('./subTask.route');
const task = require('./task.route');
const user = require('./user.route');




module.exports = (router) => {

    //router.use('/',collection),
    //router.use('/',commonService),
    //router.use('/',commonServiceSubTask),
    //router.use('/',department    //router.use('/',collection),
    //router.use('/',commonService),
    //router.use('/',commonServiceSubTask),
    //router.use('/',department),
    //router.use('/',departmentSubTask),
    //router.use('/',departmentTask),
    //router.use('/',employee),
    //router.use('/',employeeProject),
    //router.use('/',employeeSubTask),
    //router.use('/',floor),
    //router.use('/',position),
    //router.use('/',project),
    //router.use('/',projectEstructure),
    //router.use('/',security),
    //router.use('/',subTask),),
    //router.use('/',departmentSubTask),
    //router.use('/',departmentTask),
    //router.use('/',employee),
    //router.use('/',employeeProject),
    //router.use('/',employeeSubTask),
    //router.use('/',floor),
    router.use('/',position),
    router.use('/',project),
    router.use('/',projectEstructure),
    router.use('/',security),
    router.use('/',subTask),
    router.use('/',task);
    router.use('/',user);

    return router;
    
}


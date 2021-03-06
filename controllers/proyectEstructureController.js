const express = require('express');
const router = express.Router();
const Floor = require('../models/floor');
const Department = require('../models/department');
const Project = require('../models/project');
const Task = require('../models/task');
const SubTask = require('../models/subTask');
const DepartmentTask = require('../models/departmentTask');
const DepartmentSubTask = require('../models/departmentSubTask');
const CommonService = require('../models/commonService');
const CommonServiceTask = require('../models/commonServiceTask');
const CommonServiceSubTask = require('../models/commonServiceSubTask');
const authentication = require('../middlewares/authentication');
const task = require('../models/task');

router.post('/floors', [authentication.verifyToken, authentication.refreshToken], async (req, res, next) => {

    try {
        let collection = req.body;
        const tasks = await Task.find({ 'type': 'DEPARTAMENTOS', 'recordActive': true }).sort({ position: 1 }).exec();
        const subtasks = await SubTask.find({ 'recordActive': true }).exec();

        const savedFloors = await createFloors(collection);

        for(let i = 0; i < savedFloors.length; i++){

            const currentFloor = savedFloors[i];
            const savedDepartments = await createDepartments(currentFloor);

            for(let j = 0; j < savedDepartments.length; j++){

                const currentDepartment = savedDepartments[j];
                await createDepartmentTasks(currentFloor, currentDepartment, tasks);
                
                for(let k = 0; k < tasks.length; k++){

                    const currentTask = tasks[k];

                    const subTasksTemp = subtasks.filter( subTask => subTask.task.toString() === currentTask._id.toString());

                    await createDepartmentSubTasks(currentFloor, currentDepartment, currentTask, subTasksTemp);

                }

            }

        }    
       
        res.status(200).json({
            success: true,
            message: 'Operación realizada de forma exitosa.',
            user: req.user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'No se pudo completar la operación',
            errors: error,
            user: req.user
        });
    }

});

router.post('/commonServices', [authentication.verifyToken, authentication.refreshToken], async (req, res, next) => {
    try{
        let collection = req.body;

        const tasks = await Task.find({ 'recordActive': true }).sort({ position: 1 }).exec();
        const subTasks = await SubTask.find({'recordActive': true }).exec();
        
        const savedCommonsServices = await createCommonsServices(collection);

        for(let i = 0; i < savedCommonsServices.length; i++){
            
            const savedCommonTasks = await createCommonTasks(savedCommonsServices[i], tasks);

            for(let k = 0; k < savedCommonTasks.length; k++) {      
                const task = savedCommonTasks[k].task;
                await createCommonSubtask(task, savedCommonsServices[i], subTasks);
            }

        }     

        await updateProject(collection[0].project);

        res.status(200).json({
            success: true,
            message: 'Operación realizada de forma exitosa.',
            user: req.user
        });

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'No se puede crear la estructura',
            errors: err,
            user: req.user
        });
    }

});

const saveMany = async  (arraObject, Schema) => {
    try{
        return await Schema.insertMany(arraObject);
    }catch(err){
        console.log(err)
        throw new Error( `Error saving  ${Schema.modelName}`) 
    }

} 

const createCommonsServices = async (collection) => {
    let commonsServices = [];
    for (let i = 0; i < collection.length; i++) {
        commonsServices.push({
            project: collection[i].project,
            number: collection[i].number,
            type: collection[i].type,
            status: 0
        });
    }    
    return await saveMany(commonsServices, CommonService);
}

const createCommonTasks = async (commonService, tasks) => {
    let commonTasks = [];
    const tasksFilter = tasks.filter( task => task.type === commonService.type);
    //await Task.find({ 'type': commonService.type, 'recordActive': true }).sort({ position: 1 }).exec();

    for(let j = 0; j < tasksFilter.length; j++) {      
        const task = tasksFilter[j]; 
        commonTasks.push({
            commonService: commonService._id,
            task: task._id,
            type: commonService.type,
            project: commonService.project,
            status: 0 
        });
    }

    return savedCommonTasks =  await saveMany(commonTasks, CommonServiceTask);
}

const createCommonSubtask = async (taskId, commonService, subTasks) => {
    let commonSubTask = [];

    const subTasksFilter = subTasks.filter( subTask => subTask.task.toString() === taskId.toString());

    for(let l = 0; l < subTasksFilter.length; l++){
        const subTaskElement = subTasksFilter[l];
        commonSubTask.push({
            commonService: commonService._id,
            subTask: subTaskElement._id,
            task: taskId,
            type: commonService.type,
            project: commonService.project,
            status: 0 
        });
    }
    return await saveMany(commonSubTask, CommonServiceSubTask);

}

/////Floors creation

const createFloors = async (collection) => {
    let floors = [];
    for (let k = 0; k < collection.length; k++) {
        floors.push({
            project: collection[k].project,
            number: collection[k].number,
            quantityDepartment: collection[k].quantityDepartment,
            type: collection[k].type,
            status: 0
        });
    } 
    return await saveMany(floors, Floor);
}

const createDepartments = async (floor) => {
    let departments = [];
    for (let i = 0; i < floor.quantityDepartment; i++) {
        departments.push({
            floor: floor._id,
            number: i + 1,
            status: 0
        });
    }   
    return await saveMany(departments, Department);
}

const createDepartmentTasks = async (floor, department, tasks) => {
    let departmentTasks = [];
    for (let t = 0; t < tasks.length; t++) {
        departmentTasks.push({
            department: department._id,
            task: tasks[t]._id,
            floor: floor._id,
            project: floor.project,
            status: 0
        });
    }
    return await saveMany(departmentTasks, DepartmentTask);

}

const createDepartmentSubTasks = async ( floor, department, task, subTasksTemp ) =>{ //29.5 min 
    let departmentSubTasks = [];

    for (let m = 0; m < subTasksTemp.length; m++) {
        let subTask = subTasksTemp[m];
        departmentSubTasks.push({
            department: department._id,
            subTask: subTask._id,
            task: task._id,
            floor: floor._id,
            project: floor.project,
            status: 0
        });
    };
    return await saveMany(departmentSubTasks, DepartmentSubTask);
}

const updateProject = async (projectID) => {
    let id = projectID;
    let project = await Project.findById(id);
    if (!project) {
        return false;
    }
    project.creationFinished = true;
    const projectSave = await project.save();
    if (!projectSave) {
        return false;
    }
    return true;
};

module.exports = router;
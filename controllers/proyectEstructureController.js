const express = require('express');
const router = express.Router();
const Floor = require('../models/floor');
const Department = require('../models/department');
const Task = require('../models/task');
const SubTask = require('../models/subTask');
const DepartmentTask = require('../models/departmentTask');
const DepartmentSubTask = require('../models/departmentSubTask');
const CommonService = require('../models/commonService');
const CommonServiceTask = require('../models/commonServiceTask');
const CommonServiceSubTask = require('../models/commonServiceSubTask');
const authentication = require('../middlewares/authentication');

router.post('/floors', [authentication.verifyToken, authentication.refreshToken], async (req, res, next) => {

    try {
        let collection = req.body;
        const tasks = await Task.find({ 'type': 'DEPARTAMENTOS', 'recordActive': true }).sort({ position: 1 }).exec();
        for (let k = 0; k < collection.length; k++) {
            let floorTemp = new Floor({
                project: collection[k].project,
                number: collection[k].number,
                quantityDepartment: collection[k].quantityDepartment,
                type: collection[k].type,
                status: 0
            });
            let floor = await floorTemp.save();
            for (let i = 0; i < floor.quantityDepartment; i++) {
                let departmentTemp = new Department({
                    floor: floor._id,
                    number: i + 1,
                    status: 0
                });
                let department = await departmentTemp.save();
                for (let t = 0; t < tasks.length; t++) {
                    let task = tasks[t];
                    let departmentTaskTemp = new DepartmentTask({
                        department: department._id,
                        task: task._id,
                        floor: floor._id,
                        project: floor.project,
                        status: 0
                    });
                    let departmentTask = await departmentTaskTemp.save();
                    let subtasks = await SubTask.find({ 'task': task._id, 'recordActive': true }).populate('task').exec();
                    for (let m = 0; m < subtasks.length; m++) {
                        let subTask = subtasks[m];
                        let departmentSubTaskTemp = new DepartmentSubTask({
                            department: department._id,
                            subTask: subTask._id,
                            task: task._id,
                            floor: floor._id,
                            project: floor.project,
                            status: 0
                        });
                        await departmentSubTaskTemp.save();
                    };
                };
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
        let commonsServices = [];
        let commonTasks = [];
        let commonSubTask = [];

        for (let i = 0; i < collection.length; i++) {
            commonsServices.push({
                project: collection[i].project,
                number: collection[i].number,
                type: collection[i].type,
                status: 0
            });
        }    
        const savedCommonsServices = await saveMany(commonsServices, CommonService);

        console.log(savedCommonsServices);

        for(let i = 0; i < savedCommonsServices.length; i++){
            
            const commonService = savedCommonsServices[i];

            const tasks = await Task.find({ 'type': commonService.type, 'recordActive': true })
                                    .sort({ position: 1 })
                                    .exec();

            for(let j = 0; j < tasks.length; j++) {      
                const task = tasks[j]; 
                commonTasks.push({
                    commonService: commonService._id,
                    task: task._id,
                    type: commonService.type,
                    project: commonService.project,
                    status: 0 
                });
            }
     
            const savedCommonTasks =  await saveMany(commonTasks, CommonServiceTask);
            
            for(let k = 0; k < savedCommonTasks.length; k++) {      
                const task = tasks[k];
                const subTasks = SubTask.find({ 'task': task._id, 'recordActive': true })
                    .populate('task')
                    .exec();
                for(let l = 0; l < subTasks.length; l++){
                    const subTaskElement = subTasksp[l];
                    commonSubTask.push({
                        commonService: commonService._id,
                        subTask: subTaskElement._id,
                        task: task._id,
                        type: commonService.type,
                        project: commonService.project,
                        status: 0 
                    });
                }
                await saveMany(commonSubTask, CommonServiceSubTask);
            }

        }        

        res.status(200).json({
            success: true,
            message: 'Operación realizada de forma exitosa.',
            user: req.user
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'No se puede crear la estructura',
            errors: err,
            user: req.user
        });
    }

})

saveMany = async  (arraObject, Schema) => {
    try{
        return await Schema.insertMany(arraObject);
    }catch(err){
        throw new Error( `Error saving  ${Schema.modelName}`) 
    }

} 


module.exports = router;
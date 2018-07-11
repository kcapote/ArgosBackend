const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const DepartmentSubTask = require('../models/departmentSubTask');
const authentication = require('../middlewares/authentication');

router.get('/', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    DepartmentSubTask.find()
        .populate('department')
        .populate('task')
        .populate('subTask')
        .populate('floor')
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, departmentSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    DepartmentSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departmentSubTasks: departmentSubTasks,
                            totalRecords: departmentSubTasks.length,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/recordActive/:recordActive', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);
    let recordActive = req.params.recordActive;
    recordActive = Boolean(recordActive);

    DepartmentSubTask.find({ 'recordActive': recordActive })
        .populate('department')
        .populate('task')
        .populate('subTask')
        .populate('floor')
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, departmentSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    DepartmentSubTask.find({ 'recordActive': recordActive }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departmentSubTasks: departmentSubTasks,
                            totalRecords: totalRecords,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/task/:idProject/:idTask', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let idTask = req.params.idTask;

    DepartmentSubTask.find({ 'project': idProject, 'task': idTask, 'recordActive': true })
        .populate('department')
        .populate('task')
        .populate('subTask')
        .populate('floor')
        .populate('project')
        .exec(
            (err, departmentSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    DepartmentSubTask.find({ 'project': idProject, 'task': idTask, 'recordActive': true }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departmentSubTasks: departmentSubTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/department/:idProject/:idDepartment', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let idDepartment = req.params.idDepartment;

    DepartmentSubTask.find({ 'project': idProject, 'department': idDepartment, 'recordActive': true })
        .populate('department')
        .populate('task')
        .populate('subTask')
        .populate('floor')
        .populate('project')
        .exec(
            (err, departmentSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    DepartmentSubTask.find({ 'project': idProject, 'department': idDepartment, 'recordActive': true }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departmentSubTasks: departmentSubTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


//Retorna las subtareas de un departamento
router.get('/department/:idProject/:idDepartment/:idTask', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let idDepartment = req.params.idDepartment;
    let idTask = req.params.idTask;

    DepartmentSubTask.find({ 'project': idProject, 'department': idDepartment, 'task': idTask, 'recordActive': true })
        .populate('department')
        .populate('task')
        .populate('subTask')
        .populate('floor')
        .populate('project')
        .exec(
            (err, departmentSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    DepartmentSubTask.find({ 'project': idProject, 'department': idDepartment, 'task': idTask, 'recordActive': true }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departmentSubTasks: departmentSubTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/floor/:idProject/:idFloor', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let idFloor = req.params.idFloor;

    DepartmentSubTask.find({ 'project': idProject, 'floor': idFloor, 'recordActive': true })
        .populate('department')
        .populate('task')
        .populate('subTask')
        .populate('floor')
        .populate('project')
        .exec(
            (err, departmentSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    DepartmentSubTask.find({ 'project': idProject, 'floor': idFloor, 'recordActive': true }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departmentSubTasks: departmentSubTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/floor/:idProject/:idFloor/:idTask', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let idFloor = req.params.idFloor;
    let idTask = req.params.idTask;

    DepartmentSubTask.find({ 'project': idProject, 'floor': idFloor, 'task': idTask, 'recordActive': true })
        .populate('department')
        .populate('task')
        .populate('subTask')
        .populate('floor')
        .populate('project')
        .exec(
            (err, departmentSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    DepartmentSubTask.find({ 'project': idProject, 'floor': idFloor, 'task': idTask, 'recordActive': true }).count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            departmentSubTasks: departmentSubTasks,
                            totalRecords: totalRecords,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});


router.post('/', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {
    let departmentSubTask = new DepartmentSubTask({
        department: req.body.department,
        task: req.body.task,
        subTask: req.body.subTask,
        floor: req.body.floor,
        project: req.body.project,
        startDate: req.body.startDate,
        updateDate: req.body.updateDate,
        endDate: req.body.endDate,
        status: req.body.status
    });
    departmentSubTask.save((err, departmentSubTask) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se puede guardar el registro',
                errors: err,
                user: req.user
            });
        } else {
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                departmentSubTask: departmentSubTask,
                user: req.user
            });
        }
    });
});

router.put('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    DepartmentSubTask.findById(id, (err, departmentSubTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el registro',
                errors: err,
                user: req.user
            });
        }

        if (!departmentSubTask) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para actualizar' },
                user: req.user
            });
        } else {

            departmentSubTask.department = req.body.department;
            departmentSubTask.task = req.body.task;
            departmentSubTask.subTask = req.body.subTask;
            departmentSubTask.floor = req.body.floor;
            departmentSubTask.project = req.body.project;
            departmentSubTask.startDate = req.body.startDate;
            departmentSubTask.updateDate = req.body.updateDate;
            departmentSubTask.endDate = req.body.endDate;
            departmentSubTask.status = req.body.status;
            departmentSubTask.recordActive = req.body.recordActive || true;

            departmentSubTask.save((err, departmentSubTask) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede actualizar el registro',
                        errors: err,
                        user: req.user
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        departmentSubTask: departmentSubTask,
                        user: req.user
                    });
                }
            });

        }
    })
});


router.delete('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    DepartmentSubTask.findById(id, (err, departmentSubTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el registro',
                errors: err,
                user: req.user
            });
        }

        if (!departmentSubTask) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para eliminar' },
                user: req.user
            });
        } else {

            departmentSubTask.recordActive = false;

            departmentSubTask.save((err, departmentSubTask) => {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: 'No se puede eliminar el registro',
                        errors: err,
                        user: req.user
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'Operación realizada de forma exitosa.',
                        departmentSubTask: departmentSubTask,
                        user: req.user
                    });
                }
            });

        }
    })
});


router.put('/sum/:idTask', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {
    
    console.log(req.body);
    

    let projectId = req.body.projectId;
    let idTask = req.body.idTask;
    let commonService = req.body.commonService;
    // let projectId = '5b15fa31a3a8711d8011557a';
    // let idTask = '5b00976acdb619173b5c13e4';        
    // let commonService = '5b15fa59a3a8711d80115648';
    
    console.log('projectId:',projectId,' idTask:', idTask, ' commonService:',commonService  );
    

let totalSubTaskCommon = 0;
    
    
     CommonServiceSubTask.aggregate(
        { $match: 
           { $and: [{ "task": ObjectId(idTask) },
                    { "commonService": ObjectId(commonService) },
                    { "project": ObjectId(projectId)} ]}
    
        },
        { $group: {
            _id: null,
            total: { $sum: '$status'},
            cantidad: {$sum: 1} 
            }
        }
     ).exec(function ( e, d ) {
         if(d){
             console.log('el d es ', d);
             
             d.totalTask = d[0].total/d[0].cantidad;
             totalSubTaskCommon = d[0].total/d[0].cantidad;             

             console.log('***',totalSubTaskCommon);

             //Actualizo la tarea con el total de subtask**************************************************
             CommonServicesTask.update(
                { $and: [{ "task": ObjectId(idTask) },
                { "commonService": ObjectId(commonService) },
                { "project": ObjectId(projectId)} ]}
               ,{
                    $set: {
                        status: totalSubTaskCommon
                    } 
                }
             ).exec(function ( er, r ) {
                 if(r){
                    console.log(r);
                    

                    //Sumo El total de subtask por departamento **********************************
                    // DepartmentSubTask.aggregate(
                    //     { $match: 
                    //         { $and: [{ "task": ObjectId(idTask) },
                    //                  { "commonService": ObjectId(commonService) },
                    //                  { "project": ObjectId(projectId)} ]}
                     
                    //      },
                    //      { $group: {
                    //          _id: null,
                    //          total: { $sum: '$status'},
                    //          cantidad: {$sum: 1} 
                    //          }
                    //      }
                    // ).exec(function ( e, dep ) {
                    //     if(dep){
                    //         console.log('El numero de departamento ', dep);
                    //     }
                    // })

                     
                 }

             });



         }else {
             console.log(e);
             
         }
        
    });


     console.log('---',totalSubTaskCommon);
    
   

});

module.exports = router;
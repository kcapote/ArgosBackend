const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;

const CommonServiceSubTask = require('../models/commonServiceSubTask');
const authentication = require('../middlewares/authentication');
const CommonServicesTask = require('../models/commonServiceTask');
const CommonService = require('../models/commonService');
const DepartmentSubTask = require('../models/departmentSubTask');
const Project = require('../models/project');
const DepartmentTask = require('../models/departmentTask');
const Floor = require('../models/floor');

router.get('/', [
    [authentication.verifyToken, authentication.refreshToken], authentication.refreshToken
], (req, res, next) => {

    let pagination = req.query.pagination || 0;
    pagination = Number(pagination);

    CommonServiceSubTask.find()
        .populate('commonService')
        .populate('subTask')
        .populate('task')
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, commonServiceSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonServiceSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServiceSubTasks: commonServiceSubTasks,
                            totalRecords: commonServiceSubTasks.length,
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

    CommonServiceSubTask.find({ 'recordActive': recordActive })
        .populate('commonService')
        .populate('subTask')
        .populate('task')
        .populate('project')
        .skip(pagination)
        .limit(constants.PAGINATION)
        .exec(
            (err, commonServiceSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonServiceSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServiceSubTasks: commonServiceSubTasks,
                            totalRecords: commonServiceSubTasks.length,
                            pagination: pagination,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/subtask/:idProject/:idSubTask', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let idSubTask = req.params.idSubTask;
    let recordActive = req.params.recordActive;
    recordActive = Boolean(recordActive);

    CommonServiceSubTask.find({ 'project': idProject, 'subTask': idSubTask, 'recordActive': true })
        .populate('commonService')
        .populate('subTask')
        .populate('task')
        .populate('project')
        .exec(
            (err, commonServiceSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonServiceSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServiceSubTasks: commonServiceSubTasks,
                            totalRecords: commonServiceSubTasks.length,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/subtask/:idProject/:idSubTask/:type', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let idSubTask = req.params.idSubTask;
    let type = req.params.type;

    CommonServiceSubTask.find({ 'project': idProject, 'subTask': idSubTask, 'type': type, 'recordActive': true })
        .populate('commonService')
        .populate('subTask')
        .populate('task')
        .populate('project')
        .exec(
            (err, commonServiceSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonServiceSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServiceSubTasks: commonServiceSubTasks,
                            totalRecords: commonServiceSubTasks.length,
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

    CommonServiceSubTask.find({ 'project': idProject, 'task': idTask, 'recordActive': true })
        .populate('commonService')
        .populate('subTask')
        .populate('task')
        .populate('project')
        .exec(
            (err, commonServiceSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonServiceSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServiceSubTasks: commonServiceSubTasks,
                            totalRecords: commonServiceSubTasks.length,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/task/:idProject/:idTask/:type', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let idTask = req.params.idTask;
    let type = req.params.type;

    CommonServiceSubTask.find({ 'project': idProject, 'task': idTask, 'type': type, 'recordActive': true })
        .populate('commonService')
        .populate('subTask')
        .populate('task')
        .populate('project')
        .exec(
            (err, commonServiceSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonServiceSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServiceSubTasks: commonServiceSubTasks,
                            totalRecords: commonServiceSubTasks.length,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/task/:idProject/:idTask/:type/:idCommonService', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let idTask = req.params.idTask;
    let idCommonService = req.params.idCommonService;
    let type = req.params.type;
    // console.log("********************");
    // console.log(idProject);
    // console.log(idTask);
    // console.log(idCommonService);
    // console.log(type);
    // console.log("********************");
 
    CommonServiceSubTask.find({ 'project': idProject, 'task': idTask, 'commonService': idCommonService, 'type': type, 'recordActive': true })
        .populate('commonService')
        .populate('subTask')
        .populate('task')
        .populate('project')
        .exec(
            (err, commonServiceSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonServiceSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServiceSubTasks: commonServiceSubTasks,
                            totalRecords: commonServiceSubTasks.length,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/commonservice/:idProject/:idCommonservice', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;
    let idCommonservice = req.params.idCommonservice;

    CommonServiceSubTask.find({ 'project': idProject, 'commonService': idCommonservice, 'recordActive': true })
        .populate('commonService')
        .populate('subTask')
        .populate('task')
        .populate('project')
        .exec(
            (err, commonServiceSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonServiceSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServiceSubTasks: commonServiceSubTasks,
                            totalRecords: commonServiceSubTasks.length,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.get('/project/:idProject', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let idProject = req.params.idProject;

    CommonServiceSubTask.find({ 'project': idProject, 'recordActive': true })
        .populate('commonService')
        .populate('subTask')
        .populate('task')
        .populate('project')
        .exec(
            (err, commonServiceSubTasks) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'No se pueden consultar la información',
                        errors: err,
                        user: req.user
                    });
                } else {
                    CommonServiceSubTask.count({}, (err, totalRecords) => {
                        res.status(200).write(JSON.stringify({
                            success: true,
                            commonServiceSubTasks: commonServiceSubTasks,
                            totalRecords: commonServiceSubTasks.length,
                            user: req.user
                        }, null, 2));
                        res.end();

                    });
                }
            });
});

router.post('/', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {
    let commonServiceSubTask = new CommonServiceSubTask({
        subTask: req.body.subTask,
        task: req.body.task,
        commonService: req.body.commonService,
        project: req.body.project,
        type: req.body.type,
        startDate: req.body.startDate,
        updateDate: req.body.updateDate,
        endDate: req.body.endDate,
        status: req.body.status
    });
    commonServiceSubTask.save((err, commonServiceSubTask) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'No se puede guardar el registro',
                errors: err,
                user: req.user
            });
        } else {
            console.log('****************************');
            
            res.status(201).json({
                success: true,
                message: 'Operación realizada de forma exitosa.',
                commonServiceSubTask: commonServiceSubTask,
                user: req.user
            });
            //sumTask(task);
        }
    });
});

router.put('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    CommonServiceSubTask.findById(id, (err, commonServiceSubTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede actualizar el registro',
                errors: err,
                user: req.user
            });
        }

        if (!commonServiceSubTask) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para actualizar' },
                user: req.user
            });
        } else {

            commonServiceSubTask.task = req.body.task;
            commonServiceSubTask.subTask = req.body.subTask;
            commonServiceSubTask.underground = req.body.underground;
            commonServiceSubTask.project = req.body.project;
            commonServiceSubTask.type = req.body.type;
            commonServiceSubTask.startDate = req.body.startDate;
            commonServiceSubTask.updateDate = req.body.updateDate;
            commonServiceSubTask.endDate = req.body.endDate;
            commonServiceSubTask.status = req.body.status;
            commonServiceSubTask.recordActive = req.body.recordActive || true;

            commonServiceSubTask.save((err, commonServiceSubTask) => {
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
                        commonServiceSubTask: commonServiceSubTask,
                        user: req.user
                    });
                }
            });

        }
    })
});


router.delete('/:id', [authentication.verifyToken, authentication.refreshToken], (req, res, next) => {

    let id = req.params.id;

    CommonServiceSubTask.findById(id, (err, commonServiceSubTask) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'No se puede eliminar el registro',
                errors: err,
                user: req.user
            });
        }

        if (!commonServiceSubTask) {
            return res.status(400).json({
                success: false,
                message: 'No existe un registro con el id: ' + id,
                errors: { message: 'No se pudo encontrar el registro para eliminar' },
                user: req.user
            });
        } else {

            commonServiceSubTask.recordActive = false;

            commonServiceSubTask.save((err, commonServiceSubTask) => {
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
                        commonServiceSubTask: commonServiceSubTask,
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
    let typeCommon = req.body.typeCommon;
    // let projectId = '5b15fa31a3a8711d8011557a';
    // let idTask = '5b00976acdb619173b5c13e4';        
    // let commonService = '5b15fa59a3a8711d80115648';
    
    console.log('projectId:',projectId,' idTask:', idTask, ' commonService:',commonService , ' type: ', typeCommon );
    

let totalSubTaskCommon = 0;
let totalTaskCommon = 0 ;
let totalCommonService = 0;    
let totalFloor = 0;
    
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
           
             totalSubTaskCommon = d[0].total/d[0].cantidad;             

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
                    CommonServicesTask.aggregate(
                        { $match: 
                            { $and: [
                                     { "commonService": ObjectId(commonService) },
                                     { "project": ObjectId(projectId)} ]}
                     
                         },
                         { $group: {
                             _id: null,
                             total: { $sum: '$status'},
                             cantidad: {$sum: 1} 
                             }
                         }
                    ).exec(function ( er, res ) {
                        if(res){
                            totalTaskCommon = res[0].total/res[0].cantidad;         
                            
                            //Actualizo el monto en commonServices************************************************                            
                            CommonService.update(
                                { $and: [{ "type": typeCommon },
                                { "project": ObjectId(projectId)} ]}
                               ,{
                                    $set: {
                                        status: totalTaskCommon
                                    } 
                                }
                            ).exec(function ( er, common ) {
                                if(common){
                                //Sumo el total de common service***********************************************
                                    CommonService.aggregate( 
                                        {$match: { "project": ObjectId(projectId)}},
                                        { $group: {
                                            _id: null,
                                            total: { $sum: '$status'},
                                            cantidad: {$sum: 1} 
                                            }
                                        }                                           
                                    
                                    ).exec(function ( er, resc ) {
                                        if(resc){
                                            totalCommonService  = resc[0].total;
                            
                                            Floor.aggregate(
                                                {$match: { "project": ObjectId(projectId)}},
                                                { $group: {
                                                    _id: null,
                                                    total: { $sum: '$status'},
                                                    cantidad: {$sum: 1} 
                                                    }
                                                }
                                            ).exec(function(er, resd ){
                                                if(resd){
                                                    
                                                    totalFloor = resd[0].total/resd[0].cantidad;
                                                    let total = ((totalCommonService + totalFloor)/(resd[0].cantidad+resc[0].cantidad));
                                                   
                                                    //Actualizo el total del proyecto
                                                    Project.update(
                                                        { "_id": ObjectId(projectId)},{
                                                            $set: {
                                                                status: total
                                                            } 
                                                        }                                                
                                                    ).exec(function(er, resd ){
                                                        console.log('termine con', total);
                                                        
                                                    })
                                                }

                                            }
                                            ); 

                                        }
                                                                                     
                                    
                                    })


                                    
                                }    

                            });

                                
                        }
                    });     


                     
                 }

             });



         }else {
             console.log(e);
             
         }
        
    });

     console.log('---',totalSubTaskCommon);
    
    

});



module.exports = router;
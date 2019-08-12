const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const { employeeSubTaskController } = require('../controllers');

router.get('/', [authentication.verifyToken, authentication.refreshToken], employeeSubTaskController);

router.get('/recordActive/:recordActive', [authentication.verifyToken, authentication.refreshToken], );

router.get('/project/:idProject', [authentication.verifyToken, authentication.refreshToken], );

router.get('/employee/:idEmployee', [authentication.verifyToken, authentication.refreshToken], );

router.get('/employee/:idProject/:idEmployee', [authentication.verifyToken, authentication.refreshToken], );

router.get('/employee/calendar/:idEmployee', [authentication.verifyToken, authentication.refreshToken], );

router.get('/employee/calendar/:idEmployee/:initDate/:endDate', [authentication.verifyToken, authentication.refreshToken], );

router.get('/employee/calendar/project/:idProject/:idEmployee/:initDate/:endDate', [authentication.verifyToken, authentication.refreshToken], );

router.get('/employee/calendar/project/:idProject/:initDate/:endDate', [authentication.verifyToken, authentication.refreshToken], );

router.get('/employee/:idProject/:idFloor/:idDepartment/:idEmployee', [authentication.verifyToken, authentication.refreshToken], );

router.get('/employee/:idProject/:idCommonService/:idEmployee', [authentication.verifyToken, authentication.refreshToken], );

router.get('/department/:idProject/:idFloor/:idDepartment', [authentication.verifyToken, authentication.refreshToken], );

router.get('/department/:idProject/:idFloor/:idDepartment/:idTask', [authentication.verifyToken, authentication.refreshToken], );

router.get('/department/:idProject/:idFloor/:idDepartment/:idTask/:idSubTask', [authentication.verifyToken, authentication.refreshToken], );

router.get('/commonService/:idProject/:idCommonService', [authentication.verifyToken, authentication.refreshToken], );

router.get('/commonService/:idProject/:idCommonService/:idTask', [authentication.verifyToken, authentication.refreshToken], );

router.get('/commonService/:idProject/:idCommonService/:idTask/:idSubTask', [authentication.verifyToken, authentication.refreshToken], );

router.post('/', [authentication.verifyToken, authentication.refreshToken], );

router.put('/:id', [authentication.verifyToken, authentication.refreshToken], );

router.delete('/:id', [authentication.verifyToken, authentication.refreshToken], );

router.get('/find/top10', [authentication.verifyToken, authentication.refreshToken], );

module.exports = router;
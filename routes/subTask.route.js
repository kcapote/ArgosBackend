const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const { subTaskController } = require('../controllers');

router.get('/', [authentication.verifyToken, authentication.refreshToken], subTaskController.find);

router.get('/recordActive/:recordActive', [authentication.verifyToken, authentication.refreshToken], subTaskController.findByRecordActive );

router.get('/all', [authentication.verifyToken, authentication.refreshToken], subTaskController.findByAll );

router.get('/search/:term', [authentication.verifyToken, authentication.refreshToken], subTaskController.findByTerm );

router.get('/search/:term/:recordActive', [authentication.verifyToken, authentication.refreshToken], subTaskController.findByTermAndRecordActive);

router.get('/task/:id', [authentication.verifyToken, authentication.refreshToken], subTaskController.findByTaskId );

router.get('/:id', [authentication.verifyToken, authentication.refreshToken], subTaskController.findById );

router.post('/', [authentication.verifyToken, authentication.refreshToken], subTaskController.saveSubTask );

router.put('/:id', [authentication.verifyToken, authentication.refreshToken], subTaskController.updateSubTask );

router.delete('/:id', [authentication.verifyToken, authentication.refreshToken], subTaskController.deleteSubTask );

module.exports = router;
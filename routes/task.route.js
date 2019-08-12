const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const { taskController } = require('../controllers');

router.get('/', [authentication.verifyToken, authentication.refreshToken], taskController.find );

router.get('/all', [authentication.verifyToken, authentication.refreshToken], taskController.findAll );

router.get('/recordActive/:recordActive', [authentication.verifyToken, authentication.refreshToken], taskController.findByRecordActive );

router.get('/type/:type', [authentication.verifyToken, authentication.refreshToken], taskController.findByType );

router.get('/search/:term', [authentication.verifyToken, authentication.refreshToken], taskController.findByTerm );

router.get('/search/:term/:recordActive', [authentication.verifyToken, authentication.refreshToken], taskController.findByTermAndRecordActive );

router.get('/:id', [authentication.verifyToken, authentication.refreshToken], taskController.findById );

router.post('/', [authentication.verifyToken, authentication.refreshToken], taskController.saveTask );

router.put('/:id', [authentication.verifyToken, authentication.refreshToken], taskController.updateTask );

router.delete('/:id', [authentication.verifyToken, authentication.refreshToken], taskController.deleteTask );

module.exports = router;
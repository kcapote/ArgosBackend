const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const { floorController } = require('../controllers')

router.get('/', [authentication.verifyToken, authentication.refreshToken], floorController.find );

router.get('/recordActive/:recordActive', [authentication.verifyToken, authentication.refreshToken], floorController.findByRecordActive );

router.get('/all', [authentication.verifyToken, authentication.refreshToken], floorController.findByAll );

router.get('/project/:id', [authentication.verifyToken, authentication.refreshToken], floorController.findByProjectId );

router.get('/:id', [authentication.verifyToken, authentication.refreshToken], floorController.findById );

router.post('/', [authentication.verifyToken, authentication.refreshToken], floorController.saveFloor );

router.put('/:id', [authentication.verifyToken, authentication.refreshToken], floorController.updateFloor );

router.delete('/:id', [authentication.verifyToken, authentication.refreshToken], floorController.deleteFloor );

module.exports = router;
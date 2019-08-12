const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const { positionController } = require('../controllers')

router.get('/', [authentication.verifyToken, authentication.refreshToken], positionController.find );

router.get('/all', [authentication.verifyToken, authentication.refreshToken], positionController.findAll );

router.get('/recordActive/:recordActive', [authentication.verifyToken, authentication.refreshToken], positionController.findByRecordActive );

router.get('/search/:term', [authentication.verifyToken, authentication.refreshToken], positionController.findByTerm );

router.get('/search/:term/:recordActive', [authentication.verifyToken, authentication.refreshToken], positionController.findByTermAndRecordActive );

router.get('/:id', [authentication.verifyToken, authentication.refreshToken], positionController.findById );

router.post('/', [authentication.verifyToken, authentication.refreshToken], positionController.savePosition );

router.put('/:id', [authentication.verifyToken, authentication.refreshToken], positionController.updatePosition );

router.delete('/:id', [authentication.verifyToken, authentication.refreshToken], positionController.deletePosition );

module.exports = router;
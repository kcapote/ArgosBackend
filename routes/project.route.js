const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');
const { projectController } = require('../controllers')

router.get('/', [authentication.verifyToken, authentication.refreshToken], projectController.find );

router.get('/all', [authentication.verifyToken, authentication.refreshToken], projectController.findAll );

router.get('/recordActive/:recordActive', [authentication.verifyToken, authentication.refreshToken],  projectController.findByRecordActive );

router.get('/search/:term', [authentication.verifyToken, authentication.refreshToken], projectController.findByTerm );

router.get('/search/:term/:recordActive', [authentication.verifyToken, authentication.refreshToken], projectController.findByTermAndRecordActive );

router.get('/:id', [authentication.verifyToken, authentication.refreshToken], projectController.findById );

router.post('/', [authentication.verifyToken, authentication.refreshToken], projectController.saveProject );

router.put('/:id', [authentication.verifyToken, authentication.refreshToken], projectController.updateProject );

router.delete('/:id', [authentication.verifyToken, authentication.refreshToken], projectController.deleteProject );

router.get('/find/top10', [authentication.verifyToken, authentication.refreshToken], projectController.findTop10 );
    
module.exports = router;
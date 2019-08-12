const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');
import { userController } from '../controllers';

router.get('/', [authentication.verifyToken, authentication.refreshToken],userController.find );

router.get('/all', [authentication.verifyToken, authentication.refreshToken],userController.findAll);

router.get('/recordActive/:recordActive', [authentication.verifyToken, authentication.refreshToken], userController.findByRecordActive);

router.get('/search/:term/:recordActive', [authentication.verifyToken, authentication.refreshToken], userController.findByTerm );

router.get('/:id', [authentication.verifyToken, authentication.refreshToken], userController.findById );

router.post('/', [authentication.verifyToken, authentication.refreshToken], userController.saveUser);

router.put('/:id', [authentication.verifyToken, authentication.refreshToken], userController.updateUser);

router.delete('/:id', [authentication.verifyToken, authentication.refreshToken], userController.deleteUser);

module.exports = router;
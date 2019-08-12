const express = require('express');
const router = express.Router();
const { projectEstructureController } = require('../controllers')

const authentication = require('../middlewares/authentication');

router.post('/floors', [authentication.verifyToken, authentication.refreshToken], projectEstructureController.saveFloors );
router.post('/commonServices', [authentication.verifyToken, authentication.refreshToken], projectEstructureController.saveCommonService );


module.exports = router;
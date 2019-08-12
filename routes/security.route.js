const express = require('express');
const router = express.Router();
const { securityController } = require('../controllers') 

router.post('/login/', securityController.login );
router.get('/logon/:id', securityController.logout );

module.exports = router;
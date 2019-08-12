const express = require('express');
const router = express.Router();
const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const Collection = require('../models/collection');
const authentication = require('../middlewares/authentication');


// router.get('/', authentication.verifyToken, );

// router.get('/rides/', authentication.verifyToken, );

// router.post('/', authentication.verifyToken, );


module.exports = router;
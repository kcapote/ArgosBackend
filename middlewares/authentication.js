const constants = require('../config/constants');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.verifyToken = function(req, res, next) {
    var token = req.query.token;
    console.log('======A=======');
    console.log(token);
    console.log('======A=======');
    jwt.verify(token, constants.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Acceso Denegado',
                errors: err
            });
        }
        next();
    });
}

exports.refreshToken = function(req, res, next) {
    var token = req.query.token;
    let tokenInfo = jwt.decode(token);
    console.log('======N=======');
    console.log(token);
    console.log('======N=======');
    User.findOne({ _id: tokenInfo.info }, (err, user) => {

        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Acceso Denegado',
                errors: err
            });
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Acceso Denegado',
                errors: err
            });
        }

        if (user.token != token) {
            return res.status(401).json({
                success: false,
                message: 'Acceso Denegado',
                errors: err
            });
        }

        //crear un token
        var tokenNew = jwt.sign({ info: user._id }, constants.SEED, { expiresIn: constants.TIME_TOKEN_VALID }); // un año

        //ser guarda en BD el token del usuario activo
        user.token = tokenNew;
        user.save((err, userSave) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Acceso Denegado',
                    errors: err
                });
            } else {
                userSave.password = '';
                req.user = userSave;
                console.log('======G=======');
                console.log(userSave.token);
                console.log('======G=======');
                next();
            }
        });
    });
}
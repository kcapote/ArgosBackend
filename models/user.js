const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var validRoles = {
    values: ['ADMIN_ROLE', 'QUERY_ROLE', 'CHARGE_ROLE'],
    message: '{VALUE} no es un rol permitido'
}

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre del usuario es nesesario"]
    },
    lastName: {
        type: String,
        required: [true, "El apellido del usuario es nesesario"]
    },
    email: {
        type: String,
        required: [true, "El correo del usuario es nesesario"]
    },
    password: {
        type: String,
        required: [true, "La contraseña del usuario es nesesario"]
    },
    role: {
        type: String,
        required: true,
        default: 'QUERY_ROLE',
        enum: validRoles
    }
});

UserSchema.plugin(uniqueValidator, { message: 'El correo {PATH} ya existe' });

const User = module.exports = mongoose.model('User', UserSchema);
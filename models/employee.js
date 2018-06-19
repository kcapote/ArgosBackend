const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

var typesSex = {
    values: ['MASCULINO', 'FEMENINO'],
    message: '{VALUE} no es un tipo de sexo permitido'
}

const EmployeeSchema = mongoose.Schema({
    rut: {
        type: String,
        required: [true, "El rut del empleado es necesario"],
        unique: true
    },
    name: {
        type: String,
        required: [true, "El nombre del empleado es necesario"]
    },
    lastName: {
        type: String
            //required: [true, "El apellido del empleado es necesario"]
    },
    phone: {
        type: String,
        required: [true, "El número de teléfono del empleado es necesario"]
    },
    mail: {
        type: String
    },
    address: {
        type: String
    },
    sex: {
        type: String,
        /*required: true,*/
        default: 'MASCULINO',
        enum: typesSex
    },
    contractStartDate: {
        type: Date
    },
    contractEndDate: {
        type: Date
    },
    position: {
        type: Schema.Types.ObjectId,
        ref: 'Position'
    },
    recordActive: {
        type: Boolean,
        default: true
    }

});

EmployeeSchema.plugin(uniqueValidator, { message: '"El rut indicado ya esta registrado"' });
const Employee = module.exports = mongoose.model('Employee', EmployeeSchema);
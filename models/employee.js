const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const EmployeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre del empleado es necesario"]
    },
    apellido: {
        type: String,
        required: [true, "El apellido del empleado es necesario"]
    },
    position: {
        type: Schema.Types.ObjectId,
        ref: 'Position'
    }

});

const Employee = module.exports = mongoose.model('Employee', EmployeeSchema);
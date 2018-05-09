const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validTypesTasks = {
    values: ['DEPARTAMENTOS', 'SUBTERRANEOS', 'EMPLAZAMIENTOS', 'PISOS S.C'],
    message: '{VALUE} no es un tipo de tarea permitido'
}

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre de la tarea es necesario"]
    },
    type: {
        type: String,
        required: true,
        default: 'DEPARTAMENTOS',
        enum: validTypesTasks
    },
    position: {
        type: Number
    }
});

const Task = module.exports = mongoose.model('Task', TaskSchema);
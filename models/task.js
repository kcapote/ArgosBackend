const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validTypesTasks = {
    values: ['TYPE_DEPS', 'TYPE_SUBS', 'TYPE_AREA'],
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
        default: 'TYPE_DEPS',
        enum: validTypesTasks
    },
    subTask: [{
        type: Schema.Types.ObjectId,
        ref: 'SubTask'
    }]
});

const Task = module.exports = mongoose.model('Task', TaskSchema);
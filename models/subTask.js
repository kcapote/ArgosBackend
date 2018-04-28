const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SubTaskSchema = mongoose.Schema({
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: [true, "La tarea asociada es necesaria"]
    },
    name: {
        type: String,
        required: [true, "El nombre de la tarea es necesario"]
    }
});

const SubTask = module.exports = mongoose.model('SubTask', SubTaskSchema);
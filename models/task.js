const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre de la tarea es nesesario"]
    },
    subTask: [{
        type: Schema.Types.ObjectId,
        ref: 'SubTask'
    }]

});

const Task = module.exports = mongoose.model('Task', TaskSchema);
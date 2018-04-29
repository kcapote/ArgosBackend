const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const SubTaskSchema = mongoose.Schema({
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    name: {
        type: String,
        required: [true, "El nombre de la sub tarea es necesario"]
    },
    position: {
        type: Number
    }
});

const SubTask = module.exports = mongoose.model('SubTask', SubTaskSchema);
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const EmplacementSubTaskSchema = mongoose.Schema({
    emplacement: {
        type: Schema.Types.ObjectId,
        ref: 'Emplacement',
        index: true
    },
    subTask: {
        type: Schema.Types.ObjectId,
        ref: 'SubTask'
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        index: true
    },
    createDate: {
        type: Date
    },
    updateDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    status: {
        type: Number
    },
    recordActive: {
        type: Number,
        default: 1
    }
});

const EmplacementSubTask = module.exports = mongoose.model('EmplacementSubTask', EmplacementSubTaskSchema);
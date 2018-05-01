const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const EmplacementTaskSchema = mongoose.Schema({
    emplacement: {
        type: Schema.Types.ObjectId,
        ref: 'Emplacement'
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
        ref: 'Project'
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
    }
});

const EmplacementTask = module.exports = mongoose.model('EmplacementTask', EmplacementTaskSchema);
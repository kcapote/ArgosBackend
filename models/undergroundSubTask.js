const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UndergroundSubTaskSchema = mongoose.Schema({
    underground: {
        type: Schema.Types.ObjectId,
        ref: 'Underground'
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

const UndergroundSubTask = module.exports = mongoose.model('UndergroundSubTask', UndergroundSubTaskSchema);
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const DepartmentTaskSchema = mongoose.Schema({
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    floor: {
        type: Schema.Types.ObjectId,
        ref: 'Floor'
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    startDate: {
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

const DepartmentTask = module.exports = mongoose.model('DepartmentTask', DepartmentTaskSchema);
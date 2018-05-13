const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const EmployeeSubTaskSchema = mongoose.Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    subTask: {
        type: Schema.Types.ObjectId,
        ref: 'SubTask'
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    },
    floor: {
        type: Schema.Types.ObjectId,
        ref: 'Floor'
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    },
    commonService: {
        type: Schema.Types.ObjectId,
        ref: 'CommonService'
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
    },
    recordActive: {
        type: Number,
        default: 1
    }
});

const EmployeeSubTask = module.exports = mongoose.model('EmployeeSubTask', EmployeeSubTaskSchema);
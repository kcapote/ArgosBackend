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
    underground: {
        type: Schema.Types.ObjectId,
        ref: 'Underground'
    },
    emplacement: {
        type: Schema.Types.ObjectId,
        ref: 'Emplacement'
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
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

const EmployeeSubTask = module.exports = mongoose.model('EmployeeSubTask', EmployeeSubTaskSchema);
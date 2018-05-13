const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const EmployeeProjectSchema = mongoose.Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    recordActive: {
        type: Number,
        default: 1
    }
});

const EmployeeSubTask = module.exports = mongoose.model('EmployeeProject', EmployeeProjectSchema);
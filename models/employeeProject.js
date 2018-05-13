const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const EmployeeProjectSchema = mongoose.Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        index: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        index: true
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
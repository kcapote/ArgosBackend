const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const DepartmentSubTaskSchema = mongoose.Schema({
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
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
    floor: {
        type: Schema.Types.ObjectId,
        ref: 'Floor',
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
        type: Boolean,
        default: true
    }
});

const DepartmentSubTask = module.exports = mongoose.model('DepartmentSubTask', DepartmentSubTaskSchema);
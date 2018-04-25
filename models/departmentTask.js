const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const DepartamentTaskSchema = mongoose.Schema({
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Project.floors.departaments'
    },
    subTask: [{
        type: Schema.Types.ObjectId,
        ref: 'task.subTask'
    }]
});

var autoPopulateDepartment = function(next) {
    this.populate('Project.floors.departaments');
    next();
};

DepartamentTaskSchema.
pre('findOne', autoPopulateDepartment).
pre('find', autoPopulateDepartment);

const DepartamentTask = module.exports = mongoose.model('DepartamentTask', DepartamentTaskSchema);
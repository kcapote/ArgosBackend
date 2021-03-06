const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var typesSC = {
    values: ['SUBTERRANEOS', 'EMPLAZAMIENTOS', 'PISOS S.C'],
    message: '{VALUE} no es un tipo permitido'
}

const CommonServiceSubTaskSchema = mongoose.Schema({
    commonService: {
        type: Schema.Types.ObjectId,
        ref: 'CommonService',
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
    type: {
        type: String,
        required: true,
        default: 'SUBTERRANEOS',
        enum: typesSC
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
        type: Boolean,
        default: true
    }
});

const CommonServiceSubTask = module.exports = mongoose.model('CommonServiceSubTask', CommonServiceSubTaskSchema);
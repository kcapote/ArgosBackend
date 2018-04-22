const mongoose = require('mongoose');

const DepartamentSchema = mongoose.Schema({
    number: {
        type: String,
        required: [true, "El numero de departamento es necesario"]
    },
    status: {
        type: Boolean
    },
    task: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

const Departament = module.exports = mongoose.model('Departament', DepartamentSchema);
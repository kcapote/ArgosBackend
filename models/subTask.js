const mongoose = require('mongoose');

const SubTaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre de la sub tarea es nesesario"]
    },
    description: String
});

const SubTask = module.exports = mongoose.model('SubTask', SubTaskSchema);
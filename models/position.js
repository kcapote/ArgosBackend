const mongoose = require('mongoose');

const PositionkSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre del cargo es necesario"]
    },
    description: {
        type: String,
        required: [true, "La descripción del cargo es necesario"]
    },
    percent: {
        type: String,
        required: [true, "El porcentaje de rendimiento debe ser indicado"]
    }
});

const Position = module.exports = mongoose.model('Position', PositionkSchema);
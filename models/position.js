const mongoose = require('mongoose');

const PositionkSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre del cargo es necesario"]
    },
    code: {
        type: String,
        required: [true, "El código es necesario"]
    },
    description: {
        type: String,
        required: [true, "La descripción del cargo es necesario"]
    },
    performancePercentage: {
        type: Number
            /*,
                    required: [true, "El porcentaje de rendimiento es necesario"]*/
    }
});

const Position = module.exports = mongoose.model('Position', PositionkSchema);
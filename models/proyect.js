const mongoose = require('mongoose');

const BuildingSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre de la obra es necesario"]
    },
    adress: {
        type: String,
        required: [true, "La dirección es necesario"]
    },
    status: {
        type: Boolean
    },
    floors: [{
        type: Schema.Types.ObjectId,
        ref: 'Floor'
    }]
});

const Building = module.exports = mongoose.model('Building', BuildingSchema);
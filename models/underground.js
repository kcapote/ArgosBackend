const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UndergroundSchema = mongoose.Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, "La obra asociada al piso es necesaria"]
    },
    number: {
        type: Number,
        required: [true, "El número de subterraneo es necesario"]
    },
    status: {
        type: Number
    }
});

const Underground = module.exports = mongoose.model('Underground', UndergroundSchema);
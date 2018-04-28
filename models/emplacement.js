const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const EmplacementSchema = mongoose.Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, "La obra asociada al emplazamiento es necesaria"]
    },
    number: {
        type: Number,
        required: [true, "El número de piso es necesario"]
    },
    status: {
        type: Number
    }
});

const Emplacement = module.exports = mongoose.model('Emplacement', EmplacementSchema);
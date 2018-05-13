const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const EmplacementSchema = mongoose.Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, "La obra asociada al emplazamiento es necesaria"],
        index: true
    },
    number: {
        type: Number,
        required: [true, "El número de piso es necesario"]
    },
    status: {
        type: Number
    },
    recordActive: {
        type: Number,
        default: 1
    }
});

const Emplacement = module.exports = mongoose.model('Emplacement', EmplacementSchema);
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var typesSC = {
    values: ['SUBTERRANEOS', 'EMPLAZAMIENTOS', 'PISOS S.C'],
    message: '{VALUE} no es un tipo de permitido'
}

const CommonServiceSchema = mongoose.Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, "La obra asociada es necesaria"]
    },
    number: {
        type: Number,
        required: [true, "El número es necesario"]
    },
    type: {
        type: String,
        required: true,
        default: 'SUBTERRANEOS',
        enum: typesSC
    },
    status: {
        type: Number
    },
    recordActive: {
        type: Number,
        default: 1
    }
});

const CommonService = module.exports = mongoose.model('CommonService', CommonServiceSchema);
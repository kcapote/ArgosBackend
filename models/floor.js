const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var typesFloors = {
    values: ['LOCAL', 'RESIDENCIA'],
    message: '{VALUE} no es un tipo de piso permitido'
}

const FloorSchema = mongoose.Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, "La obra asociada al piso es necesaria"],
        index: true
    },
    number: {
        type: Number,
        required: [true, "El número de piso es necesario"]
    },
    quantityDepartment: {
        type: Number,
        required: [true, "El cantidad de departamentos del piso es necesario"]
    },
    type: {
        type: String,
        required: true,
        default: 'RESIDENCIA',
        enum: typesFloors
    },
    status: {
        type: Number
    },
    recordActive: {
        type: Number,
        default: 1
    }
});

const Floor = module.exports = mongoose.model('Floor', FloorSchema);
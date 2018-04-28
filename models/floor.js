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
        required: [true, "La obra asociada al piso es necesaria"]
    },
    number: {
        type: Number,
        required: [true, "El número de piso es necesario"]
    },
    type: {
        type: String,
        required: true,
        default: 'RESIDENCIA',
        enum: validRoles
    },
    status: {
        type: Number
    }
});

const Floor = module.exports = mongoose.model('Floor', FloorSchema);
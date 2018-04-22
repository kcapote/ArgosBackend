const mongoose = require('mongoose');

const FloorSchema = mongoose.Schema({
    number: {
        type: Number,
        required: [true, "El número de piso y/o subterraneo es necesario"]
    },
    status: {
        type: Boolean
    },
    isBasement: {
        type: Boolean
    },
    departaments: [{
        type: Schema.Types.ObjectId,
        ref: 'Departament'
    }],
    commonArea: [{
        type: Schema.Types.ObjectId,
        ref: 'CommonArea'
    }]
});

const Floor = module.exports = mongoose.model('Floor', FloorSchema);
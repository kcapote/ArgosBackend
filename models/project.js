const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre de la obra es necesario"]
    },
    adress: {
        type: String,
        required: [true, "La dirección es necesario"]
    },
    status: {
        type: Number
    },
    floors: [{
        number: {
            type: Number,
            required: [true, "El número de piso es necesario"]
        },
        status: {
            type: Number
        },
        departaments: [{
            number: {
                type: String,
                required: [true, "El numero de departamento es necesario"]
            },
            status: {
                type: Number
            }
        }]
    }],
    underground: [{
        number: {
            type: Number,
            required: [true, "El número del subterraneo es necesario"]
        },
        status: {
            type: Number
        },
        departaments: [{
            number: {
                type: String,
                required: [true, "El numero de departamento es necesario"]
            },
            status: {
                type: Number
            }
        }]
    }]
});

const Project = module.exports = mongoose.model('Project', ProjectSchema);
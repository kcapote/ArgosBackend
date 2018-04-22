const mongoose = require('mongoose');

const CommonAreaSchema = mongoose.Schema({
    number: {
        type: String,
        required: [true, "El numero de piso es necesario"]
    },
    status: {
        type: Boolean
    },
    task: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

const CommonArea = module.exports = mongoose.model('CommonArea', CommonAreaSchema);
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CollectionSchema = mongoose.Schema({
    name: {
        type: String
    },
    cars: [{
        price: {
            type: Number
        },
        color: {
            type: String
        },
        brand: {
            type: String
        },
        users: [{
            user: {
                type: Schema.Types.ObjectId,
                ref: '"User'
            },
        }],
        rides: [{
            numer: {
                type: Number
            },
            name: {
                type: String
            },
        }]
    }],
    motocicles: [{
        price: {
            type: Number
        },
        color: {
            type: String
        },
        brand: {
            type: String
        },
        users: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        rides: [{
            numer: {
                type: Number
            },
            name: {
                type: String
            },
        }]
    }]
});

const Collection = module.exports = mongoose.model('Collection', CollectionSchema);
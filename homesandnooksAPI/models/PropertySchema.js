const mongoose = require('mongoose');


const PropertySchema = new mongoose.Schema({
    address: {type: String, required: true},
    type: {type: String, required: true},
    price: {type: Number, required: true},
    bedroom: {type: Number, required: true},
    sittingRoom: {type: Number, required: true},
    kitchen: {type: Number, required: true},
    bathroom: {type: Number, required: true},
    toilet: {type: Number, required: true},
    propertyOwner: {type: String, required: true},
    uploader: {type: String, required: true},
    description: {type: String, required: true},
    validFrom: {type: String, required: true},
    validTo: {type: String, required: true},
    images: [Object],
}, {timestamps: true});


module.exports = mongoose.model("Property", PropertySchema);
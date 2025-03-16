const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    Name: { type: String, required: true },
    userid:{type:String, required:true},
    SRB: { type: String, required: true },
    rate: { type: String, required: true },
    type: { type: String, required: true },
    area: { type: String, required: true },
    location: { type: String, required: true },
    size: { type: String, required: true },
    sqft: { type: String },
    additional: { type: String, default: '' },
    image: { type: String, required: true },
    images: { type: [String], default: [] }
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;











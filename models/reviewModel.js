const mongoose = require('mongoose');

// Define the review schema
const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
    },
    profession: {
        type: String,
        required: true,
        trim: true
    }
});

// Create a model
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

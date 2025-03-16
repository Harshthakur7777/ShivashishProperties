const reviewsData = [
    {
        name: "Nisha Sharma",
        content: "I got my new house with the help of Shivashish Properties. Thank You",
        image: "/img/testimonial-1.jpg",
        profession: "Teacher"
    },
    {
        name: "Vivek Gupta",
        content: "I got my new house with the help of Shivashish Properties. Thank You",
        image: "/img/testimonial-2.jpg",
        profession: "Teacher"
    },
    {
        name: "Lalit Patidar",
        content: "I got my new house with the help of Shivashish Properties. Thank You",
        image: "/img/testimonial-3.jpg",
        profession: "Teacher"
    }
];
const mongoose = require('mongoose');
const Review = require('./../models/reviewModel'); // Path to your schema file

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/shivashish', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

// Function to seed data
async function seedReviews() {
    try {
        await Review.deleteMany({}); // Clear existing data if needed
        await Review.insertMany(reviewsData); // Insert new data
        console.log('Reviews seeded successfully!');
        mongoose.connection.close(); // Close connection after seeding
    } catch (err) {
        console.error('Error seeding reviews:', err);
    }
}

// Call the function
seedReviews();

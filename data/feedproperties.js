const mongoose = require('mongoose');
const Property = require('./../models/propertyModel'); // Adjust the path as needed

const propertyData = [
    {
        Name: "New Bonglow in Royal Recedency",
        SRB: "For Sale",
        rate: "2,50,00,000",
        type: "house",
        area: "Scheme No 140",
        location: "Royal Recedency, greater brajeshwari, Indore",
        size: "1457 sqft",
        additional: "4 BHK with garden",
        image: "/img/royalhome.jpeg",
        images: ["/img/royalhome.jpeg", "/img/royalhome.jpeg"]
    },
    {
        Name: "Land with full water",
        SRB: "For Sale",
        rate: "2,50,00,000/begha",
        type: "land",
        area: "jamniya",
        location: "jamniya khurd, near cricent water park, Indore",
        size: "6 Begha",
        image: "https://media.istockphoto.com/id/1500037690/photo/empty-room-with-white-wall-background-living-room-3d-rendering.jpg?s=612x612&w=0&k=20&c=qTp1GF4sGj_eB_pPOPvPZaQ6fcmL94jbyDaxaR2yzqM=",
        images: ["https://media.istockphoto.com/id/1500037690/photo/empty-room-with-white-wall-background-living-room-3d-rendering.jpg?s=612x612&w=0&k=20&c=qTp1GF4sGj_eB_pPOPvPZaQ6fcmL94jbyDaxaR2yzqM="]
    },
    {
        Name: "IT Company Office",
        SRB: "For Sale",
        rate: "3,07,20000",
        type: "office",
        area: "Scheme No.54",
        location: "Oppisite C21 Mall Vijay Nagar",
        size: "2560 sqft",
        sqft: "12000/sqft",
        image: "/img/officeProperty1.jpeg",
        images: ["/img/officeProperty1.jpeg", "/img/officeProperty2.jpeg", "/img/officeProperty3.jpeg", "/img/officeProperty4.jpeg", "/img/officeProperty5.jpeg"]
    },
    {
        Name: "New Office",
        SRB: "For Sale",
        rate: "74,80,000",
        type: "office",
        area: "Scheme No 140",
        location: "Zodiac Mall, Scheme No 140, Indore",
        size: "6080 sqft",
        sqft: "11000/sqft",
        image: "https://media.istockphoto.com/id/1500037690/photo/empty-room-with-white-wall-background-living-room-3d-rendering.jpg?s=612x612&w=0&k=20&c=qTp1GF4sGj_eB_pPOPvPZaQ6fcmL94jbyDaxaR2yzqM=",
        images: ["https://media.istockphoto.com/id/1500037690/photo/empty-room-with-white-wall-background-living-room-3d-rendering.jpg?s=612x612&w=0&k=20&c=qTp1GF4sGj_eB_pPOPvPZaQ6fcmL94jbyDaxaR2yzqM="]
    },
    {
        Name: "New Office in Zoadiac Mall",
        SRB: "For Sale",
        rate: "1,33,10,000",
        type: "office",
        area: "Scheme No 140",
        location: "Zodiac Mall, Scheme No 140, Indore",
        size: "1331 sqft",
        sqft: "10000/sqft",
        image: "https://media.istockphoto.com/id/1500037690/photo/empty-room-with-white-wall-background-living-room-3d-rendering.jpg?s=612x612&w=0&k=20&c=qTp1GF4sGj_eB_pPOPvPZaQ6fcmL94jbyDaxaR2yzqM=",
        images: ["https://media.istockphoto.com/id/1500037690/photo/empty-room-with-white-wall-background-living-room-3d-rendering.jpg?s=612x612&w=0&k=20&c=qTp1GF4sGj_eB_pPOPvPZaQ6fcmL94jbyDaxaR2yzqM="]
    },
    {
        Name: "New Plot in greater brajeshwari",
        SRB: "For Sale",
        rate: "1,95,00,000",
        type: "office",
        area: "Scheme No 140",
        location: "greater brijeshwari, pipliyahana, Indore",
        size: "1500 sqft",
        sqft: "13000/sqft",
        image: "https://img.squareyards.com/secondaryPortal/638606256558020813-3008240240554055.jpg",
        images: ["https://img.squareyards.com/secondaryPortal/638606256558020813-3008240240554055.jpg"]
    },
    {
        Name: "New Plot no 25 26 23 in SKY solance",
        SRB: "For Sale",
        rate: "25000000",
        type: "plot",
        area: "Scheme No 140",
        location: "greater brijeshwari, pipliyahana, Indore",
        size: "1170 sqft , 1150 sqft",
        sqft: "9000/sqft",
        image: "https://5.imimg.com/data5/SELLER/Default/2021/11/ED/QE/GJ/62650894/residential-plot-for-sale-in-lucknow-1000x1000.jpeg",
        images: ["https://5.imimg.com/data5/SELLER/Default/2021/11/ED/QE/GJ/62650894/residential-plot-for-sale-in-lucknow-1000x1000.jpeg"]
    }
];
//

mongoose.connect('mongodb://localhost:27017/shivashish', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Error connecting to MongoDB", err);
});

const seedDB = async () => {
    await Property.deleteMany({}); // Clear existing data
    await Property.insertMany(propertyData);
    console.log("Database seeded successfully!");
};

seedDB().then(() => {
    mongoose.connection.close();
});

const express = require('express');
const router = express.Router();
propertyModel = require('./../models/propertyModel')
reviewModel = require('./../models/reviewModel')
propertyController = require('./../controllers/propertyController')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./../utils/cloudinary'); 
router.use(express.json());
const { isLoggedIn } = require('./../middleware')
 
// For parsing application/x-www-form-urlencoded 1.p-n a-n p-h a-n
router.use(express.urlencoded({ extended: true }));
const multer = require('multer');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        if (!file.mimetype.startsWith('image/')) {
            throw new Error('Only images are allowed!');
        }

        return {
            folder: 'newPropertyImages', // ✅ Cloudinary folder
            format: file.mimetype.split('/')[1], // ✅ Get format dynamically
            public_id: Date.now() + '-' + file.originalname, // ✅ Unique filename
        };
    },
})
const uploads = multer({ storage: storage });

router.get('/',propertyController.getHomePage)
router.get('/offices-in-indore', propertyController.getAllOffices);     
router.get('/houses-in-indore', propertyController.getAllHouses)
router.get('/plots-in-indore', propertyController.getAllPlots)
router.get('/lands-in-indore', propertyController.getAllLands)
router.get('/offices-in-indore/:id',propertyController.getOneProperty)
router.get('/lands-in-indore/:id',propertyController.getOneProperty)
router.get('/plots-in-indore/:id',propertyController.getOneProperty)
router.get('/houses-in-indore/:id',propertyController.getOneProperty)

router.get('/reviews',propertyController.getReviews)
router.post('/addReview', uploads.single('image') ,propertyController.addReview)
router.post('/addproperty',uploads.fields([
    { name: 'image', maxCount: 1 }, // Single image field
    { name: 'images', maxCount: 10 } // Multiple images field
]),propertyController.addProperty)
router.get('/addreview',propertyController.addReviewForm)
router.post('/search',propertyController.searchProperty)
router.get('/sell', isLoggedIn ,propertyController.addPropertyForm)
router.get('/admin/delete',(req,res,next)=>{
    res.render('delete')
})

router.all('*',(req,res,next)=>{
    res.render('404')
})
module.exports = router;
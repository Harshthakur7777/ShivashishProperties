const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: 'dgmkwcbpk',
  api_key: '791914274832325',
  api_secret: 'bPuyWoDxXdhV25L7CPsVcFzUOQw',
  secure:true
});

module.exports = cloudinary;

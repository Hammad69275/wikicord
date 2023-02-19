const express = require(`express`)
const router = express.Router()
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

const upload = multer({
    storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
          folder: 'avatar',
          format: async (req, file) => 'png', // supports promises as well
          public_id: (req, file) => req.user.id,
        },
      })
});

const meController = require(`../controllers/meController.js`)

module.exports = (app) => {
    
    router.get(`/`,meController.accountInfo)

    router.patch(`/pfp`,upload.single('pfp'),meController.changePfp)

    app.use(`/api/v1/me`,router)

}

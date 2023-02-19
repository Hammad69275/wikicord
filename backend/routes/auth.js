const express = require(`express`)
const router = express.Router()

const authController = require(`../controllers/authController.js`)

module.exports = (app) => {

    router.post(`/register`,authController.register)

    router.get(`/verify`,authController.verifyEmail)
    
    router.post(`/login`,authController.login)
        
    app.use(`/api/v1/auth`,router)

}


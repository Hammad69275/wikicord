const express = require(`express`)
const router = express.Router()

const {admin} = require("../middleware/admin")
const userController = require(`../controllers/userController.js`)

module.exports = (app) => {

    router.get(`/all`,admin,userController.fetchAll)
    
    app.use(`/api/v1/users`,router)

}


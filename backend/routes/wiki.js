const express = require(`express`)
const router = express.Router()

const wikiController = require(`../controllers/wikiController.js`)

module.exports = (app) => {

    router.post(`/:userID`,wikiController.create)

    router.get(`/all`,wikiController.fetchAll)

    router.get(`/:userID`,wikiController.fetch)

    router.delete(`/:userID`,wikiController.Delete)

    router.patch(`/:userID`,wikiController.Edit)

    app.use(`/api/v1/wiki`,router)

}


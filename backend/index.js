require('dotenv').config()
require("./Database/database.js").connect()

const express = require("express")
const app = express()
const cors = require('cors');
const parser = require(`body-parser`)
const auth = require(`./middleware/auth.js`)
const fs = require(`fs`)

app.use(cors())
app.use(parser.json({type:"text/plain"}))
app.use(parser.urlencoded({ extended: true }));
app.use(auth.auth)

fs.readdirSync(`./routes`).forEach(function(file) {
    let route=`./routes/`+file;
    require(route)(app);
});

app.listen(3069,()=> {
    console.log("Backend Initialized!")
})
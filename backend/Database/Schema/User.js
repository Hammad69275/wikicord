const mongoose = require("mongoose")

let User = new mongoose.Schema({
    id:String,
    username:String,
    picture:String,
    email:String,
    createdAt:Number,
    password:String,
    active:Boolean,
    otp:String
},{versionKey: false})

module.exports = mongoose.model(`Users`,User)
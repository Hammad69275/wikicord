const User = require("./User")

const mongoose = require("mongoose")

let Wiki = new mongoose.Schema({
    author:{type:mongoose.Schema.Types.ObjectId,ref:"Users"},
    intro:String,
    password:String,
    content:String,
    scrollTiles:[{title:String,value:String}],
    socials:[
        {name:String,value:String}
    ],
    type:String
},{versionKey: false })

Wiki.statics.findByAuthorID = async function(ID){
    
    let author = await User.findOne({id:ID})
    if(!author) return undefined
    let wiki = await this.findOne({author:author._id})
    if(!wiki) return undefined
    return wiki

}

module.exports = mongoose.model(`Wikis`,Wiki)
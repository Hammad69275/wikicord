const Wiki = require("../Database/Schema/Wiki")
const User = require("../Database/Schema/User")
const WikiSchema = require("../JoiSchemas/Wiki")

async function create(req,res){
    
    let id = req.params.userID
    if(!id) return res.status(400).json({message:"Invalid ID"})

    let body = req.body
    
    let user = await User.findOne({id})
    if(!user) return res.status(400).json({message:"Invalid User"})
    if(!req.user.admin && !(req.user.id == id)) return res.status(400).json({message:"You cannot create wikis on behalf of someone"})

    if(await Wiki.findOne({author:req.user._id})) return res.status(400).json({message:"Wiki Already Exists"})
    let ws = WikiSchema
    if(body.type == "private") ws = ws.fork(["password"],field => field.required())
    let {error,value} = ws.validate(body)
    if(error?.message) return res.status(400).json({message:error.message}) 
    let wikiObject = {
        author:user._id,
        ...value
    }
    let wiki = await Wiki.create(wikiObject)
    wiki = removeIds(wiki)
    res.status(200).json({message:"SUCCESS",data:wiki})
}

async function fetch(req,res){
    
    let id = req.params.userID
    let password = req.query?.password

    if(!id) return res.status(400).json({message:"Invalid ID"})
    
    let wiki = await Wiki.findByAuthorID(id)
    
    if(!wiki) return res.status(400).json({message:"No Wiki Found For This User"})
    
    wiki = await wiki.populate("author","id username picture createdAt")
    wiki = removeIds(wiki)
    if(!req.user.admin || wiki.type == "private"){
        if(req.user.id !== wiki.author.id){
		if(!password || password !== wiki.password) return res.status(400).json({message:"Incorrect Password"})
		delete wiki.password
	}
     
   }
    
    res.status(200).json({message:"SUCCESS",data:wiki})
}

async function fetchAll(req,res){
    let wikis = await Wiki.find({},"author intro type")
    if(wikis.length == 0) return res.status(200).json({message:"SUCCESS",data:[]})
    for(i=0;i<wikis.length;i++){
        await wikis[i].populate("author","id username picture createdAt")
    }
    wikis = wikis.map(wiki => removeIds(wiki))
    res.status(200).json({message:"SUCCESS",data:wikis})
}

async function Delete(req,res){
    let wiki = await Wiki.findByAuthorID(req.params.userID)
    if(!wiki) return res.status(400).json({message:"Invalid Wiki"})
    wiki = await wiki.populate("author","id username picture createdAt")
    if(!req.user.admin && !(req.user.id == wiki.author.id)) return res.status(400).json({message:"You Are Not The Owner Of This Wiki"})
    await wiki.deleteOne({_id:wiki.author._id})
    return res.status(200).json({message:"SUCCESS"})
}

async function Edit(req,res){
   
    let body = req.body
    let {userID} = req.params
    let user = await User.findOne({id:userID})
    if(!req.user.admin && !(req.user.id == userID)) return res.status(400).json({message:"You Are Not The Owner Of This Wiki"})
    
    let ws = WikiSchema
    if(body?.type == "private") ws = ws.fork(["password"],field => field.required())
    const {error,value} = ws.validate(req.body)
    if(error?.message) return res.status(400).json({message:error.message})
    
    let wiki = await Wiki.updateOne({author:user?._id},value)
    
    if(wiki.matchedCount < 1) return res.status(400).json({message:"FAILED"})
    
    return res.status(200).json({message:"SUCCESS"})
}

function removeIds(wi){
    wiki = wi.toJSON()
    delete wiki._id
    delete wiki.author._id
    if(wiki.socials && wiki.socials.length > 0) wiki.socials.forEach(s => {
        delete s._id
    });
    if(wiki.scrollTiles && wiki.scrollTiles.length > 0) wiki.scrollTiles.forEach(s => {
        delete s._id
    });
    return wiki
}
module.exports = { create , fetch , fetchAll , Delete , Edit}
const User = require("../Database/Schema/User")

async function accountInfo(req,res){
    let {id,username,email,picture,createdAt,admin,active=false} = req.user
    
    return res.status(200).json({message:"SUCCESS",data:{id,username,email,picture,createdAt,admin,active}})
}
async function changePfp(req,res){
    let user = await User.findOne({id:req.user.id})
    user.picture = req.file.path
    await user.save()
    return res.status(200).json({message:"SUCCESS",data:{url:req.file.path}})
}
module.exports = { accountInfo , changePfp }
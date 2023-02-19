const User = require("../Database/Schema/User")

async function fetchAll(req,res){
    const users = await User.find({})
    return res.status(200).json({message:"SUCCESS",data:users})
}

module.exports = { fetchAll }
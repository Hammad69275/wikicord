
function admin(req,res,next){
    if(!req.user.admin) return res.status(403).json({message:"This route is admin protected!"})
    next()
}

module.exports = {
    admin
}
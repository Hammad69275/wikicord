const jwt = require(`jsonwebtoken`)
const User = require("../Database/Schema/User")
async function auth(req,res,next){

    let unsecurePaths = [`/api/v1/auth/login`,`/api/v1/auth/register`,`/api/v1/auth/verify`]
    
    if(unsecurePaths.includes(req.path)) next()
    else {
        let Authorization = req.headers[`authorization`]
        if(!Authorization) return res.status(403).json({code:403,message:"Unauthorized"})
        let decryptedToken = undefined
        try {
            decryptedToken = jwt.verify(Authorization,process.env.JWT_KEY)
        } 
        catch(err){
           console.log(err)
        }
        if(!decryptedToken || !decryptedToken.id) return res.status(403).json({code:403,message:"Invalid Token. Please Login Again"})
        
        let user = await User.findOne({id:decryptedToken.id})
        
        if(!user || !(user.password === decryptedToken.password)) return res.status(403).json({code:403,message:"Invalid Token. Please Login Again"})
        
        if(!user.active) return res.status(403).json({code:403,message:"You need to verify your account. Please check your email to verify"})
        
        req.user = await user.toJSON()
        next()    
    }

}

module.exports = {auth}
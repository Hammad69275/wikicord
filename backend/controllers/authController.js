const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)
const uuidv1 = require("uuid")

const mailer = require(`nodemailer`)
const sendEmail = require("../utility/email.js")

const User = require("../Database/Schema/User")
const UserSchema = require("../JoiSchemas/User")

const snowflake = require(`snowflake-id`).default
const idGenerator = new snowflake()

const transporter = mailer.createTransport({
    service:`gmail`,
    auth: {
      user: process.env.EMAIL,
      pass:process.env.PASSWORD, 
    },
});


async function register(req,res){
    let body = req.body
  
    let user = await User.findOne({email:body?.email})
    if(user) return res.status(400).json({message:"An Account With This Email Already Exists"})

    let data = {
        id:await idGenerator.generate(),
        ...body,
        createdAt:Date.now(),
        picture:`https://ui-avatars.com/api/?background=ff5e00&color=fff&name=${body.username}&size=512`,
        active:false,
        otp:await uuidv1.v1()
    }
    
    let {error,value} = UserSchema.validate(data)
    if(error?.message) return res.status(400).json({message:error.message})
    data.password = await bcrypt.hash(data.password,10)
    await User.create(data)

    await sendEmail(data.otp,data,transporter)

    let token = jwt.sign({id:data.id,password:data.password},process.env.JWT_KEY)

    return res.status(200).json({message:"SUCCESS",data:{token}})
}

async function verifyEmail(req,res){
   
    let otp = req.query.otp
    if(!otp) return res.status(400).json({message:"Invalid OTP"})
    
    let user = await User.findOne({otp}) 
    if(!user) return res.status(400).json({message:"Invalid OTP"})
    
    user.active = true
    user.otp = undefined
    await user.save()

    return res.status(200).json({message:"SUCCESS"})

}

async function login(req,res){

    let {email,password} = req.body

    if(!email) return res.status(400).json({message:"The Email Field Should Not Be Empty"})

    if(!password) return res.status(400).json({message:"The Password Field Should Not Be Empty"})

    let user = await User.findOne({email})
    if(!user) return res.status(400).json({message:"No User Found With This Email"})

    let isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid) return res.status(400).json({message:"Incorrect Password"})

    let token = jwt.sign({id:user.id,password:user.password},process.env.JWT_KEY)

    return res.status(200).json({message:"SUCCESS",data:{token}})
}


module.exports = {register,verifyEmail,login}
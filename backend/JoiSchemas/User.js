const joi = require("joi")


const schema = joi.object({
    id:joi.string(),
    username:joi.string().pattern(/^[0-9a-zA-Z\s].{4,100}$/).required().messages(
        {
            "string.pattern.base":"Username Length Must Be Between 4 To 100 Characters And Only Contain Number And Letters"
            ,"any.required":"Please Enter A Valid Username"
        }),
    email:joi.string().email().required().messages(
        {
            "string.pattern.base":"Invalid Email Addresss"
            ,"any.required":"Please Enter A Valid Email Address"
        }),
    picture:joi.string(),
    password:joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/).required().messages(
        {
            "string.pattern.base":"Password must be 6 to 20 characters long which contain at least one numeric digit, one uppercase and one lowercase letter"
            ,"any.required":"Please Enter A Valid Password"
        }),
    createdAt:joi.number().required(),
    active:joi.boolean().required(),
    otp:joi.string().required()
});

module.exports = schema
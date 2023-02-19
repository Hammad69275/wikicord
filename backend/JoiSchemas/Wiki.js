const joi = require("joi")

const schema = joi.object({
    intro:joi.string().min(10).max(500).required(),
    content:joi.string().min(100).max(25000).required(),
    type:joi.string().pattern(/^(?:public|private)$/).messages({"string.pattern.base":"Type must either be private or public"}).required(),
    password:joi.string().min(8),
    socials:joi.array().items(joi.object({
        name:joi.string().pattern(/^(?:instagram|discord|twitter|facebook|email)$/).required().messages({"string.pattern.base":"Invalid Social Name"}),
        value:joi.string().required()
    })),
    scrollTiles:joi.array().items(joi.object({ title:joi.string().required(),value:joi.string().required() }))
});

module.exports = schema
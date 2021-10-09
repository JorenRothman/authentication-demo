import validator, { Joi } from "koa-context-validator"

const userIdentification = validator({
    body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }),
})

export { userIdentification }

import validator, { Joi } from "koa-context-validator"

const loginValidator = validator({
    body: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }),
})

export { loginValidator }

import Router from "@koa/router"
import { knex } from "../services/database"
import { loginValidator } from "../validators/auth/login"

const authRouter = new Router({ prefix: "/auth" })

authRouter.post("/login", loginValidator, async (ctx) => {
    const user = await knex("users")
        .select("*")
        .where({ username: ctx.request.body.username })
        .first()

    ctx.body = "Login Route"
})

export { authRouter }

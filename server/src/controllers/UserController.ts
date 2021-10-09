import { Context } from "koa"
import { User } from "../models/User"

export class UserController {
    async create(ctx: Context) {
        const { username, password } = ctx.request.body

        const user = new User(0, username, password)

        await user.insert()

        ctx.status = 201
        ctx.body = "added"
    }
}

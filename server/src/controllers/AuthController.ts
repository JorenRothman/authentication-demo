import { DefaultContext } from "koa"
import { User } from "../models/User"
import { UserModelFactory } from "../services/factories/UserModelFactory"

export class AuthController {
    async login(ctx: DefaultContext) {
        const { username } = ctx.request.body

        const user = await User.findByUsername(username)

        ctx.body = UserModelFactory.create(user).serialize()
    }
}

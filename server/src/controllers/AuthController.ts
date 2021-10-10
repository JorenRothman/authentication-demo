import { Context } from "koa"
import { Hash } from "../services/hashing"
import { JWT } from "../services/token"
import { NoRefreshToken } from "../exceptions/NoRefreshToken"
import { RefreshTokenInvalid } from "../exceptions/RefreshTokenInvalid"
import { User } from "../models/User"
import { UserNotFound } from "../exceptions/UserNotFound"

export class AuthController {
    async login(ctx: Context) {
        const { username, password } = ctx.request.body

        const user = await User.findByUsername(username)

        if ((await Hash.verify(user.password, password)) === false) {
            throw new UserNotFound()
        }

        const refreshToken = await JWT.create(user.serialize())
        const accessToken = await JWT.create(user.serialize(), 600000)

        user.insertRefreshToken(refreshToken)

        ctx.cookies.set("refresh_token", refreshToken, { httpOnly: true })

        ctx.body = {
            access_token: accessToken,
        }
    }

    async refreshAccessToken(ctx: Context) {
        const refreshToken = ctx.cookies.get("refresh_token")

        if (refreshToken === undefined) {
            throw new NoRefreshToken()
        }

        if ((await JWT.validate(refreshToken)) === false) {
            throw new RefreshTokenInvalid()
        }

        const userDetails = JWT.decode(refreshToken)

        const user = await User.findByUsername(userDetails.username)

        const newRefreshToken = await JWT.create(user.serialize())
        const accessToken = await JWT.create(user.serialize(), 600000)

        user.insertRefreshToken(newRefreshToken)

        ctx.cookies.set("refresh_token", newRefreshToken, { httpOnly: true })

        ctx.body = {
            access_token: accessToken,
        }
    }
}

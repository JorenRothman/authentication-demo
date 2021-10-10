import Koa, { Context } from "koa"

import { AccessTokenInvalid } from "../../exceptions/AccessTokenInvalid"
import { JWT } from "../../services/token"
import { NoAccessToken } from "../../exceptions/NoAccessToken"

export async function validateAccessToken(ctx: Context, next: Koa.Next) {
    const accessToken = ctx.request.body.access_token

    if (accessToken === undefined) {
        throw new NoAccessToken()
    }

    if ((await JWT.validate(accessToken)) === false) {
        throw new AccessTokenInvalid()
    }

    await next()
}

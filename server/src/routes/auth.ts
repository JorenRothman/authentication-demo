import { AuthController } from "../controllers/AuthController"
import Router from "@koa/router"
import { userIdentification } from "../validators/user/identification"
import { validateAccessToken } from "../middleware/auth/validateAccessToken"

const authRouter = new Router({ prefix: "/auth" })

const authController = new AuthController()

authRouter.post("/login", userIdentification, authController.login)

authRouter.post("/refresh", authController.refreshAccessToken)

authRouter.get("/protected", validateAccessToken, (ctx) => {
    ctx.body = "ok"
})

export { authRouter }

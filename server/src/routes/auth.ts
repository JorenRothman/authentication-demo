import { AuthController } from "../controllers/AuthController"
import Router from "@koa/router"
import { userIdentification } from "../validators/user/identification"

const authRouter = new Router({ prefix: "/auth" })

const authController = new AuthController()

authRouter.post("/login", userIdentification, authController.login)

export { authRouter }

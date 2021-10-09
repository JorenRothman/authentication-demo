import { AuthController } from "../controllers/AuthController"
import Router from "@koa/router"
import { loginValidator } from "../validators/auth/login"

const authRouter = new Router({ prefix: "/auth" })

const authController = new AuthController()

authRouter.post("/login", loginValidator, authController.login)

export { authRouter }

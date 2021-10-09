import Router from "@koa/router"
import { UserController } from "../controllers/UserController"
import { userIdentification } from "../validators/user/identification"

const userRouter = new Router({ prefix: "/user" })

const userController = new UserController()

userRouter.post("/create", userIdentification, userController.create)

export { userRouter }

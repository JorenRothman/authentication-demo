import Koa from "koa"
import { authRouter } from "./routes/auth"
import bodyParser from "koa-bodyparser"
import dotenv from "dotenv"
import error from "koa-json-error"
import { omit } from "lodash"
import { responseTime } from "./middleware/util/responseTime"
import { userRouter } from "./routes/user"

dotenv.config()

const app = new Koa()

app.context.env = process.env
app.use(responseTime())
app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err: any) {
        err.status = err.statusCode || err.status || 500
        ctx.body = err.message
        ctx.app.emit("error", err, ctx)
    }
})
app.use(
    error({
        postFormat: (e, obj) =>
            process.env.NODE_ENV === "production" ? omit(obj, "stack") : obj,
    })
)
app.use(bodyParser({}))
app.use(authRouter.routes())
app.use(userRouter.routes())

app.listen(process.env.PORT, () => {
    console.log(`Server started on localhost:${app.context.env.PORT}`)
})

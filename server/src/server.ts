import Koa from "koa"
import { authRouter } from "./routes/auth"
import bodyParser from "koa-bodyparser"
import dotenv from "dotenv"
import error from "koa-json-error"
import { responseTime } from "./middleware/util/responseTime"

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
app.use(error())
app.use(bodyParser({}))
app.use(authRouter.routes())

app.listen(process.env.PORT, () => {
    console.log(`Server started on localhost:${app.context.env.PORT}`)
})

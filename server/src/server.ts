import Koa from "koa"
import dotenv from "dotenv"

dotenv.config()

const app = new Koa()

app.context.env = process.env

app.use(async (ctx) => {
    ctx.body = "hello world"
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on localhost:${app.context.env.PORT}`)
})

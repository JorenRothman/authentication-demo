import Koa from "koa"
import { authRouter } from "./routes/auth"
import bodyParser from "koa-bodyparser"
import dotenv from "dotenv"
import error from "koa-json-error"
import { knex } from "./services/database"
import { responseTime } from "./middleware/util/responseTime"

dotenv.config()

const app = new Koa()

app.context.env = process.env
app.use(responseTime())
app.use(error())
app.use(bodyParser({}))
app.use(authRouter.routes())

app.listen(process.env.PORT, () => {
    console.log(`Server started on localhost:${app.context.env.PORT}`)
})

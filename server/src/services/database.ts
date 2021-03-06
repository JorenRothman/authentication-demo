import Knex from "knex"
import colors from "colors"
import dotenv from "dotenv"

dotenv.config()

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_USER_PASS } = process.env

const knex = Knex({
    client: "mysql",
    connection: {
        host: DB_HOST ? DB_HOST : "127.0.0.1",
        port: DB_PORT ? Number.parseInt(DB_PORT) : 3306,
        user: DB_USER,
        password: DB_USER_PASS,
        database: DB_NAME,
    },
    debug: true,
    log: {
        debug(message) {
            console.log(colors.blue(message))
        },
    },
})

export { knex }

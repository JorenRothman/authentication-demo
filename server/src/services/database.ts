import Knex from "knex"
import colors from "colors"

const knex = Knex({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "",
        database: "authentication_demo",
    },
    debug: true,
    log: {
        debug(message) {
            console.log(colors.blue(message))
        },
    },
})

export { knex }

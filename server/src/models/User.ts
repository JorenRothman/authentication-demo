import { Model } from "./Model"
import { UserNotFound } from "../exceptions/UserNotFound"
import { knex } from "../services/database"

interface IUser {
    id: number
    username: string
    password: string
}

class User extends Model implements IUser {
    public id: number

    public username: string

    public password: string

    constructor(id: number, username: string, password: string) {
        super()

        this.id = id
        this.username = username
        this.password = password
    }

    static async findByUsername(username: string): Promise<User> {
        const user = await knex<User>("users")
            .select("*")
            .where({ username })
            .first()

        if (!user) {
            throw new UserNotFound()
        }

        return user
    }

    serialize() {
        const userSerialized = JSON.parse(JSON.stringify(this))

        delete userSerialized["password"]

        return userSerialized
    }
}

export { User, IUser }

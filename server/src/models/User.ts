import { Model } from "./Model"
import { UserExists } from "../exceptions/UserExists"
import { UserNotFound } from "../exceptions/UserNotFound"
import { hashString } from "../services/hashing"
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

    async insert(): Promise<boolean> {
        const hash = await hashString(this.password)

        try {
            await knex<User>("users").insert({
                username: this.username,
                password: hash,
            })
        } catch (error) {
            throw new UserExists()
        }

        return true
    }

    serialize() {
        const userSerialized = JSON.parse(JSON.stringify(this))

        delete userSerialized["password"]

        return userSerialized
    }
}

export { User, IUser }

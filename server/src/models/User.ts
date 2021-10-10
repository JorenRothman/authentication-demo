import { Hash } from "../services/hashing"
import { Model } from "./Model"
import { UserExists } from "../exceptions/UserExists"
import { UserModelFactory } from "../services/factories/UserModelFactory"
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

    public refresh_token: string

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

        return UserModelFactory.create(user)
    }

    async insert(): Promise<boolean> {
        const hash = await Hash.create(this.password)

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

    async insertRefreshToken(refreshToken: string) {
        try {
            const user = await knex<User>("users").where("id", this.id).update({
                refresh_token: refreshToken,
            })
        } catch (error) {
            console.log(error)
        }
    }

    serialize() {
        const userSerialized = JSON.parse(JSON.stringify(this))

        delete userSerialized["password"]

        return userSerialized
    }
}

export { User, IUser }

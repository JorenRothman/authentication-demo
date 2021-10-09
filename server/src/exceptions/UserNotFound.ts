import { Exception } from "./Exception"

export class UserNotFound extends Exception {
    constructor() {
        super("User not found")

        this.name = this.constructor.name
        this.status = 404
    }
}

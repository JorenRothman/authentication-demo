import { Exception } from "./Exception"

export class UserExists extends Exception {
    constructor() {
        super("User already exists")

        this.name = this.constructor.name
        this.status = 409
    }
}

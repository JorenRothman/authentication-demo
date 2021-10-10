import { Exception } from "./Exception"

export class NoRefreshToken extends Exception {
    constructor() {
        super("Refresh Token not found")

        this.name = this.constructor.name
        this.status = 404
    }
}

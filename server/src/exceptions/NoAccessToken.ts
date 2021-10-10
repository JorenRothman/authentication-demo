import { Exception } from "./Exception"

export class NoAccessToken extends Exception {
    constructor() {
        super("Access Token not found")

        this.name = this.constructor.name
        this.status = 404
    }
}

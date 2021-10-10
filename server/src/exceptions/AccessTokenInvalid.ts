import { Exception } from "./Exception"

export class AccessTokenInvalid extends Exception {
    constructor() {
        super("Access Token is not valid")

        this.name = this.constructor.name
        this.status = 403
    }
}

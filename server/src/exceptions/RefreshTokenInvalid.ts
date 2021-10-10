import { Exception } from "./Exception"

export class RefreshTokenInvalid extends Exception {
    constructor() {
        super("Refresh Token is not valid")

        this.name = this.constructor.name
        this.status = 403
    }
}

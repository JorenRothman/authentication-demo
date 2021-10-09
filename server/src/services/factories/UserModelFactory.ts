import { IUser, User } from "../../models/User"

export class UserModelFactory {
    public static create(object: IUser) {
        const { id, username, password } = object

        return new User(id, username, password)
    }
}

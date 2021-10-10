import argon2 from "argon2"

export class Hash {
    static async create(string: string): Promise<string> {
        return await argon2.hash(string)
    }

    static async verify(hash: string, compare: string): Promise<boolean> {
        return await argon2.verify(hash, compare)
    }
}

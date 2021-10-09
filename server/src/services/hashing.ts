import argon2 from "argon2"

export async function hashString(string: string): Promise<string> {
    const hash = await argon2.hash(string)

    return hash
}

export async function verifyHash(
    hash: string,
    stringToCompare: string
): Promise<boolean> {
    const isValid = await argon2.verify(hash, stringToCompare)

    return isValid
}

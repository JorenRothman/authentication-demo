import { createDecoder, createSigner, createVerifier } from "fast-jwt"

import dotenv from "dotenv"

dotenv.config()

export class JWT {
    static create(data: [string: any], time: number = 86400000) {
        const sign = createSigner({
            key: process.env.APP_SECRET,
            expiresIn: time,
        })

        return sign(data)
    }

    static decode(token: string) {
        const decoder = createDecoder({})

        return decoder(token)
    }

    static validate(token: string) {
        const verify = createVerifier({
            key: process.env.APP_SECRET,
        })

        try {
            verify(token)

            return true
        } catch (error) {
            return false
        }
    }
}

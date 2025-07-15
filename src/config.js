import {config} from "dotenv";
config();

export const serverConfig = {
    PORT: process.env.PORT || 5000,
    expiresIn: process.env.EXPIRES,
    bcryptSaltRounds: 10,
    jwtSecret: process.env.JWT_SECRET
}
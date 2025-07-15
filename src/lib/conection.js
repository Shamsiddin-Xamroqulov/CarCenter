import db from "mysql2/promise";

export const connectionDb = db.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
})

export const fetch = async (query, type=false, ...params) => {
    if(type) {
        let [[result]] = await connectionDb.query(query, params)
        return result
    }else {
        let [result] = await connectionDb.query(query, params)
        return result
    }
}
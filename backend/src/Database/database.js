import postgres from "postgres";
import 'dotenv/config'

const sql = postgres({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    max: 20,
    idle_timeout: 30000,
    connect_timeout: 2000
})

const test = await sql `SELECT * FROM users`
console.log(test)
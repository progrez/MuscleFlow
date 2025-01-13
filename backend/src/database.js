import postgres from 'postgres'

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

export default sql
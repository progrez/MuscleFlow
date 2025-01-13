import sql from '../database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ error: 'Invalid request' })
    }
    const user = await sql`SELECT id_user, email, password, username FROM users WHERE email = ${email}`
    if (user.length === 0) {
        return res.status(404).json({ error: 'user not found' })
    }

    const checkPassword = await bcrypt.compare(password, user[0].password)
    if (!checkPassword) {
        return res.status(403).json({ error: 'incorrect password' })
    }
    try {
        const token = await sign({ username: user[0].username, userID: user[0].id_user, usermail: user[0].email }, process.env.SECRET_KEY)
        return res.send({ token })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

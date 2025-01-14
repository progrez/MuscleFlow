import sql from "../database";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const register = async (req, res) => {
    const {email, password, username} = req.body
    if (!email || !password || !username) {
        return res.status(400).json({error: 'invalid request'})
    }
    const checkMail = await sql `SELECT * FROM users WHERE email = ${email}`
    const checkUsername = await sql `SELECT * FROM users WHERE username = ${username}`

    if (email === checkMail) {
        return res.status(409).json({error: 'email is already in use'})
    }

    if (checkUsername === username) {
        return res.status(409).json({error: 'username is already in use'})
    }

    try {
        const hashedPassword = bcrypt.hashSync(password, 10)
        await sql `INSERT INTO users (email, password, username) VALUES (${email}, ${hashedPassword},${username})`

        const user = await sql `SELECT * FROM users WHERE email = ${email}`
        const payload = {
            userID: user[0].id_user,
            username: user[0].username,
            usermail: user[0].email
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY)

        return res.status(200).json({info: 'user was created succesfully', token,})
    }
    catch (err) {
        return res.status(500).json({error: 'Internal server error. Please try again later'})
    }
}

export default register
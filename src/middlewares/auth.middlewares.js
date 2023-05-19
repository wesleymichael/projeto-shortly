import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function validateSignupEmail(req, res, next) {
    const {email} = req.body;

    try{
        const user = await db.query(`SELECT * FROM "users" WHERE email = $1`, [email]);
        if(user.rowCount !== 0) return res.status(409).send("This email already exists");
        next();
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function validateSignin(req, res, next) {
    const {email, password} = req.body;

    try{
        const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
        
        if(user.rowCount === 0) return res.sendStatus(401);

        const isPasswordCorrect = bcrypt.compareSync(password, user.rows[0].password);
        if(!isPasswordCorrect) return res.sendStatus(401);

        res.locals.user = user.rows[0];
        next();
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

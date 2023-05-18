import { db } from "../database/database.connection.js";

export async function validateUserEmail(req, res, next) {
    const {email} = req.body;

    try{
        const user = await db.query(`SELECT * FROM "users" WHERE email = $1`, [email]);
        if(user.rowCount !== 0) return res.status(409).send("This email already exists");
        next();
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function signup(req, res){
    const {name, email, password} = req.body;

    try{
        const hash = bcrypt.hashSync(password, 10);
        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, hash]);
        return res.sendStatus(201);
    } catch (error) {   
        return res.status(500).send(error.message);
    }
}

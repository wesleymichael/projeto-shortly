import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export async function signin(req, res){
    try{
        const user = res.locals.user;
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign(user, secretKey);

        await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [user.id, token]);

        res.status(200).send({token});

    } catch (error) {
        return res.status(500).send(error.message)
    }
}
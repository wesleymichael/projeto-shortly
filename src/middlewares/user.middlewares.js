import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { getUserByEmail } from "../repository/user.repository.js";

export async function validateSignupEmail(req, res, next) {
    const {email} = req.body;

    try{
        const result = await getUserByEmail(email);
        if(result.rowCount !== 0) return res.status(409).send("This email already exists");
        next();
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function validateSignin(req, res, next) {
    const {email, password} = req.body;

    try{
        const result = await getUserByEmail(email);
        
        if(result.rowCount === 0) return res.sendStatus(401);

        const isPasswordCorrect = bcrypt.compareSync(password, result.rows[0].password);
        if(!isPasswordCorrect) return res.sendStatus(401);

        res.locals.user = result.rows[0];
        next();
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

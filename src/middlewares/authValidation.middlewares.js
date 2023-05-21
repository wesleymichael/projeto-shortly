import { db } from "../database/database.connection.js";
import { addSession } from "../repository/sessions.repository.js";

export async function authValidation(req, res, next){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if(!token) return res.sendStatus(401);

    try{
        const session = await addSession(token);

        if(session.rowCount === 0) return res.sendStatus(401);

        res.locals.session = session.rows[0];
        next();
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

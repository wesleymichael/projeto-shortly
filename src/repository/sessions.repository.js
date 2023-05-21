import { db } from "../database/database.connection.js";

export async function addSession(token){
    const result = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token]);
    return result;
}
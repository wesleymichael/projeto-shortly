import { db } from "../database/database.connection.js";
import { nanoid } from 'nanoid';

export async function shortenUrl(req, res){
    const { url } = req.body;
    try{
        const session = res.locals.session;
        const shortUrl = nanoid();

        const urlCreated = await db.query(`
            INSERT INTO "urls" ("userId", "url", "shortUrl") VALUES ($1, $2, $3)
            RETURNING id;
        `, [session.userId, url, shortUrl]);

        const body = { id: urlCreated.rows[0].id, shortUrl}

        res.status(201).send(body);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

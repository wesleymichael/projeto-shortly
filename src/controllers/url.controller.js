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

export async function getUrlById(req, res){
    const id = parseInt(req.params.id);

    if(isNaN(id)) return res.sendStatus(400);

    try {
        const url = await db.query(`
            SELECT "urls".id, "urls"."shortUrl", "urls"."url" 
            FROM "urls"
            WHERE id = $1;
        `, [id]);

        if(url.rowCount === 0) return res.sendStatus(404);

        return res.status(200).send(url.rows[0]);
    } catch (error) {
        return res.status(500).send(error.messsage)
    }
}

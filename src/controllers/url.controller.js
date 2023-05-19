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
        const urlData = await db.query(`
            SELECT "urls".id, "urls"."shortUrl", "urls"."url" 
            FROM "urls"
            WHERE id = $1;
        `, [id]);

        if(urlData.rowCount === 0) return res.sendStatus(404);

        return res.status(200).send(urlData.rows[0]);
    } catch (error) {
        return res.status(500).send(error.messsage)
    }
}

export async function redirectToUrl(req, res){
    const {shortUrl} = req.params;
    
    try {
        const urlData = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [shortUrl]);

        if(urlData.rowCount === 0) return res.sendStatus(404);

        const absoluteUrl = urlData.rows[0].url.startsWith('http') ? urlData.rows[0].url : `http://${urlData.rows[0].url}`;
        return res.redirect(absoluteUrl);

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

import { db } from "../database/database.connection.js";
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';

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
    const id = res.locals.id;
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
    try {       
        const urlData = res.locals.urlData;

        await db.query(`UPDATE urls SET "visitCount" = $1 WHERE id = $2;`, [urlData.visitCount+1, urlData.id]);

        const absoluteUrl = urlData.url.startsWith('http') ? urlData.url : `http://${urlData.url}`;
        return res.redirect(absoluteUrl);

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function deleteUrl(req, res){
    const secretKey = process.env.JWT_SECRET;
    const id = res.locals.id;
    const session = res.locals.session;

    try {
        const user = jwt.verify(session.token, secretKey);

        const results = await db.query(`DELETE FROM urls WHERE id = $1 AND "userId" = $2;`, [id, user.id]);

        if(results.rowCount === 0) return res.sendStatus(401);

        res.sendStatus(204);

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getMyUrls(req, res){
    const secretKey = process.env.JWT_SECRET;
    const session = res.locals.session;

    try {
        const user = jwt.verify(session.token, secretKey);

        const result = await db.query(`
            SELECT users.id, users.name, SUM(urls."visitCount") as "visitCount", 
                json_agg(json_build_object(
                    'id', urls.id, 
                    'shortUrl', urls."shortUrl", 
                    'url', urls.url, 
                    'visitCount', urls."visitCount"
                )) AS "shortenedUrls"
                FROM users
                JOIN urls ON users.id = urls."userId"
                WHERE users.id = $1
                GROUP BY users.id, users.name;
        `, [user.id]);

        return res.send(result.rows[0]);

    } catch (error) {
        return res.status(500).send(error.message);
    }
}
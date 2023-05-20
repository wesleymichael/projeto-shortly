import { db } from "../database/database.connection.js";

export async function validateId(req, res, next){
    const id = parseInt(req.params.id);
    if(isNaN(id)) return res.sendStatus(400);

    res.locals.id = id;
    next();
}

export async function validateShortUrl(req, res, next){
    const {shortUrl} = req.params;

    try {
        const result = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [shortUrl]);

        if(result.rowCount === 0) return res.sendStatus(404);

        res.locals.urlData = result.rows[0];
        next();

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function validateUrl(req, res, next){
    const id = res.locals.id;

    try {
        const urlExists = await db.query(`SELECT 1 FROM urls WHERE id = $1;`, [id]);

        if(urlExists.rowCount === 0) return res.sendStatus(404);

        next();

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

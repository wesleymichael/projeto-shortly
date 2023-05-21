import { db } from "../database/database.connection.js";

export async function insertUrlRepository(userId, url, shortUrl){
    const result = await db.query(`
        INSERT INTO "urls" ("userId", "url", "shortUrl") VALUES ($1, $2, $3)
            RETURNING id;
    `, [userId, url, shortUrl]);
    return result;
}

export async function getUrlByIdRepository(id){
    const result = await db.query(`
        SELECT "urls".id, "urls"."shortUrl", "urls"."url" 
            FROM "urls"
            WHERE id = $1;
    `, [id]);
    return result;
}

export async function updateVisitCountRepository(newVisitCount, urlId){
    const result =  await db.query(`
        UPDATE urls 
        SET "visitCount" = $1 WHERE id = $2;`, [newVisitCount, urlId]);
    return result;
}

export async function deleteUrlRepository(urlId, userId){
    const result = await db.query(`DELETE FROM urls WHERE id = $1 AND "userId" = $2;`, [urlId, userId]);
    return result;
}

export async function getMyUrlsRepository(userId){
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
    `, [userId]);
    return result;
}

export async function rankingRepository(){
    const result = await db.query(`
        SELECT users.id, users.name, COUNT(urls.id) AS "linksCount", SUM(urls."visitCount") as "visitCount"
            FROM users
            JOIN urls ON users.id = urls."userId"
            GROUP BY users.id, users.name
            ORDER BY "visitCount" DESC
            LIMIT 10;
    `);
    return result;
}

export async function getUrlByShortUrlRepository(shortUrl){
    const result = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [shortUrl]);
    return result;
}
import { tokenToUser } from "../utils/tokenToUser.js";
import { nanoid } from 'nanoid';
import { 
    deleteUrlRepository, 
    getMyUrlsRepository, 
    getUrlByIdRepository, 
    insertUrlRepository, 
    rankingRepository, 
    updateVisitCountRepository 
} from "../repository/urls.repository.js";

export async function shortenUrl(req, res){
    const { url } = req.body;
    const session = res.locals.session;

    try{
        const user = tokenToUser(session.token);    
        const shortUrl = nanoid();

        const result = await insertUrlRepository(user.id, url, shortUrl);

        res.status(201).send( { id: result.rows[0].id, shortUrl} );
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getUrlById(req, res){
    const id = res.locals.id;
    try {
        const results = await getUrlByIdRepository(id);

        if(results.rowCount === 0) return res.sendStatus(404);

        return res.status(200).send(results.rows[0]);
    } catch (error) {
        return res.status(500).send(error.messsage)
    }
}

export async function redirectToUrl(req, res){    
    try {       
        const urlData = res.locals.urlData;

        await updateVisitCountRepository(urlData.visitCount+1, urlData.id);

        const absoluteUrl = urlData.url.startsWith('http') ? urlData.url : `http://${urlData.url}`;
        return res.redirect(absoluteUrl);

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function deleteUrl(req, res){
    const id = res.locals.id;
    const session = res.locals.session;

    try {
        const user = tokenToUser(session.token);

        const result = await deleteUrlRepository(id, user.id);

        if(result.rowCount === 0) return res.sendStatus(401);

        res.sendStatus(204);

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getMyUrls(req, res){
    const session = res.locals.session;

    try {
        const user = tokenToUser(session.token);

        const result = await getMyUrlsRepository(user.id);

        return res.send(result.rows[0]);

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function ranking(req, res){
    try {
        const result = await rankingRepository();
        return res.status(200).send(result.rows)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

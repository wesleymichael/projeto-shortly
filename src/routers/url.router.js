import { Router } from "express";
import { validadeSchema } from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/url.schemas.js";
import { authValidation } from "../middlewares/authValidation.middlewares.js";
import { deleteUrl, getUrlById, redirectToUrl, shortenUrl } from "../controllers/url.controller.js";
import { validateId, validateShortUrl, validateUrl } from "../middlewares/url.middlewares.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validadeSchema(urlSchema), authValidation, shortenUrl);
urlRouter.get("/urls/:id", validateId, getUrlById);
urlRouter.get("/urls/open/:shortUrl",validateShortUrl, redirectToUrl);
urlRouter.delete("/urls/:id", authValidation, validateId, validateUrl, deleteUrl);

export default urlRouter;

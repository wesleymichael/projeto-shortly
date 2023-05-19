import { Router } from "express";
import { validadeSchema } from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/url.schemas.js";
import { authValidation } from "../middlewares/authValidation.middlewares.js";
import { deleteUrl, getUrlById, redirectToUrl, shortenUrl } from "../controllers/url.controller.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validadeSchema(urlSchema), authValidation, shortenUrl);
urlRouter.get("/urls/:id", getUrlById);
urlRouter.get("/urls/open/:shortUrl", redirectToUrl);
urlRouter.delete("/urls/:id", authValidation, deleteUrl);

export default urlRouter;

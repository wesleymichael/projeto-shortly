import { Router } from "express";
import { validadeSchema } from "../middlewares/validateSchema.middleware.js";
import { urlSchema } from "../schemas/url.schemas.js";
import { authValidation } from "../middlewares/authValidation.middlewares.js";
import { shortenUrl } from "../controllers/url.controller.js";

const urlRouter = Router();

urlRouter.post("/urls/shorten", validadeSchema(urlSchema), authValidation, shortenUrl);

export default urlRouter;

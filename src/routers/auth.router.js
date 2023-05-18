import { Router } from "express";
import { validadeSchema } from "../middlewares/validateSchema.middleware.js";
import { userSchema } from "../schemas/auth.schemas.js";
import { validateUserEmail } from "../middlewares/auth.middlewares.js";
import { signup } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", validadeSchema(userSchema), validateUserEmail, signup);

export default authRouter;

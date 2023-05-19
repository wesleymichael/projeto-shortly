import { Router } from "express";
import { validadeSchema } from "../middlewares/validateSchema.middleware.js";
import { signinSchema, signupSchema } from "../schemas/auth.schemas.js";
import { validateSignin, validateSignupEmail } from "../middlewares/auth.middlewares.js";
import { signin, signup } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", validadeSchema(signupSchema), validateSignupEmail, signup);
authRouter.post("/signin", validadeSchema(signinSchema), validateSignin, signin);

export default authRouter;

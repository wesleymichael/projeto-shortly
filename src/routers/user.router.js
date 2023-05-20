import { Router } from "express";
import { validadeSchema } from "../middlewares/validateSchema.middleware.js";
import { signinSchema, signupSchema } from "../schemas/user.schemas.js";
import { validateSignin, validateSignupEmail } from "../middlewares/user.middlewares.js";
import { signin, signup } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/signup", validadeSchema(signupSchema), validateSignupEmail, signup);
userRouter.post("/signin", validadeSchema(signinSchema), validateSignin, signin);

export default userRouter;

import { Router } from "express";
import userRouter from "./user.router.js";
import urlRouter from "./url.router.js";

const router = Router();

router.use(userRouter);
router.use(urlRouter);

export default router;

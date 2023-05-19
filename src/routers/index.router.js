import { Router } from "express";
import authRouter from "./auth.router.js";
import urlRouter from "./url.router.js";

const router = Router();

router.use(authRouter);
router.use(urlRouter);

export default router;

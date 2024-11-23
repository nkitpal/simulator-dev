import { Router } from "express";
import { googleLogin } from "../controllers/auth.js";

const router = Router();

router.post("/login", googleLogin);

export default router;

import express from "express";
import { register, login } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", register); // You might later restrict this to ADMIN only
router.post("/login", login);

export default router;

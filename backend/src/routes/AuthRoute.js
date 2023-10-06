import express from "express";
import { GetUser, Login, Logout } from "../controllers/Auth.js";

const router = express.Router();

router.get("/user", GetUser);
router.post("/login", Login);
router.delete("/logout", Logout);

export default router;

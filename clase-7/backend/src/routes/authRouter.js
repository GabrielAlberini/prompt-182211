import { Router } from "express"
import { login, register } from "../controllers/authController.js"

const router = Router();

// Aquí irán las rutas relacionadas con "auth"
router.post("/login", login)

// POST → http://localhost:3000/auth/register → { email, password }
router.post("/register", register)

export { router }
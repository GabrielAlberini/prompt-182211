// index.js
import express from "express";
import cors from "cors"
import { connectDb } from "./config/mongodb.js";
import { router as placesRouter } from "./routes/placesRouter.js";
import { router as authRouter } from "./routes/authRouter.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(cors())

// GET: listar todos
// POST http://locahost:3000/places

app.use("/auth", authRouter)
app.use("/places", authMiddleware, placesRouter)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  connectDb()
});
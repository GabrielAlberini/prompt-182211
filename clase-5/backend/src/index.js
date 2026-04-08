// index.js
import express from "express";
import { randomUUID } from "node:crypto";
import cors from "cors"
import { connectDb } from "./config/mongodb.js";
import { Place } from "./models/Places.js";

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());
app.use(cors())

// GET: listar todos
app.get("/places", async (req, res) => {
  const places = await Place.find({});
  res.json(places);
});

// GET: obtener uno por id
app.get("/places/:id", async (req, res) => {
  const place = await Place.findOne({ id: req.params.id });
  if (!place) return res.status(404).json({ error: "Place not found" });
  res.json(place);
});

// POST: crear nuevo
app.post("/places", async (req, res) => {
  const { name, lat, lng } = req.body;
  if (!name || !lat || !lng) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newPlace = new Place({
    id: randomUUID(),
    name,
    lat,
    lng,
    date: new Date().toISOString(),
  });
  await newPlace.save();
  res.status(201).json(newPlace);
});

// PATCH: actualizar por id
app.patch("/places/:id", async (req, res) => {
  const { name, lat, lng } = req.body;
  const place = await Place.findOne({ id: req.params.id });
  if (!place) return res.status(404).json({ error: "Place not found" });

  place.name = name ?? place.name;
  place.lat = lat ?? place.lat;
  place.lng = lng ?? place.lng;
  place.date = new Date().toISOString();

  await place.save();
  res.json(place);
});

// DELETE: eliminar por id
app.delete("/places/:id", async (req, res) => {
  const place = await Place.findOneAndDelete({ id: req.params.id });
  if (!place) return res.status(404).json({ error: "Place not found" });
  res.json(place);
});

// Ruta por defecto (404)
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  connectDb()
});
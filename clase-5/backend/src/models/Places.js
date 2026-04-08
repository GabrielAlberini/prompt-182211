import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  id: { type: String, required: true }, // UUID
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  date: { type: String, required: true }
});

export const Place = mongoose.model("Place", placeSchema);
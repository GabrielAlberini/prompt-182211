import { Place } from "../models/Places.js";

const getPlaces = async (req, res) => {
  const places = await Place.find({});
  res.json(places);
}

const getPlace = async (req, res) => {
  const place = await Place.findOne({ id: req.params.id });
  if (!place) return res.status(404).json({ error: "Place not found" });
  res.json(place);
}

const addPlace = async (req, res) => {
  const { name, lat, lng } = req.body;
  if (!name || !lat || !lng) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newPlace = new Place({
    name,
    lat,
    lng,
    date: new Date().toISOString(),
  });
  await newPlace.save();
  res.status(201).json(newPlace);
}

const updatePlace = async (req, res) => {
  const { name, lat, lng } = req.body;
  const place = await Place.findOne({ id: req.params.id });
  if (!place) return res.status(404).json({ error: "Place not found" });

  place.name = name ?? place.name;
  place.lat = lat ?? place.lat;
  place.lng = lng ?? place.lng;
  place.date = new Date().toISOString();

  await place.save();
  res.json(place);
}

const deletePlace = async (req, res) => {
  const place = await Place.findOneAndDelete({ id: req.params.id });
  if (!place) return res.status(404).json({ error: "Place not found" });
  res.json(place);
}

export { getPlaces, getPlace, addPlace, deletePlace, updatePlace };

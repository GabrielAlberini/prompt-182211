// placesServices.js

const STORAGE_KEY = "ruteando_places";

// Obtener todos los lugares
export const getPlaces = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Guardar lista completa de lugares
const savePlaces = (places) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(places));
};

// Agregar un nuevo lugar
export const addPlace = (name, coords) => {
  const places = getPlaces();
  const newPlace = {
    id: crypto.randomUUID(),
    name,
    coords,
    date: new Date().toISOString(),
  };
  const updated = [newPlace, ...places];
  savePlaces(updated);
  return newPlace;
};

// Actualizar un lugar por ID
export const updatePlace = (id, updatedFields) => {
  const places = getPlaces();
  const updated = places.map((p) =>
    p.id === id ? { ...p, ...updatedFields } : p
  );
  savePlaces(updated);
  return updated.find((p) => p.id === id);
};

// Eliminar un lugar por ID
export const deletePlace = (id) => {
  const places = getPlaces();
  const updated = places.filter((p) => p.id !== id);
  savePlaces(updated);
  return updated;
};

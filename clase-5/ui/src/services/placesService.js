// placesServices.js

const API_URL = "http://localhost:3000/places";

// Obtener todos los lugares
export const getPlaces = async () => {
  const response = await fetch(API_URL, { method: "GET" });
  if (!response.ok) throw new Error("Error al obtener lugares");
  return await response.json();
};

// Obtener un lugar por ID
export const getPlaceById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: "GET" });
  if (!response.ok) throw new Error("Lugar no encontrado");
  return await response.json();
};

// Agregar un nuevo lugar
export const addPlace = async (name, coords) => {
  const [lat, lng] = coords.split(",");
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, lat, lng }),
  });
  if (!response.ok) throw new Error("Error al crear lugar");
  return await response.json();
};

// Actualizar un lugar por ID
export const updatePlace = async (id, updatedFields) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFields),
  });
  if (!response.ok) throw new Error("Error al actualizar lugar");
  return await response.json();
};

// Eliminar un lugar por ID
export const deletePlace = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Error al eliminar lugar");
  return await response.json();
};

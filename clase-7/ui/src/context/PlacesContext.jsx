// PlacesContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { getPlaces, addPlace, updatePlace, deletePlace } from '../services/placesService.js';

const PlacesContext = createContext();

export const PlacesProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);

  const fetchingPlaces = async () => {
    try {
      const data = await getPlaces();
      setPlaces(data);
    } catch (error) {
      console.error("Error al cargar lugares:", error);
    }
  };

  // Cargar lugares al iniciar
  useEffect(() => {
    fetchingPlaces();
  }, [places]);

  // Funciones expuestas
  const addNewPlace = async (name, coords) => {
    try {
      const newPlace = await addPlace(name, coords);
      setPlaces(prev => [newPlace, ...prev]);
      return newPlace;
    } catch (error) {
      console.error("Error al agregar lugar:", error);
    }
  };

  const updateExistingPlace = async (id, fields) => {
    try {
      const updated = await updatePlace(id, fields);
      setPlaces(prev => prev.map(p => p.id === id ? updated : p));
      return updated;
    } catch (error) {
      console.error("Error al actualizar lugar:", error);
    }
  };

  const deleteExistingPlace = async (id) => {
    try {
      await deletePlace(id);
      setPlaces(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar lugar:", error);
    }
  };

  return (
    <PlacesContext.Provider value={{ places, addNewPlace, updateExistingPlace, deleteExistingPlace }}>
      {children}
    </PlacesContext.Provider>
  );
};

// Hook para consumir el contexto
export const usePlaces = () => useContext(PlacesContext);

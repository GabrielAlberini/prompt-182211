
import { createContext, useContext, useState, useEffect } from 'react';
import { getPlaces, addPlace, updatePlace, deletePlace } from '../services/placesService.js';

const PlacesContext = createContext();

export const PlacesProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);

  const fetchingPlaces = async () => {
    const places = await getPlaces()
    setPlaces(places)
  }

  // Cargar lugares al iniciar
  useEffect(() => {
    fetchingPlaces()
  }, []);

  // Funciones expuestas
  const addNewPlace = (name, coords) => {
    const newPlace = addPlace(name, coords);
    setPlaces(prev => [newPlace, ...prev]);
    return newPlace;
  };

  const updateExistingPlace = (id, fields) => {
    const updated = updatePlace(id, fields);
    setPlaces(prev => prev.map(p => p.id === id ? updated : p));
    return updated;
  };

  const deleteExistingPlace = (id) => {
    const updated = deletePlace(id);
    setPlaces(updated);
    return updated;
  };

  return (
    <PlacesContext.Provider value={{ places, addNewPlace, updateExistingPlace, deleteExistingPlace }}>
      {children}
    </PlacesContext.Provider>
  );
};

// Hook para consumir el contexto
export const usePlaces = () => useContext(PlacesContext);

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// Importamos los lugares desde el contexto que ya creaste [4]
import { usePlaces } from '../context/PlacesContext';

// Componente auxiliar para centrar el mapa automáticamente [5]
const RecenterMap = ({ coords }) => {
  const map = useMap();
  if (coords) map.setView([-34.6037, -58.3816], 4);
  return null;
};

const RuteandoMap = () => {
  const { places } = usePlaces(); // Acceso a la lista de bitácora [4]

  // Determinamos el centro: el último lugar visitado o una posición por defecto [5]
  const mapCenter = [-34.6037, -58.3816]

  return (
    <div style={{ height: '300px', width: '100%', borderY: '1px solid var(--color-secondary)' }}>
      <MapContainer
        center={mapCenter}
        zoom={20}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Renderizado dinámico de tu bitácora de lugares [6] */}
        {places.map((place) => {

          return (
            <Marker
              key={place._id}
              position={[place.lat, place.lng]}
            >
              <Popup>
                <div style={{ fontFamily: 'Poppins', textAlign: 'center' }}>
                  <strong style={{ color: 'var(--color-primary)' }}>
                    {place.name}
                  </strong><br />
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-secondary)' }}>
                    ¡Lugar ruteado! 📍
                  </span>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Efecto de centrado automático al abrir la app [5] */}
        <RecenterMap coords={mapCenter} />
      </MapContainer>
    </div >
  );
};

export { RuteandoMap }
import { useState, useEffect } from 'react';
import { usePlaces } from './context/PlacesContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { RuteandoMap } from './components/Map';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

const RuteandoApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [placeName, setPlaceName] = useState('');
  const [isMobileDevice, setIsMobileDevice] = useState(true);

  const { places, addNewPlace, updateExistingPlace, deleteExistingPlace } = usePlaces();
  const { handleLogout } = useContext(AuthContext);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    setIsMobileDevice(mobileRegex.test(userAgent.toLowerCase()));
  }, []);

  const handleSavePlace = (e) => {
    e.preventDefault();
    if (!placeName.trim()) return alert("Por favor, dale un nombre a este rincón.");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
        addNewPlace(placeName, coords);
        setPlaceName('');
        alert("📍 ¡Lugar guardado con éxito!");
      },
      (err) => {
        alert("Para 'rutear' un lugar, necesitamos acceso a tu ubicación actual.")
        console.log(err)
      },
      { enableHighAccuracy: true }
    );
  };

  if (!isMobileDevice) {
    return (
      <div className="desktop-notice" style={{ display: 'flex', textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ color: 'var(--color-primary)' }}>📍 Ruteando</h1>
        <p>Esta es una <strong>bitácora de exploración física</strong>.</p>
        <p>Para mantener la esencia de la app, por favor ábrela desde tu <strong>teléfono móvil</strong>.</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="auth-container" style={{ padding: '2.5rem 1.5rem' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem' }}>Ruteando</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--color-secondary)' }}>
          Tu mapa personal de lugares favoritos.
        </p>

        <input className="input-field" type="email" placeholder="Correo electrónico" required />
        <input className="input-field" type="password" placeholder="Tu contraseña" required />

        <d className="privacy-container">
          <input
            type="checkbox"
            id="privacy"
            checked={acceptedPrivacy}
            onChange={(e) => setAcceptedPrivacy(e.target.checked)}
          />
          <label htmlFor="privacy" style={{ fontSize: '0.8rem' }}>
            Acepto la política de privacidad (Ley de Protección de Datos Personales Argentina).
          </label>
        </d>

        <button
          className="btn-primary"
          disabled={!acceptedPrivacy}
          onClick={() => setIsLoggedIn(true)}
        >
          Empezar a explorar
        </button>
      </div>
    );
  }

  return (
    <div className="app-main" style={{ padding: '1.5rem' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '1.5rem' }}>📍</span>
        <h1>Mis Rutas</h1>
        <button onClick={() => handleLogout()}>Cerrar sesión</button>
      </header>

      <form onSubmit={handleSavePlace} className="add-place-card" style={{ background: '#fff', padding: '1.5rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-secondary)' }}>¿Dónde estás ahora?</h3>
        <input
          className="input-field"
          value={placeName}
          placeholder="Nombre del sitio (ej: Mi café favorito)"
          onChange={(e) => setPlaceName(e.target.value)}
        />
        <button className="btn-primary">
          Registrar este lugar
        </button>
      </form>

      <RuteandoMap />

      <div className="history-section" style={{ marginTop: '2.5rem' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Bitácora de sitios</h2>
        {places.length === 0 ? (
          <p style={{ color: '#999', fontStyle: 'italic' }}>Tu mapa aún está vacío. ¡Sal a explorar!</p>
        ) : (
          <ul style={{ listStyle: 'none' }}>
            {places.map(p => {
              const { _id: id } = p;
              return (
                <li key={id} style={{
                  background: 'white',
                  padding: '1rem',
                  borderRadius: 'var(--radius)',
                  marginBottom: '1rem',
                  borderLeft: '5px solid var(--color-primary)'
                }}>
                  <strong style={{ fontSize: '1.1rem' }}>{p.name}</strong> <br />
                  <small style={{ color: 'var(--color-secondary)' }}>📍 {p.lat} {p.lng}</small> <br />
                  <small style={{ color: '#bbb' }}>
                    Registrado el {new Date(p.date).toLocaleString('es-AR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </small>

                  {/* Botones CRUD */}
                  <div style={{ marginTop: '0.5rem', display: 'flex', gap: '10px' }}>
                    <button
                      className="btn-secondary"
                      onClick={() => {
                        const nuevoNombre = prompt("Nuevo nombre para el lugar:", p.name);
                        if (nuevoNombre) {
                          updateExistingPlace(p._id, { name: nuevoNombre });
                        }
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => {
                        if (window.confirm(`¿Eliminar "${p.name}"?`)) {
                          deleteExistingPlace(p._id);
                        }
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export { RuteandoApp };
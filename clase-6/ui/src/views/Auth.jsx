import { useState } from 'react';

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      return alert("Por favor, completa todos los campos.");
    }
    if (!acceptedPrivacy && isRegister) {
      // Solo exigir aceptación de privacidad en registro
      return alert("Debes aceptar la política de privacidad.");
    }

    try {
      const endpoint = isRegister
        ? "http://localhost:3000/auth/register"
        : "http://localhost:3000/auth/login";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return alert(data.error || "Error en la petición");
      }

      alert(data.message || (isRegister ? "Registro exitoso" : "Login exitoso"));
      // Aquí podrías limpiar el formulario o redirigir al usuario
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="auth-container" style={{ padding: '2.5rem 1.5rem' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', color: 'var(--color-primary)' }}>
        Ruteando
      </h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--color-secondary)' }}>
        {isRegister ? "Crea tu cuenta y empieza a rutear." : "Tu mapa personal de lugares favoritos."}
      </p>

      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="password"
          placeholder="Tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {isRegister && (
          <div className="privacy-container">
            <input
              type="checkbox"
              id="privacy"
              checked={acceptedPrivacy}
              onChange={(e) => setAcceptedPrivacy(e.target.checked)}
            />
            <label htmlFor="privacy">
              Acepto la política de privacidad (Ley de Protección de Datos Personales Argentina).
            </label>
          </div>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={isRegister && !acceptedPrivacy}
        >
          {isRegister ? "Registrarme" : "Iniciar sesión"}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
        {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-primary)',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          {isRegister ? "Inicia sesión" : "Regístrate"}
        </button>
      </p>
    </div>
  );
};

export { Auth };

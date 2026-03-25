# 🚀 MVP inmediato (primera versión)

**Objetivo:** Aplicación web mobile-first con geolocalización puntual y gestión básica de usuarios.

---

## 📦 Stack principal
- **Framework:** React + Vite  
- **Estilos:** CSS nativo (sin librerías externas)  
- **Estado global:** Context API  

---

## 🛠 Servicios en `/services`
- **LocationService:** acceso a Geolocation API del navegador, obtener ubicación puntual.  
- **MapService:** integración con Leaflet.js + OpenStreetMap, mostrar mapa y permitir marcar lugares.  
- **UserService:** registro/login con email y contraseña, manejo de sesión en frontend.  

---

## 📍 Geolocalización
- Uso automático de ubicación actual al abrir la app.  
- Marcado manual de lugares solo si el usuario está físicamente en el sitio.  
- Validación visual: pin en el mapa antes de confirmar.  

---

## 👤 Gestión de usuarios
- Registro/login con email y contraseña.  
- Consentimiento adicional: checkbox obligatorio “Acepto política de privacidad”.  
- Sin verificación de email en esta etapa.  
- Sin recuperación de contraseña (se delegará al backend futuro).  

---

## 📱 Mobile-first
- Bloqueo de acceso desde desktop mediante UI (overlay o aviso).  
- Optimización de interfaz para pantallas pequeñas.  

---

## 🔒 Privacidad
- Política de privacidad adaptada a normativa argentina (Ley de Protección de Datos Personales).  
- Permiso de ubicación solicitado tanto por navegador como por UI.  

---

## 🚀 Despliegue
- Hosting inicial en **Vercel**.  
- Iteraciones rápidas sobre MVP.  

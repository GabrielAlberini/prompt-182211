import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RuteandoApp } from './App.jsx'
import "./styles/index.css"
import { PlacesProvider } from './context/PlacesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlacesProvider>
      <RuteandoApp />
    </PlacesProvider>
  </StrictMode>
)

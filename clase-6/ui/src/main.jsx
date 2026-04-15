import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RuteandoApp } from './App.jsx'
import { PlacesProvider } from './context/PlacesContext.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Auth } from './views/Auth.jsx'
import "./styles/index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlacesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<RuteandoApp />} />
        </Routes>
      </BrowserRouter>
    </PlacesProvider>
  </StrictMode>
)

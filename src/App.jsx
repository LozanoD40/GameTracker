import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './FRONTEND/pages/Home'
import Perfil from './FRONTEND/pages/Perfil'
import Biblioteca from './FRONTEND/pages/Biblioteca'
import Foro from './FRONTEND/pages/foro'
import MisJuegos from './FRONTEND/pages/MisJuegos'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/Foro" element={<Foro />} />
      <Route path="/Biblioteca" element={<Biblioteca />} />
      <Route path="/inventario" element={<MisJuegos />} />
    </Routes>
  )
}
export default App

import './App.css'
import { Routes, Route } from 'react-router-dom'
import Headers from './FRONTEND/componentes/componente_General/header'
import Footer from './FRONTEND/componentes/componente_General/footer'
import Login from './FRONTEND/componentes/componente_General/Login'
import Info from './FRONTEND/componentes/componente_General/Info'
import Home from './FRONTEND/pages/Home'
import Perfil from './FRONTEND/pages/Perfil'
import Biblioteca from './FRONTEND/pages/Biblioteca'
import Foro from './FRONTEND/pages/foro'
import MisJuegos from './FRONTEND/pages/MisJuegos'

function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/foro" element={<Foro />} />
        <Route path="/info/:id" element={<Info/>} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/inventario" element={<MisJuegos />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App
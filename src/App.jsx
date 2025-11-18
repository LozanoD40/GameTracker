import './App.css'
import { Routes, Route } from 'react-router-dom'
import Headers from './FRONTEND/componentes/componente_General/Header'
import Footer from './FRONTEND/componentes/componente_General/Footer'
import Login from './FRONTEND/componentes/componente_General/Login'
import Info from './FRONTEND/componentes/componente_General/Info'
import Confi from './FRONTEND/componentes/componente_Perfil/Confi'
import Noticies from './FRONTEND/componentes/componente_Foro/Noticie'
import VerPerfil from './FRONTEND/componentes/componente_Perfil/VerPerfil'
import Ranking from './FRONTEND/componentes/componente_General/Ranking'
import Home from './FRONTEND/pages/Home'
import Perfil from './FRONTEND/pages/Perfil'
import Biblioteca from './FRONTEND/pages/Biblioteca'
import Foro from './FRONTEND/pages/Foro'

function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil/:id" element={<VerPerfil />} />
        <Route path="/Confi" element={<Confi />} />
        <Route path="/info/:id" element={<Info />} />
        <Route path="/foro" element={<Foro />} />
        <Route path="/Noticies" element={<Noticies />} />
        <Route path="/Ranking" element={<Ranking />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App
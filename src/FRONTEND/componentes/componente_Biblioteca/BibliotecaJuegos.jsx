import './../../styles/biblioteca.css'
import { useEffect, useState } from 'react'
import AllJuegos from './../componente_General/AllJuegos,'

function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/games')
      .then((res) => res.json())
      .then((data) => setJuegos(data))
      .catch((err) => console.error('Error al cargar juegos:', err))
  }, [])

  return (
    <div className="biblioteca">
      <header>
        <h1>Biblioteca de Juegos</h1>
        <p className="descripcion">Explora tu colección y guarda favoritos.</p>
      </header>
      <AllJuegos juegos={juegos} />
    </div>
  )
}

export default BibliotecaJuegos

import './../../styles/info.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function InfoJuego() {
  const { id } = useParams()
  const [juego, setJuego] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3000/api/games/games/${id}`)
      .then((res) => res.json())
      .then((data) => setJuego(data))
      .catch((err) => console.error(err))
  }, [id])

  if (!juego) return <p>Cargando...</p>

  return (
    <div className="info-juego">
      <div
        className="portada-info"
        style={{ backgroundImage: `url(${juego.imagenPortada})` }}
      ></div>
      <h1>{juego.titulo}</h1>
      <p>{juego.descripcion}</p>
      <p>
        <strong>Género:</strong> {juego.genero}
      </p>
      <p>
        <strong>Plataforma:</strong> {juego.plataforma}
      </p>
      <button className="btn-jugar">Jugar</button>
    </div>
  )
}

export default InfoJuego

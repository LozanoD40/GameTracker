import './../../styles/info.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loader from '../componente_General/loading'
import tiempoCarga4 from './../../../assets/tiempoCarga4.gif'

function InfoJuego() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [juego, setJuego] = useState(null)

  useEffect(() => {
    setLoading(true)

    const timeout = setTimeout(() => {
      setLoading(true)
    }, 5000)

    fetch(`http://localhost:3000/api/games/games/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener los datos del juego')
        return res.json()
      })
      .then((data) => {
        setJuego(data)
        setLoading(false)
      })
      .catch((err) => ('Error al cargar juegos:', err))
      .finally(() => clearTimeout(timeout))
  }, [id])

  if (loading) return <Loader imagen={tiempoCarga4} />

  return (
    <div className="info-juego">
      <img src={juego.imagenPortada} alt={juego.titulo} className='portada-info' />
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

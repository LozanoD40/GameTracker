import './../../styles/CardJuego.css'
import { useNavigate } from 'react-router-dom'

function CardJuego({ juego, tipo = 'fondo' }) {

    const navigate = useNavigate()

    const irInfo = () => {
      navigate(`/info/${juego._id}`)
    }
  return (
    <div className="card-juego" onClick={irInfo}>
      {tipo === 'imagen' ? (
        <div className="portada">
          <img
            id="slide-img"
            src={juego.imagenPortada}
            alt={juego.titulo}
          />
        </div>
      ) : (
        <div
          className="portada"
          style={{ backgroundImage: `url(${juego.imagenPortada})` }}
        ></div>
      )}
      <div className="titulo">{juego.titulo}</div>
    </div>
  )
}

export default CardJuego

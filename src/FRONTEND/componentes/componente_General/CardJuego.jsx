import './FRONTEND/styles/CardJuego.css'

function CardJuego({ juego }) {
  return (
    <div className="card-juego">
      <div
        className="portada"
        style={{ backgroundImage: `url(${juego.imagen})` }}
      ></div>
      <div className="titulo">{juego.titulo}</div>
    </div>
  )
}

export default CardJuego
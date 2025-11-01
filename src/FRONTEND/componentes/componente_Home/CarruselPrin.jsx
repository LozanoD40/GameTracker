import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './../../styles/SliderCarruselPrincipal.css'

function SliderCarruselPrincipal() {
  const [juegosRecomendados, setRecomendados] = useState([])
  const [indice, setIndice] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:3000/api/games')
      .then((res) => res.json())
      .then((data) => {
        const aleatorios = [...data].sort(() => Math.random() - 0.5).slice(0, 5)
        setRecomendados(aleatorios)
      })
      .catch((err) => console.error('Error al cargar juegos:', err))
  }, [])

  useEffect(() => {
    if (juegosRecomendados.length === 0) return
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % juegosRecomendados.length)
    }, 5000)
    return () => clearInterval(intervalo)
  }, [juegosRecomendados])

  return (
    <section className="slider-carrusel">
      {juegosRecomendados.map((juego, i) => (
        <div
          key={juego._id}
          className={`slide ${i === indice ? 'activo' : ''}`}
          onClick={() => navigate(`/info/${juego._id}`)} 
          style={{ cursor: 'pointer' }}
        >
          <img
            className="slide-img"
            src={juego.imagenPortada}
            alt={juego.titulo}
          />
          <div className="overlay">
            <h2>{juego.titulo}</h2>
            <button
              className="button"
              onClick={(e) => {
                e.stopPropagation() // Evita que se dispare el onClick del slide
                navigate(`/info/${juego._id}`)
              }}
            >
              Ver más
            </button>
          </div>
        </div>
      ))}
    </section>
  )
}

export default SliderCarruselPrincipal

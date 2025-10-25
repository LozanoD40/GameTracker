import React, { useState, useEffect } from 'react'
import callOfDuty from '../componente_General/Portadas/Call_of_Duty.jpg'
import fortnite from '../componente_General/Portadas/Fortnite.jpg'
import World_of_Warcraft from '../componente_General/Portadas/World_of_Warcraft.png'

//!HACER QUE EL CARRUSEL ME LLEVA A LA PAGINA DEL JUEGO CUANDO LE DOY A VER MAS
const juegosRecomendados = [
  {
    id: 1,
    titulo: 'callOfDuty',
    imagen: callOfDuty,
  },
  {
    id: 2,
    titulo: 'Fortnite',
    imagen: fortnite,
  },
  {
    id: 3,
    titulo: 'World of Warcraft',
    imagen: World_of_Warcraft,
  },
]

function SliderCarruselPrincipal() {
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % juegosRecomendados.length)
    }, 5000)
    return () => clearInterval(intervalo)
  }, [])

  const siguiente = () =>
    setIndice((prev) => (prev + 1) % juegosRecomendados.length)
  const anterior = () =>
    setIndice((prev) => (prev - 1 + juegosRecomendados.length) % juegosRecomendados.length)

  return (
    <section className="slider-carrusel">
      {juegosRecomendados.map((juego, i) => (
        <div
          key={juego.id}
          className={`slide ${i === indice ? 'activo' : ''}`}
        >
          <img className="slide-img" src={juego.imagen} alt={juego.titulo} />
          <div className="overlay">
            <h2>{juego.titulo}</h2>
            <button className="button">Ver más</button>
          </div>
        </div>
      ))}

      <button className="nav-btn izquierda" onClick={anterior}> ❮ </button>
      <button className="nav-btn derecha" onClick={siguiente}> ❯ </button>
    </section>
  )
}

export default SliderCarruselPrincipal
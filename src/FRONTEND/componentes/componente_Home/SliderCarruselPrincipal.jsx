import React, { useState, useEffect } from 'react'

//!HACER QUE EL CARRUSEL ME LLEVA A LA PAGINA DEL JUEGO CUANDO LE DOY A VER MAS
const juegosRecomendados = [
  {
    id: 1,
    titulo: 'Reino de Sombras',
    imagen: 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee',
  },
  {
    id: 2,
    titulo: 'Guerreros del Norte',
    imagen: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980',
  },
  {
    id: 3,
    titulo: 'Dragones Eternos',
    imagen: 'https://images.unsplash.com/photo-1511512578047-dfb367046420',
  },
]

function SliderCarruselPrincipal() {
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % juegosRecomendados.length)
    }, 3000)
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
          style={{ backgroundImage: `url(${juego.imagen})` }}
        >
          <div className="overlay">
            <h2>{juego.titulo}</h2>
            <button className="button">Ver más </button>
          </div>
        </div>
      ))}

      <button className="nav-btn izquierda" onClick={anterior}> ❮ </button>
      <button className="nav-btn derecha" onClick={siguiente}> ❯ </button>
    </section>
  )
}

export default SliderCarruselPrincipal
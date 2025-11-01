import './../../styles/SliderCarruselSecundario.css'
import { useEffect, useState } from 'react'
import SliderCategoria from './Categoria'

function SlidersContainer() {
  const [juegos, setJuegos] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/games')
      .then((res) => res.json())
      .then((data) => setJuegos(data))
      .catch((err) => console.error('Error al cargar juegos:', err))
  }, [])

  //Forma de busqueda de genero
  const juegosAventura = juegos.filter((j) =>
    j.genero.toLowerCase().includes('aventura')
  )
  const juegosAccion = juegos.filter((j) =>
    j.genero.toLowerCase().includes('acción')
  )
  const juegosPC = juegos.filter((j) =>
    j.plataforma.toLowerCase().includes('pc')
  )

  //Forma de busqueda de clasificacion pro edad 
  const juegosTodoPublico = juegos.filter((j) => j.ClasificacionEdad === 'E')
  const juegosT = juegos.filter((j) => j.ClasificacionEdad === 'T')
  return (
    <div className="sliders-container">
      <SliderCategoria titulo="Juegos de Aventura" juegos={juegosAventura} />
      <SliderCategoria titulo="Juegos de Acción" juegos={juegosAccion} />
      <SliderCategoria titulo="Juegos para Todos" juegos={juegosT} />
      <SliderCategoria titulo="Juegos de PC" juegos={juegosPC} />
      <SliderCategoria titulo="Todo Público" juegos={juegosTodoPublico} />
    </div>
  )
}

export default SlidersContainer

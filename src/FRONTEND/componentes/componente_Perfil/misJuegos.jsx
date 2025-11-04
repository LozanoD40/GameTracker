import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import iconMisJuegos from '../../../assets/iconMisJuegos.png'
import iconEliminar from '../../../assets/iconEliminar.png'
import iconCompletados from '../../../assets/iconCompletados.png'
import iconPorCompletar from '../../../assets/iconPorCompletar.png'

function MisJuegos() {
  const [juegos, setJuegos] = useState([])
  const [query, setQuery] = useState('')
  const [estadoJuego, setEstadoJuego] = useState('')
  const [ordenamiento, setOrdenamiento] = useState('titulo_asc')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // 🔹 Obtener juegos del usuario logueado
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      navigate('/perfil')
      return
    }

    fetch(`http://localhost:3000/api/datauser/usuario/${user.id}`)
      .then((res) => {
        if (!res.ok) throw new Error('No se pudieron obtener tus juegos')
        return res.json()
      })
      .then((data) => {
        // Filtramos solo los juegos que el usuario tiene marcados como "misjuegos"
        const misJuegos = data.filter((item) => item.misjuegos === true)
        // Extraemos la info de los juegos relacionados
        const juegosUsuario = misJuegos.map((item) => item.juegoId)
        setJuegos(juegosUsuario)
      })
      .catch((err) => setError(err.message))
  }, [navigate])

  // 🔹 Filtros y ordenamiento
  const filteredAndSorted = useMemo(() => {
    let filteredList = juegos.filter((game) => {
      if (query) {
        const lowerQuery = query.toLowerCase()
        if (!game.titulo.toLowerCase().includes(lowerQuery)) return false
      }

      if (estadoJuego === 'completado' && !game.completado) return false
      if (estadoJuego === 'por_completar' && game.completado) return false

      return true
    })

    filteredList.sort((a, b) => {
      switch (ordenamiento) {
        case 'titulo_asc':
          return a.titulo.localeCompare(b.titulo)
        case 'titulo_desc':
          return b.titulo.localeCompare(a.titulo)
        case 'fecha_reciente':
          return new Date(b.lanzamiento) - new Date(a.lanzamiento)
        case 'fecha_antigua':
          return new Date(a.lanzamiento) - new Date(b.lanzamiento)
        case 'puntuacion_desc':
          return (b.puntuacion || 0) - (a.puntuacion || 0)
        default:
          return 0
      }
    })

    return filteredList
  }, [juegos, query, estadoJuego, ordenamiento])

  const resetFilters = () => {
    setQuery('')
    setEstadoJuego('')
    setOrdenamiento('titulo_asc')
  }

  if (error) return <div className="mis-juegos">Error{error}</div>
  if (juegos.length === 0)
    return <div className="mis-juegos">No tienes juegos aún.</div>

  return (
    <div className="mis-juegos">
      <header className="mis-juegos-header">
        <img src={iconMisJuegos} alt="Mis Juegos" className="icon-titulo" />
        <h2>Mis Juegos</h2>
      </header>

      <div className="busqueda">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar entre mis juegos..."
        />
      </div>

      <details className="filtros">
        <summary>Filtros</summary>
        <div className="contenido-filtros">
          <div className="bloque-filtro">
            <label>Estado:</label>
            <div className="grupo-botones">
              <button
                onClick={() =>
                  setEstadoJuego(
                    estadoJuego === 'completado' ? '' : 'completado'
                  )
                }
                className={estadoJuego === 'completado' ? 'activo' : ''}
              >
                <img
                  src={iconCompletados}
                  alt="Completados"
                  className="icon_filtro"
                />
                Completados
              </button>

              <button
                onClick={() =>
                  setEstadoJuego(
                    estadoJuego === 'por_completar' ? '' : 'por_completar'
                  )
                }
                className={estadoJuego === 'por_completar' ? 'activo' : ''}
              >
                <img
                  src={iconPorCompletar}
                  alt="Por completar"
                  className="icon_filtro"
                />
                Por Completar
              </button>
            </div>
          </div>

          <div className="bloque-filtro">
            <label htmlFor="sort-select">Ordenar por:</label>
            <select
              id="sort-select"
              value={ordenamiento}
              onChange={(e) => setOrdenamiento(e.target.value)}
            >
              <option value="titulo_asc">Título (A-Z)</option>
              <option value="titulo_desc">Título (Z-A)</option>
              <option value="fecha_reciente">Más reciente</option>
              <option value="fecha_antigua">Más antiguo</option>
              <option value="puntuacion_desc">Puntuación (Alta a baja)</option>
            </select>
          </div>

          <div className="acciones-filtros">
            <button onClick={resetFilters}>
              <img src={iconEliminar} alt="Limpiar" className="icon_filtro" />
              Limpiar filtros
            </button>
          </div>
        </div>
      </details>

      <section className="coleccion">
        <p>
          Mostrando {filteredAndSorted.length} de {juegos.length} juegos
        </p>

        <div className="grid-juegos">
          {filteredAndSorted.map((game) => (
            <article key={game._id} className="juego">
              <div className="juego-imagen">
                <img src={game.imagenPortada} alt={game.titulo} />
              </div>
              <div className="juego-info">
                <h3>{game.titulo}</h3>
                <button onClick={() => navigate(`/info/${game._id}`)}>
                  Ver Info
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MisJuegos

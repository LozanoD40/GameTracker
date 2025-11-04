import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import CardJuego from '../componente_General/CardJuego'

function AllJuegos({ juegos = [], setJuegos }) {
  const [query, setQuery] = useState('')
  const [includeGenres, setIncludeGenres] = useState([])
  const [excludeGenres, setExcludeGenres] = useState([])
  const [plataforma, setPlataforma] = useState('')
  const [estadoJuego, setEstadoJuego] = useState('')
  const [misJuegosFilter, setMisJuegosFilter] = useState(false)
  const [wishlistFilter, setWishlistFilter] = useState(false)
  const [ordenamiento, setOrdenamiento] = useState('titulo_asc')
  //const [excluidos, setExcluidos] = useState([])
  const navigate = useNavigate()

  // Listas fijas
  const generosDisponibles = [
    'Aventura',
    'Acción',
    'Deportes',
    'Estrategia',
    'Rol',
    'Simulación',
    'Puzzle',
    'Carreras',
    'Terror',
  ]

  const plataformasDisponibles = [
    'PC',
    'Consola',
    'Móvil',
    'Android',
    'iOS',
    'PlayStation',
    'Xbox',
    'Nintendo',
  ]

  // Lógica de filtrado + ordenamiento
  const filteredAndSorted = useMemo(() => {
    let filteredList = juegos.filter((game) => {
      //if (excluidos.includes(game._id)) return false

      const lowerQuery = query.toLowerCase()
      if (query && !game.titulo.toLowerCase().includes(lowerQuery)) return false

      // Géneros incluidos
      if (includeGenres.length > 0) {
        const genero = game.genero?.toLowerCase() || ''
        if (!includeGenres.some((g) => genero.includes(g.toLowerCase())))
          return false
      }

      // Géneros excluidos
      if (excludeGenres.length > 0) {
        const genero = game.genero?.toLowerCase() || ''
        if (excludeGenres.some((g) => genero.includes(g.toLowerCase())))
          return false
      }

      // Plataforma
      if (plataforma) {
        const plat = game.plataforma?.toLowerCase() || ''
        if (!plat.includes(plataforma.toLowerCase())) return false
      }

      // Estado
      if (estadoJuego === 'completado' && !game.completado) return false
      if (estadoJuego === 'por_completar' && game.completado) return false

      // Mis juegos / Wishlist
      if (misJuegosFilter && !game.misjuegos) return false
      if (wishlistFilter && !game.wishlist) return false

      return true
    })

    // Ordenamiento
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
  }, [
    juegos,
    query,
    includeGenres,
    excludeGenres,
    plataforma,
    estadoJuego,
    misJuegosFilter,
    wishlistFilter,
    ordenamiento,
//    excluidos,
  ])

  const toggleIncludeGenre = (genre) => {
    setIncludeGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    )
  }

  const toggleExcludeGenre = (genre) => {
    setExcludeGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    )
  }

  return (
    <section className="alljuegos">
      {/* Barra de búsqueda */}
      <div className="busqueda">
        <input
          type="text"
          placeholder="Buscar juego..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Filtros */}
      <details className="filtros">
        <summary>Filtros</summary>

        <div className="filtro-grupo">
          <h3>Géneros</h3>
          <div className="opciones">
            {generosDisponibles.map((g) => (
              <button
                key={g}
                className={`filtro-boton ${
                  includeGenres.includes(g)
                    ? 'incluido'
                    : excludeGenres.includes(g)
                    ? 'excluido'
                    : ''
                }`}
                onClick={() =>
                  includeGenres.includes(g)
                    ? toggleIncludeGenre(g)
                    : excludeGenres.includes(g)
                    ? toggleExcludeGenre(g)
                    : toggleIncludeGenre(g)
                }
                onContextMenu={(e) => {
                  e.preventDefault()
                  toggleExcludeGenre(g)
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="filtro-grupo">
          <h3>Plataforma</h3>
          <select
            value={plataforma}
            onChange={(e) => setPlataforma(e.target.value)}
          >
            <option value="">Todas</option>
            {plataformasDisponibles.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="filtro-grupo">
          <h3>Estado</h3>
          <select
            value={estadoJuego}
            onChange={(e) => setEstadoJuego(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="completado">Completado</option>
            <option value="por_completar">Por completar</option>
          </select>
        </div>

        <div className="filtro-grupo">
          <label>
            <input
              type="checkbox"
              checked={misJuegosFilter}
              onChange={(e) => setMisJuegosFilter(e.target.checked)}
              id="filtro-checkbox"
            />
            Mis juegos
          </label>

          <label>
            <input
              type="checkbox"
              checked={wishlistFilter}
              onChange={(e) => setWishlistFilter(e.target.checked)}
              id="filtro-checkbox"
            />
            Wishlist
          </label>
        </div>

        <div className="filtro-grupo">
          <h3>Ordenar por</h3>
          <select
            value={ordenamiento}
            onChange={(e) => setOrdenamiento(e.target.value)}
          >
            <option value="titulo_asc">Título (A-Z)</option>
            <option value="titulo_desc">Título (Z-A)</option>
            <option value="fecha_reciente">Más recientes</option>
            <option value="fecha_antigua">Más antiguos</option>
            <option value="puntuacion_desc">Mayor puntuación</option>
          </select>
        </div>
      </details>

      {/* Contador */}
      <p className="contador-juegos">
        Mostrando <strong>{filteredAndSorted.length}</strong> de{' '}
        <strong>{juegos.length}</strong> juegos
      </p>

      {/* Contenedor de tarjetas */}
      <div className="contenedor-juegos">
        {filteredAndSorted.length > 0 ? (
          filteredAndSorted.map((juego) => (
            <div key={juego._id} className="juego-carta">
              <CardJuego
                juego={juego}
                setJuegos={setJuegos}
                onClick={() => navigate(`/info/${juego._id}`)}
                tipo="imagen"
              />
            </div>
          ))
        ) : (
          <p className="sin-resultados">No se encontraron juegos</p>
        )}
      </div>
    </section>
  )
}

export default AllJuegos

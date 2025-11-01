import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

function AllJuegos({ juegos }) {
  const [query, setQuery] = useState('')
  const [includeGenres, setIncludeGenres] = useState([])
  const [excludeGenres, setExcludeGenres] = useState([])
  
  const [wishlist, setWishlist] = useState(() => {
    try {
      const raw = localStorage.getItem('gameWishlist:v1')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  const navigate = useNavigate()

  // Guardar wishlist en localStorage
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }
  const inWishlist = (id) => wishlist.includes(id)

  // Todos los géneros disponibles
  const allGenres = useMemo(() => {
    const s = new Set()
    juegos.forEach((g) => s.add(g.genero))
    return Array.from(s).sort()
  }, [juegos])

  // Juegos filtrados
  const filtered = useMemo(() => {
    return juegos.filter((game) => {
      // Separar géneros por " / "
      const gameGenres = game.genero.split(' / ').map((g) => g.trim())

      // Filtrar por query
      if (query && !game.titulo.toLowerCase().includes(query.toLowerCase()))
        return false

      // Filtrar por inclusión de géneros
      if (
        includeGenres.length > 0 &&
        !includeGenres.some((g) =>
          g === 'WISHLIST' ? inWishlist(game._id) : gameGenres.includes(g)
        )
      )
        return false

      // Filtrar por exclusión de géneros
      if (
        excludeGenres.length > 0 &&
        excludeGenres.some((g) => gameGenres.includes(g))
      )
        return false

      return true
    })
  }, [juegos, query, includeGenres, excludeGenres, wishlist])


  const resetFilters = () => {
    setQuery('')
    setIncludeGenres([])
    setExcludeGenres([])
  }

  return (
    <div className="all-juegos">
      <div className="busqueda">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca por título..."
        />
        <button onClick={() => {}}>Buscar</button>
      </div>

      <details className="filtros">
        <summary>Filtros</summary>
        <div className="contenido-filtros">
          {/* Filtrar por género */}
          <div className="bloque-filtro">
            <label>Filtrar por género:</label>
            <div className="grupo-botones">
              {allGenres.map((g) => (
                <button
                  key={`inc-${g}`}
                  onClick={() =>
                    setIncludeGenres((prev) =>
                      prev.includes(g)
                        ? prev.filter((x) => x !== g)
                        : [...prev, g]
                    )
                  }
                  className={includeGenres.includes(g) ? 'activo' : ''}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Excluir géneros */}
          <div className="bloque-filtro">
            <label>Excluir géneros:</label>
            <div className="grupo-botones">
              {allGenres.map((g) => (
                <button
                  key={`exc-${g}`}
                  onClick={() =>
                    setExcludeGenres((prev) =>
                      prev.includes(g)
                        ? prev.filter((x) => x !== g)
                        : [...prev, g]
                    )
                  }
                  className={excludeGenres.includes(g) ? 'excluir' : ''}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Mostrar solo wishlist + Reset */}
          <div
            className="acciones-filtros"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '10px',
            }}
          >
            <button onClick={resetFilters}>Reset</button>
            <button onClick={() => setIncludeGenres(['WISHLIST'])}>
              Mostrar Wishlist
            </button>
          </div>
        </div>
      </details>

      <section className="coleccion">
        <h2>Colección</h2>
        <p>
          Mostrando {filtered.length} de {juegos.length} juegos
        </p>

        <div className="grid-juegos">
          {filtered.map((game) => (
            <article key={game._id} className="juego">
              <div className="juego-imagen">
                <img src={game.imagenPortada} alt={game.titulo} />
                <button
                  className={`wishlist-btn ${
                    inWishlist(game._id) ? 'activo' : ''
                  }`}
                  onClick={() => toggleWishlist(game._id)}
                >
                  {inWishlist(game._id) ? '❤️' : '🖤'}
                </button>
              </div>

              <div className="juego-info">
                <h3>{game.titulo}</h3>
                <div className="acciones-juego">
                  <button onClick={() => navigate(`/info/${game._id}`)}>
                    Ver
                  </button>
                </div>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="sin-resultados">
              No se encontraron juegos con esos filtros.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default AllJuegos

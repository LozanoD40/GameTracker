import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

function AllJuegos({ juegos, setJuegos }) {
  const [query, setQuery] = useState('')
  const [includeGenres, setIncludeGenres] = useState([])
  const [excludeGenres, setExcludeGenres] = useState([])

  const navigate = useNavigate()

  // Toggle mis juegos (wishlist) en backend
  const toggleWishlist = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      alert('Debes iniciar sesión para guardar juegos')
      return
    }

    try {
      const juego = juegos.find((j) => j._id === id)
      if (!juego) return

      const res = await fetch(`http://localhost:3000/api/games/games/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ misjuegos: !juego.misjuegos }),
      })

      if (!res.ok) throw new Error('Error al actualizar el juego')

      const updatedGame = await res.json()

      // Actualizamos el estado local de juegos
      setJuegos((prev) =>
        prev.map((j) =>
          j._id === id ? { ...j, misjuegos: updatedGame.misjuegos } : j
        )
      )
    } catch (err) {
      console.error(err)
    }
  }

  // Saber si un juego está en mis juegos
  const inWishlist = (id) => {
    const juego = juegos.find((j) => j._id === id)
    return juego?.misjuegos || false
  }

  // Todos los géneros disponibles
  const allGenres = useMemo(() => {
    const s = new Set()
    juegos.forEach((g) => s.add(g.genero))
    return Array.from(s).sort()
  }, [juegos])

  // Juegos filtrados
  const filtered = useMemo(() => {
    return juegos.filter((game) => {
      const gameGenres = game.genero.split(' / ').map((g) => g.trim())

      if (query && !game.titulo.toLowerCase().includes(query.toLowerCase()))
        return false

      if (
        includeGenres.length > 0 &&
        !includeGenres.some((g) =>
          g === 'WISHLIST' ? game.misjuegos : gameGenres.includes(g)
        )
      )
        return false

      if (
        excludeGenres.length > 0 &&
        excludeGenres.some((g) => gameGenres.includes(g))
      )
        return false

      return true
    })
  }, [juegos, query, includeGenres, excludeGenres])

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

          {/* Mostrar solo mis juegos + Reset */}
          <div className="acciones-filtros">
            <button onClick={resetFilters}>Reset</button>
            <button onClick={() => setIncludeGenres(['WISHLIST'])}>
              Mis juegos
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

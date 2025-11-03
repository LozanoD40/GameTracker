import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import iconPorCompletar from '../../../assets/iconPorCompletar.png'
import iconCompletados from '../../../assets/iconCompletados.png'
import iconWishlist from '../../../assets/iconWishlist.png'
import iconMisJuegos from '../../../assets/iconMisJuegos.png'
import iconEliminar from '../../../assets/iconEliminar.png'
import iconNoWishlist from '../../../assets/iconNoWishlist.png'
import iconIngresar from '../../../assets/iconIngresar.png'

function AllJuegos({ juegos, setJuegos }) {
  const [query, setQuery] = useState('')
  const [includeGenres, setIncludeGenres] = useState([])
  const [excludeGenres, setExcludeGenres] = useState([])
  const [plataforma, setPlataforma] = useState('')
  const [estadoJuego, setEstadoJuego] = useState('')
  const [misJuegosFilter, setMisJuegosFilter] = useState(false)
  const [wishlistFilter, setWishlistFilter] = useState(false)
  const [ordenamiento, setOrdenamiento] = useState('titulo_asc')

  const navigate = useNavigate()

  const toggleWishlist = async (id) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) return navigate('/perfil')

    const juego = juegos.find((j) => j._id === id)
    if (!juego) return

    try {
      // 1️⃣ Aseguramos que existe la relación usuario-juego
      await fetch(`http://localhost:3000/api/datauser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuarioId: user.id,
          juegoId: id,
        }),
      })

      // 2️⃣ Alternamos el estado del wishlist
      const res = await fetch(
        `http://localhost:3000/api/datauser/usuario/${user.id}/juego/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ wishlist: !juego.wishlist }),
        }
      )

      if (!res.ok) throw new Error('Error al actualizar wishlist')

      const updated = await res.json()

      // 3️⃣ Actualizamos el estado local
      setJuegos((prev) =>
        prev.map((j) =>
          j._id === id ? { ...j, wishlist: updated.wishlist } : j
        )
      )
    } catch (err) {
      console.error('Error al actualizar wishlist:', err)
    }
  }

  const inWishlist = (id) => {
    const juego = juegos.find((j) => j._id === id)
    return juego?.wishlist || false
  }

  const allGenres = useMemo(() => {
    const s = new Set()
    juegos.forEach((g) => {
      if (g.genero) g.genero.split(' / ').forEach((gen) => s.add(gen.trim()))
    })
    return Array.from(s).filter(Boolean).sort()
  }, [juegos])

  const allPlatforms = useMemo(() => {
    const s = new Set()
    juegos.forEach((g) => {
      if (g.plataforma && typeof g.plataforma === 'string') {
        g.plataforma.split(' / ').forEach((p) => s.add(p.trim()))
      }
    })
    return Array.from(s).filter(Boolean).sort()
  }, [juegos])

  const filteredAndSorted = useMemo(() => {
    let filteredList = juegos.filter((game) => {
      if (query) {
        const lowerQuery = query.toLowerCase()
        const titleMatch = game.titulo.toLowerCase().includes(lowerQuery)
        const devMatch = game.desarrollador
          ? game.desarrollador.toLowerCase().includes(lowerQuery)
          : false
        if (!titleMatch && !devMatch) return false
      }

      const gameGenres = game.genero
        ? game.genero.split(' / ').map((g) => g.trim())
        : []
      if (
        includeGenres.length > 0 &&
        !includeGenres.some((g) => gameGenres.includes(g))
      )
        return false
      if (
        excludeGenres.length > 0 &&
        excludeGenres.some((g) => gameGenres.includes(g))
      )
        return false

      if (plataforma) {
        const gamePlatforms = game.plataforma
          ? game.plataforma.split(' / ').map((p) => p.trim())
          : []
        if (!gamePlatforms.includes(plataforma)) return false
      }

      if (estadoJuego === 'completado' && !game.completado) return false
      if (estadoJuego === 'por_completar' && game.completado) return false
      if (misJuegosFilter && !game.misjuegos) return false
      if (wishlistFilter && !game.wishlist) return false

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
  ])

  const resetFilters = () => {
    setQuery('')
    setIncludeGenres([])
    setExcludeGenres([])
    setPlataforma('')
    setEstadoJuego('')
    setMisJuegosFilter(false)
    setWishlistFilter(false)
    setOrdenamiento('titulo_asc')
  }

  return (
    <div className="all-juegos">
      <div className="busqueda">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Realiza tu busqueda..."
        />
      </div>

      <details className="filtros">
        <summary>Filtros</summary>
        <div className="contenido-filtros">
          <div className="bloque-filtro">
            <label>Estado de Juego:</label>
            <div className="grupo-botones">
              <button
                onClick={() => setMisJuegosFilter((prev) => !prev)}
                className={misJuegosFilter ? 'activo' : ''}
              >
                <img
                  src={iconMisJuegos}
                  alt="iconMisJuegos"
                  className="icon_filtro"
                />
                Mis Juegos
              </button>
              <button
                onClick={() => setWishlistFilter((prev) => !prev)}
                className={wishlistFilter ? 'activo' : ''}
              >
                <img
                  src={iconWishlist}
                  alt="iconWishlist"
                  className="icon_filtro"
                />
                Wishlist
              </button>
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
                  alt="iconCompletados"
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
                  alt="iconPorCompletar"
                  className="icon_filtro"
                />
                Por Completar
              </button>
            </div>
          </div>

          <div className="bloque-filtro">
            <label>Incluir género:</label>
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

          <div className="bloque-filtro">
            <label>Excluir género:</label>
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

          <div className="bloque-filtro">
            <label htmlFor="platform-select">Filtrar por plataforma:</label>
            <select
              id="platform-select"
              value={plataforma}
              onChange={(e) => setPlataforma(e.target.value)}
            >
              <option value="">Todas las plataformas</option>
              {allPlatforms.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
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
              <option value="fecha_reciente">
                Fecha de lanzamiento (Más reciente)
              </option>
              <option value="fecha_antigua">
                Fecha de lanzamiento (Más antigua)
              </option>
              <option value="puntuacion_desc">
                Puntuación (Mayor a menor)
              </option>
            </select>
          </div>

          <div className="acciones-filtros">
            <button onClick={resetFilters}>
              <img src={iconEliminar} alt="iconEliminar" className='icon_filtro'/>
              Limpiar Filtros
            </button>
          </div>
        </div>
      </details>

      <section className="coleccion">
        <h2>Colección</h2>
        <p>
          Mostrando {filteredAndSorted.length} de {juegos.length} juegos
        </p>

        <div className="grid-juegos">
          {filteredAndSorted.map((game) => (
            <article key={game._id} className="juego">
              <div className="juego-imagen">
                <img src={game.imagenPortada} alt={game.titulo} />
                <button
                  className={`wishlist-btn ${
                    inWishlist(game._id) ? 'activo' : ''
                  }`}
                  onClick={() => toggleWishlist(game._id)}
                >
                  <img
                    src={inWishlist(game._id) ? iconIngresar : iconNoWishlist}
                    alt={
                      inWishlist(game._id)
                        ? 'En lista de deseos'
                        : 'Añadir a lista de deseos'
                    }
                    className="wishlist-icon"
                  />
                </button>
              </div>

              <div className="juego-info">
                <h3>{game.titulo}</h3>
                <div className="acciones-juego">
                  <button onClick={() => navigate(`/info/${game._id}`)}>
                    Ver Info
                  </button>
                </div>
              </div>
            </article>
          ))}

          {filteredAndSorted.length === 0 && (
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

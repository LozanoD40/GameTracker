import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CardJuego from '../componente_General/CardJuego'
import Login from '../componente_General/Login'
import iconNoWishlist from '../../../assets/iconNoWishlist.png'
import iconWishlist from '../../../assets/iconWishlist.png'
import iconMisJuegos from '../../../assets/iconMisJuegos.png'
import iconEliminar from '../../../assets/iconEliminar.png'

function AllJuegos({ juegos = [], setJuegos }) {
  const [query, setQuery] = useState('')
  const [includeGenres, setIncludeGenres] = useState([])
  const [excludeGenres, setExcludeGenres] = useState([])
  const [plataforma, setPlataforma] = useState('')
  const [estadoJuego, setEstadoJuego] = useState('')
  const [misJuegosFilter, setMisJuegosFilter] = useState(false)
  const [wishlistFilter, setWishlistFilter] = useState(false)
  const [ordenamiento, setOrdenamiento] = useState('titulo_asc')
  const [usuarioId, setUsuarioId] = useState(null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const navigate = useNavigate()

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

  // 🔹 Cargar el usuario logueado (si existe)
  useEffect(() => {
    try {
      const userData = localStorage.getItem('user')
      if (!userData) return

      const parsedUser = JSON.parse(userData)
      if (parsedUser && parsedUser._id) {
        setUsuarioId(parsedUser._id)
        setIsLoginOpen(false)
      } else {
        console.warn('Usuario inválido en localStorage')
        setUsuarioId(null)
      }
    } catch (error) {
      console.error('Error al leer usuario del localStorage:', error)
      setUsuarioId(null)
    }
  }, [])

  // ✅ Actualizar estado del juego (wishlist o misjuegos)
  const actualizarEstado = async (juegoId, campo, valor) => {
    // Si no hay usuario logueado, abrir login
    if (!usuarioId) {
      setIsLoginOpen(true)
      return
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/dataUser/usuario/${usuarioId}/juego/${juegoId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ [campo]: valor }),
        }
      )

      if (!response.ok) throw new Error('Error al actualizar el estado')

      const updated = await response.json()
      const juegoIdReal = updated.juegoId?._id || updated.juegoId || juegoId

      setJuegos((prev) =>
        prev.map((j) =>
          j._id === juegoIdReal ? { ...j, [campo]: updated[campo] } : j
        )
      )
    } catch (err) {
      console.error('Error actualizando juego:', err)
    }
  }

  // 🔹 Filtrado y ordenamiento
  const filteredAndSorted = useMemo(() => {
    let filteredList = juegos.filter((game) => {
      const lowerQuery = query.toLowerCase()
      const genero = game.genero?.toLowerCase() || ''
      const plat = game.plataforma?.toLowerCase() || ''

      if (query && !game.titulo?.toLowerCase().includes(lowerQuery))
        return false

      if (
        includeGenres.length > 0 &&
        !includeGenres.some((g) => genero.includes(g.toLowerCase()))
      )
        return false

      if (excludeGenres.some((g) => genero.includes(g.toLowerCase())))
        return false

      if (plataforma && !plat.includes(plataforma.toLowerCase())) return false

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

  // 🔹 Alternar género incluido/excluido
  const toggleGenre = (genre) => {
    if (includeGenres.includes(genre)) {
      setIncludeGenres((prev) => prev.filter((g) => g !== genre))
      setExcludeGenres((prev) => [...prev, genre])
    } else if (excludeGenres.includes(genre)) {
      setExcludeGenres((prev) => prev.filter((g) => g !== genre))
    } else {
      setIncludeGenres((prev) => [...prev, genre])
    }
  }

  return (
    <section className="alljuegos">
      <div className="busqueda">
        <input
          type="text"
          placeholder="Buscar juego..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

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
                onClick={() => toggleGenre(g)}
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

      <p className="contador-juegos">
        Mostrando <strong>{filteredAndSorted.length}</strong> de{' '}
        <strong>{juegos.length}</strong> juegos
      </p>

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
              <div className="btn-juego">
                <button
                  className={`mygame-boton ${juego.misjuegos ? 'activo' : ''}`}
                  onClick={() =>
                    actualizarEstado(juego._id, 'misjuegos', !juego.misjuegos)
                  }
                >
                  <img
                    src={juego.misjuegos ? iconMisJuegos : iconEliminar}
                    alt={
                      juego.misjuegos ? 'En mis juegos' : 'Agregar a mis juegos'
                    }
                    className="iconGames"
                  />
                </button>
                <button
                  className={`mywishlist-boton ${
                    juego.wishlist ? 'activo' : ''
                  }`}
                  onClick={() =>
                    actualizarEstado(juego._id, 'wishlist', !juego.wishlist)
                  }
                >
                  <img
                    src={juego.wishlist ? iconWishlist : iconNoWishlist}
                    alt={juego.wishlist ? 'En wishlist' : 'Agregar a wishlist'}
                    className="iconGames"
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="sin-resultados">No se encontraron juegos</p>
        )}
      </div>

      {/* Mostrar modal login si no hay sesión */}
      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
    </section>
  )
}

export default AllJuegos

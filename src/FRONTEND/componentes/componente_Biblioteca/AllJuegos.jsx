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
  const [user, setUser] = useState(null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const navigate = useNavigate()

  // 🔹 Listas de géneros y plataformas
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

  // 🔹 Filtrado y ordenamiento
  const filteredAndSorted = useMemo(() => {
    const q = (query || '').trim().toLowerCase()
    const includeNorm = includeGenres.map((g) => g.toLowerCase())
    const excludeNorm = excludeGenres.map((g) => g.toLowerCase())
    const plataformaNorm = (plataforma || '').toLowerCase()

    let filteredList = juegos.filter((game) => {
      const titulo = (game.titulo || '').toLowerCase()
      const genero = (game.genero || '').toLowerCase()
      const plat = (game.plataforma || '').toLowerCase()

      if (q && !titulo.includes(q)) return false

      // Si hay géneros incluidos, el juego debe coincidir con al menos uno
      if (
        includeNorm.length > 0 &&
        !includeNorm.some((g) => genero.includes(g))
      )
        return false

      // Si hay géneros excluidos, el juego no debe contener ninguno
      if (excludeNorm.length > 0 && excludeNorm.some((g) => genero.includes(g)))
        return false

      if (plataformaNorm && !plat.includes(plataformaNorm)) return false

      if (estadoJuego === 'completado' && !game.completado) return false
      if (estadoJuego === 'por_completar' && game.completado) return false

      if (misJuegosFilter && !game.misjuegos) return false
      if (wishlistFilter && !game.wishlist) return false

      return true
    })

    // Ordenamiento
    filteredList.sort((a, b) => {
      switch (ordenamiento) {
        case 'titulo_asc':
          return (a.titulo || '').localeCompare(b.titulo || '')
        case 'titulo_desc':
          return (b.titulo || '').localeCompare(a.titulo || '')
        case 'fecha_reciente':
          return new Date(b.lanzamiento || 0) - new Date(a.lanzamiento || 0)
        case 'fecha_antigua':
          return new Date(a.lanzamiento || 0) - new Date(b.lanzamiento || 0)
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

  // 🔹 Verifica si el usuario está logueado
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      setIsLoginOpen(true)
      return
    }
    setUser(JSON.parse(userData))
  }, [navigate])

  // 🔹 Muestra login si no hay usuario
  if (!user)
    return (
      <Login
        isOpen={isLoginOpen}
        onClose={() => {
          setIsLoginOpen(false)
          const userData = localStorage.getItem('user')
          if (userData) setUser(JSON.parse(userData))
        }}
      />
    )

  // 🔹 FUNCIÓN PRINCIPAL: Actualizar estado (misjuegos o wishlist)
  const actualizarEstado = async (juegoId, campo, valor) => {
    try {
      if (!user?._id) {
        console.error('Usuario no logueado')
        setIsLoginOpen(true)
        return
      }

      const res = await fetch(
        `http://localhost:3000/api/dataUser/usuario/${user._id}/juego/${juegoId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ [campo]: valor }),
        }
      )

      if (!res.ok) {
        const err = await res.json()
        console.error('Error al actualizar:', err)
        return
      }

      const updated = await res.json()

      // 🔹 Actualiza visualmente el estado del juego modificado
      setJuegos((prev) =>
        prev.map((j) =>
          j._id === juegoId ? { ...j, [campo]: updated[campo] } : j
        )
      )
    } catch (error) {
      console.error('Error al conectar con el backend:', error)
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
            />
            Mis juegos
          </label>
          <label>
            <input
              type="checkbox"
              checked={wishlistFilter}
              onChange={(e) => setWishlistFilter(e.target.checked)}
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
                {/* 🔹 Botón Mis Juegos */}
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

                {/* 🔹 Botón Wishlist */}
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
    </section>
  )
}

export default AllJuegos

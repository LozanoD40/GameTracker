import './../../styles/Info.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loader from '../componente_General/Loading'
import tiempoCarga4 from './../../../assets/loadingGif/tiempoCarga4.gif'
import FormularioReseñas from '../componente_Foro/FormularioReseña'
import iconNoWishlist from '../../../assets/Icons/iconNoWishlist.png'
import iconWishlist from '../../../assets/Icons/iconWishlist.png'
import iconMisJuegos from '../../../assets/Icons/iconMisJuegos.png'
import iconEliminar from '../../../assets/Icons/iconEliminar.png'
import iconCompletados from '../../../assets/Icons/iconCompletados.png'
import iconPorCompletar from '../../../assets/Icons/iconPorCompletar.png'

function InfoJuego({ setJuegos }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [juego, setJuego] = useState(null)
  const [user, setUser] = useState(null)

  // Obtener usuario desde localStorage (misma lógica que AllJuegos)
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        const parsed = JSON.parse(userData)
        setUser(parsed)
      } catch (err) {
        console.error('Error parseando usuario:', err)
      }
    }
  }, [])

  // Cargar datos del juego desde el backend (respetando tu ruta actual)
  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(true), 5000)

    fetch(`http://localhost:3000/api/games/games/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener los datos del juego')
        return res.json()
      })
      .then((data) => {
        setJuego(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error al cargar juego:', err)
        setLoading(false)
      })
      .finally(() => clearTimeout(timeout))
  }, [id])

  // --- Aquí está la función EXACTA (mismo comportamiento que en AllJuegos.jsx) ---
  const actualizarEstado = async (juegoId, campo, valor) => {
    try {
      // Obtener userId desde estado o localStorage
      let userId = user?._id || user?.id

      if (!userId) {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          const parsed = JSON.parse(storedUser)
          userId = parsed._id || parsed.id
        }
      }

      if (!userId) {
        console.error('Usuario no logueado')
        navigate('/perfil')
        return
      }

      // Ejecutar la petición al backend (misma URL que tu router)
      const res = await fetch(
        `http://localhost:3000/api/dataUser/usuario/${userId}/juego/${juegoId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ [campo]: valor }),
        }
      )

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        console.error('Error al actualizar:', err)
        return
      }

      // Actualizar estado local del juego
      setJuego((prev) => (prev ? { ...prev, [campo]: valor } : prev))

      // Si el padre pasó setJuegos (como en AllJuegos), también actualizamos la lista
      if (typeof setJuegos === 'function') {
        setJuegos((prev) =>
          Array.isArray(prev)
            ? prev.map((j) =>
                j._id === juegoId ? { ...j, [campo]: valor } : j
              )
            : prev
        )
      }
    } catch (error) {
      console.error('Error al conectar con el backend:', error)
    }
  }
  // -------------------------------------------------------------------------

  if (loading) return <Loader imagen={tiempoCarga4} />
  if (!juego) return <p>No se encontró el juego.</p>

  return (
    <div className="info-juego">
      {/* Imagen y detalles del juego */}
      <img
        src={juego.imagenPortada}
        alt={juego.titulo}
        className="portada-info"
      />
      <h1>{juego.titulo}</h1>
      <p>{juego.descripcion}</p>
      <p>
        <strong>Género:</strong> {juego.genero}
      </p>
      <p>
        <strong>Plataforma:</strong> {juego.plataforma}
      </p>

      {/* Botones reutilizando la misma lógica */}
      <div className="acciones-juego">
        <button className="btn-jugar">Jugar</button>

        {/* Mis Juegos */}
        <button
          className={`mygame-boton ${juego.misjuegos ? 'activo' : ''}`}
          onClick={() =>
            actualizarEstado(juego._id, 'misjuegos', !juego.misjuegos)
          }
        >
          <img
            src={juego.misjuegos ? iconMisJuegos : iconEliminar}
            alt={juego.misjuegos ? 'En mis juegos' : 'Agregar a mis juegos'}
            className="iconGames"
          />
        </button>

        {/* Wishlist */}
        <button
          className={`mywishlist-boton ${juego.wishlist ? 'activo' : ''}`}
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

        {/* Completado */}
        <button
          className={`completado-boton ${juego.completado ? 'activo' : ''}`}
          onClick={() =>
            actualizarEstado(juego._id, 'completado', !juego.completado)
          }
        >
          <img
            src={juego.completado ? iconCompletados : iconPorCompletar}
            alt={
              juego.completado
                ? 'Juego completado'
                : 'Marcar como por completar'
            }
            className="iconGames"
          />
        </button>
      </div>

      {/* Reseñas */}
      <FormularioReseñas gameTitle={juego.titulo} />
    </div>
  )
}

export default InfoJuego

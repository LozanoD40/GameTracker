import './../../styles/Info.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import FormularioResenias from '../componente_Foro/FormularioResenia'
import Loader from '../componente_General/Loading'
import tiempoCarga4 from './../../../assets/loadingGif/tiempoCarga4.gif'
import iconReview from '../../../assets/Icons/iconReview.png'
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
  const [reseñas, setReseñas] = useState([])

  // Obtener usuario desde localStorage
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

  // Cargar datos del juego y reseñas
  useEffect(() => {
    if (!user) return

    setLoading(true)
    let cancelled = false
    const userId = user._id || user.id

    const fetchData = async () => {
      try {
        // 1. Datos del juego
        const resJuego = await fetch(
          `http://localhost:3000/api/games/games/${id}`
        )
        if (!resJuego.ok)
          throw new Error('Error al obtener los datos del juego')
        let dataJuego = await resJuego.json()

        // 2. Relación usuario-juego
        const resUserRelacion = await fetch(
          `http://localhost:3000/api/dataUser/usuario/${userId}`
        )
        if (!resUserRelacion.ok)
          throw new Error('Error al obtener relación del usuario')
        const dataUser = await resUserRelacion.json()

        if (cancelled) return

        const relacion = Array.isArray(dataUser)
          ? dataUser.find((d) => {
              const idJuego =
                typeof d.juegoId === 'object' ? d.juegoId._id : d.juegoId
              return idJuego === dataJuego._id
            })
          : null

        if (relacion) {
          dataJuego = {
            ...dataJuego,
            misjuegos: relacion.misjuegos,
            wishlist: relacion.wishlist,
            completado: relacion.completado,
          }
        } else {
          dataJuego = {
            ...dataJuego,
            misjuegos: false,
            wishlist: false,
            completado: false,
          }
        }

        setJuego(dataJuego)
        setLoading(false)

        // Cargar reseñas del juego
        const resReseñas = await fetch(
          `http://localhost:3000/api/reviews/game/${id}`
        )
        if (resReseñas.ok) {
          const dataReseñas = await resReseñas.json()
          setReseñas(dataReseñas)
        }
      } catch (err) {
        console.error('Error al cargar datos en InfoJuego:', err)
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [id, user])

  // Función para actualizar estado usuario-juego
  const actualizarEstado = async (juegoId, campo, valor) => {
    try {
      let userId = user?._id || user?.id
      if (!userId) {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          const parsed = JSON.parse(storedUser)
          userId = parsed._id || parsed.id
        }
      }
      if (!userId) {
        navigate('/perfil')
        return
      }

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

      setJuego((prev) => (prev ? { ...prev, [campo]: valor } : prev))
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

  // Función que actualiza la lista de reseñas al enviar una nueva
  const handleReseniaEnviada = (nuevaResenia) => {
    setReseñas((prev) => [nuevaResenia, ...prev])
  }

  if (loading) return <Loader imagen={tiempoCarga4} />
  if (!juego) return <p>No se encontró el juego.</p>

  return (
    <div className="info-juego">
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

      <div className="acciones-juego">
        <button className="btn-jugar">Jugar</button>

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

      {/* Formulario de reseñas */}
      <FormularioResenias
        juegoId={juego._id}
        usuarioId={user?._id || user?.id}
        nombreUsuario={user?.nombre}
        onReseniaEnviada={handleReseniaEnviada}
      />

      {/* Lista de reseñas existentes */}
      <div>
        <h3>Reseñas de usuarios</h3>
        {reseñas.length === 0 && <p>No hay reseñas aún.</p>}
        {reseñas.map((r) => (
          <div key={r._id}>
            <p>
              <strong>{r.usuarioId?.nombre || 'Anónimo'}</strong> -{' '}
              {r.puntuacion} <img src={iconReview} alt={iconReview} className='iconReview'/>
            </p>
            <p>{r.textoResenia}</p>
            <p>
              Horas jugadas: {r.horasJugadas} | Dificultad: {r.dificultad} |
              Recomendación: {r.recomendaria ? 'Sí' : 'No'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InfoJuego

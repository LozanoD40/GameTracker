import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../componente_General/Login'

function Confi() {
  const [juegos, setJuegos] = useState([])
  const [editandoId, setEditandoId] = useState(null)

  // campos juego
  const [titulo, setTitulo] = useState('')
  const [genero, setGenero] = useState('')
  const [plataforma, setPlataforma] = useState('')
  const [anioLanzamiento, setAnioLanzamiento] = useState('')
  const [clasificacionEdad, setClasificacionEdad] = useState('')
  const [desarrollador, setDesarrollador] = useState('')
  const [imagenPortada, setImagenPortada] = useState('')
  const [descripcion, setDescripcion] = useState('')

  // cuenta
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [contrasenia, setContrasenia] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const cargarUsuario = () => {
      try {
        const raw = localStorage.getItem('user')
        if (!raw) {
          setUser(null)
          setIsLoginOpen(true)
          return
        }
        const parsed = JSON.parse(raw)
        setUser(parsed)
        setNombre(parsed.nombre || '')
        setEmail(parsed.email || '')
      } catch (err) {
        console.error('Error leyendo user desde localStorage', err)
        setUser(null)
        setIsLoginOpen(true)
      }
    }

    cargarUsuario()
  }, [])

  const cerrarSesion = () => {
    localStorage.removeItem('user')
    setUser(null)
    setNombre('')
    setEmail('')
    setContrasenia('')
    setJuegos([])
    navigate('/')
  }

  // --- Juegos CRUD ---
  const crearJuego = async () => {
    const nuevoJuego = {
      titulo,
      genero,
      plataforma,
      anioLanzamiento,
      clasificacionEdad,
      desarrollador,
      imagenPortada,
      descripcion,
    }
    try {
      const res = await fetch('http://localhost:3000/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoJuego),
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setJuegos((prev) => [...prev, data])
      alert('si se subio')
      limpiarFormularioJuego()
    } catch (err) {
      console.error('Error creando juego:', err)
    }
  }

  const prepararEdicion = (juego) => {
    setEditandoId(juego._id)
    setTitulo(juego.titulo || '')
    setGenero(juego.genero || '')
    setPlataforma(juego.plataforma || '')
    setAnioLanzamiento(juego.anioLanzamiento || '')
    setClasificacionEdad(juego.clasificacionEdad || '')
    setDesarrollador(juego.desarrollador || '')
    setImagenPortada(juego.imagenPortada || '')
    setDescripcion(juego.descripcion || '')
  }

  const actualizarJuego = async () => {
    if (!editandoId) return
    const actualizado = {
      titulo,
      genero,
      plataforma,
      anioLanzamiento,
      clasificacionEdad,
      desarrollador,
      imagenPortada,
      descripcion,
    }
    try {
      const res = await fetch(
        `http://localhost:3000/api/games/games/${editandoId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(actualizado),
        }
      )
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setJuegos((prev) => prev.map((p) => (p._id === editandoId ? data : p)))
      setEditandoId(null)
      limpiarFormularioJuego()
    } catch (err) {
      console.error('Error actualizando juego:', err)
    }
  }

  const limpiarFormularioJuego = () => {
    setTitulo('')
    setGenero('')
    setPlataforma('')
    setAnioLanzamiento('')
    setClasificacionEdad('')
    setDesarrollador('')
    setImagenPortada('')
    setDescripcion('')
  }

  // --- Cuenta (editar / eliminar) ---
  const actualizarCuenta = async () => {
    if (!user?.id && !user?._id) {
      alert('No hay usuario logueado')
      return
    }
    const id = user.id || user._id
    try {
      const res = await fetch(`http://localhost:3000/api/users/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, contrasenia }),
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      // actualizar localStorage y estado
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: data._id || data.id,
          nombre: data.nombre,
          email: data.email,
        })
      )
      cargarUsuario()
      alert('Cuenta actualizada')
    } catch (err) {
      console.error('Error actualizando cuenta:', err)
    }
  }

  const eliminarCuenta = async () => {
    if (!user?.id && !user?._id) {
      alert('No hay usuario logueado')
      return
    }
    if (!confirm('¿Eliminar tu cuenta permanentemente?')) return
    const id = user.id || user._id
    try {
      const res = await fetch(`http://localhost:3000/api/users/users/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error(await res.text())
      // limpiar sesión y redirigir
      localStorage.removeItem('user')
      setUser(null)
      alert('Cuenta eliminada')
      navigate('/')
    } catch (err) {
      console.error('Error eliminando cuenta:', err)
    }
  }

  return (
    <div className="confi-container">
      <section className="confi-juegos">
        <h2>{editandoId ? 'Editar Juego' : 'Crear Juego'}</h2>

        <div className="form-row">
          <input
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <input
            placeholder="Género"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          />
          <input
            placeholder="Plataforma"
            value={plataforma}
            onChange={(e) => setPlataforma(e.target.value)}
          />
          <input
            placeholder="Año lanzamiento"
            value={anioLanzamiento}
            onChange={(e) => setAnioLanzamiento(e.target.value)}
          />
          <input
            placeholder="Clasificación"
            value={clasificacionEdad}
            onChange={(e) => setClasificacionEdad(e.target.value)}
          />
          <input
            placeholder="Desarrollador"
            value={desarrollador}
            onChange={(e) => setDesarrollador(e.target.value)}
          />
          <input
            placeholder="URL imagen portada"
            value={imagenPortada}
            onChange={(e) => setImagenPortada(e.target.value)}
          />
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="form-actions">
          {editandoId ? (
            <>
              <button onClick={actualizarJuego}>Guardar cambios</button>
              <button
                onClick={() => {
                  setEditandoId(null)
                  limpiarFormularioJuego()
                }}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button onClick={crearJuego}>Crear juego</button>
          )}
        </div>

        <h3>Lista de juegos</h3>
        <div className="lista-juegos">
          {juegos.map((g) => (
            <div key={g._id} className="item-juego">
              <img
                src={g.imagenPortada}
                alt={g.titulo}
                className="mini-portada"
              />
              <div className="meta">
                <strong>{g.titulo}</strong>
                <small>
                  {g.genero} • {g.plataforma}
                </small>
              </div>
              <div className="actions">
                <button onClick={() => prepararEdicion(g)}>Editar</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="confi-cuenta">
        <h2>Mi Cuenta</h2>
        <div className="form-row">
          <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Contraseña (nueva)"
            type="password"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button onClick={actualizarCuenta}>Actualizar cuenta</button>
          <button onClick={eliminarCuenta} className="danger">
            Eliminar cuenta
          </button>
          <button onClick={cerrarSesion} className="danger">
            Cerrar cuenta
          </button>
        </div>
      </section>
    </div>
  )
}

export default Confi

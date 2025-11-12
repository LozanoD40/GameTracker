import { useState, useEffect } from 'react'

function FormularioResenias({
  juegoId,
  usuarioId,
  nombreUsuario,
  onReseniaEnviada,
}) {
  const [puntuacion, setPuntuacion] = useState(5)
  const [textoResenia, setTextoResenia] = useState('')
  const [horasJugadas, setHorasJugadas] = useState(0)
  const [dificultad, setDificultad] = useState('')
  const [recomendaria, setRecomendaria] = useState(true)
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)
  const [respuestas, setRespuestas] = useState([]) // Respuestas asociadas a la reseña

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (textoResenia.trim().length < 5) {
      setMensaje('La reseña debe tener al menos 5 caracteres.')
      return
    }

    setCargando(true)
    setMensaje('')

    try {
      const res = await fetch('http://localhost:3000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          juegoId,
          usuarioId,
          nombreUsuario,
          puntuacion,
          textoResenia,
          horasJugadas,
          dificultad,
          recomendaria,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al enviar resenia')

      setMensaje('Reseña enviada correctamente ✅')

      // Limpiar campos
      setPuntuacion(5)
      setTextoResenia('')
      setHorasJugadas(0)
      setDificultad('')
      setRecomendaria(true)

      // Notificar al componente padre
      if (typeof onReseniaEnviada === 'function') onReseniaEnviada(data)

      // Actualizar respuestas si existen
      if (data.respuestas) setRespuestas(data.respuestas)
    } catch (err) {
      setMensaje(err.message)
    } finally {
      setCargando(false)
    }
  }

  // Función para obtener el título de un usuario
  const obtenerTituloUsuario = async (usuarioId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/dataUser/usuario/${usuarioId}/logros`
      )
      if (!res.ok) return 'Aventurero Novato'
      const logros = await res.json()
      if (Array.isArray(logros) && logros.length > 0) {
        const ultimoLogro = logros[logros.length - 1]
        return ultimoLogro.nombre || 'Aventurero Novato'
      }
      return 'Aventurero Novato'
    } catch (err) {
      console.error('Error al obtener título:', err)
      return 'Aventurero Novato'
    }
  }

  // Componente para renderizar respuestas
  const RespuestasList = ({ respuestas }) => {
    const [respuestasConTitulo, setRespuestasConTitulo] = useState([])

    useEffect(() => {
      const fetchTitulos = async () => {
        const updated = await Promise.all(
          respuestas.map(async (r) => {
            const titulo = await obtenerTituloUsuario(r.usuarioId)
            return { ...r, tituloUsuario: titulo }
          })
        )
        setRespuestasConTitulo(updated)
      }
      if (respuestas.length > 0) fetchTitulos()
    }, [respuestas])

    return (
      <div className="reseña-container">
        {respuestasConTitulo.map((r) => (
          <div key={r._id} className="respuesta-item">
            <strong>{r.nombreUsuario}</strong> ({r.tituloUsuario}): {r.texto}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="reseña-container">
      <h3>Escribe tu reseña</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Puntuación:
          <select
            value={puntuacion}
            onChange={(e) => setPuntuacion(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} ⭐
              </option>
            ))}
          </select>
        </label>

        <label>
          Reseña:
          <textarea
            value={textoResenia}
            onChange={(e) => setTextoResenia(e.target.value)}
            rows={4}
          />
        </label>

        <label>
          Horas jugadas:
          <input
            type="number"
            value={horasJugadas}
            onChange={(e) => setHorasJugadas(Number(e.target.value))}
            min={0}
          />
        </label>

        <label>
          Dificultad:
          <input
            type="text"
            value={dificultad}
            onChange={(e) => setDificultad(e.target.value)}
            placeholder="Fácil / Medio / Difícil"
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={recomendaria}
            onChange={(e) => setRecomendaria(e.target.checked)}
          />
          Recomendaría el juego
        </label>

        <button type="submit" disabled={cargando}>
          {cargando ? 'Enviando...' : 'Enviar reseña'}
        </button>
      </form>

      {mensaje && <p>{mensaje}</p>}

      {/* Mostrar respuestas con nombre y título */}
      {respuestas.length > 0 && <RespuestasList respuestas={respuestas} />}
    </div>
  )
}

export default FormularioResenias

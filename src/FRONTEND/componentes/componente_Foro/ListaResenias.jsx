import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../componente_General/Loading'
import tiempoCarga3 from './../../../assets/loadingGif/tiempoCarga3.gif'
import ReseniaDetalle from './FormularioReseña'
import Respuesta from './Respuesta'

function ListaResenias() {
  const [reseñas, setReseñas] = useState([])
  const [filtro, setFiltro] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedResenia, setSelectedResenia] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  // 🔥 Cargar reseñas
  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 7000)

    fetch('http://localhost:3000/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        setReseñas(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error al cargar reseñas:', err)
        setLoading(false)
      })
      .finally(() => clearTimeout(timeout))
  }, [])

  // 🔥 Abrir modal de respuesta
  const abrirModal = (resenia) => {
    setSelectedResenia(resenia)
    setShowModal(true)
  }

  // 🔥 Enviar respuesta desde modal
  const enviarRespuesta = async (idReseña, respuesta) => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      console.error('Usuario no logueado')
      navigate('/perfil')
      return
    }

    const user = JSON.parse(storedUser)
    const userId = user._id || user.id

    try {
      const res = await fetch(
        `http://localhost:3000/api/reviews/${idReseña}/responder`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ respuesta, usuarioId: userId }),
        }
      )

      const data = await res.json()

      if (res.ok) {
        alert('Respuesta enviada correctamente ✅')

        // 🔥 Refrescar lista
        const resRefetch = await fetch('http://localhost:3000/api/reviews')
        const updated = await resRefetch.json()
        setReseñas(updated)
      } else {
        console.error('Error al responder:', data.error)
        alert(`Error: ${data.error}`)
      }
    } catch (err) {
      console.error('Error al enviar respuesta:', err)
    } finally {
      setShowModal(false)
    }
  }

  const reseñasFiltradas = reseñas.filter((r) =>
    r.juegoId?.titulo?.toLowerCase().includes(filtro.toLowerCase())
  )

  if (loading) return <Loader imagen={tiempoCarga3} />

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl text-[#d6b26f] font-bold">
          Foro de Reseñas Globales
        </h1>
        <p className="text-gray-400">
          Comparte y descubre opiniones de toda la comunidad
        </p>
      </header>

      <div className="mb-4">
        <input
          type="text"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Filtrar por nombre del juego..."
          className="w-full max-w-md p-2 rounded bg-[#1a1a1a] border border-[#3a2a18] text-gray-300"
        />
      </div>

      {reseñasFiltradas.length > 0 ? (
        <div className="space-y-4">
          {reseñasFiltradas.map((r) => (
            <ReseniaDetalle
              key={r._id}
              reseña={r}
              onResponder={() => abrirModal(r)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No hay reseñas disponibles.</p>
      )}

      {showModal && selectedResenia && (
        <Respuesta
          reseña={selectedResenia}
          onClose={() => setShowModal(false)}
          onSubmit={enviarRespuesta}
        />
      )}
    </div>
  )
}

export default ListaResenias

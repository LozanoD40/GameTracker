import { useState } from 'react'

function Respuesta({ reseña, onClose, onSubmit }) {
  const [texto, setTexto] = useState('')

  const handleSubmit = () => {
    if (texto.trim() === '') {
      alert('La respuesta no puede estar vacía.')
      return
    }
    onSubmit(reseña._id, texto)
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] border border-[#3a2a18] p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl text-[#d6b26f] font-bold mb-3">
          Responder a {reseña.juegoId?.titulo || 'la reseña'}
        </h2>

        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe tu respuesta..."
          className="w-full h-32 p-2 rounded bg-[#121212] text-gray-200 border border-[#3a2a18] resize-none"
        />

        <div className="flex justify-end mt-4 gap-3">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-700 text-gray-200 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-[#3a2a18] text-[#d6b26f] rounded hover:bg-[#4a3a24]"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Respuesta

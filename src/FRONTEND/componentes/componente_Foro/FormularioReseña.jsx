function ReseniaDetalle({ reseña, onResponder }) {
  return (
    <div className="bg-[#1a1a1a] border border-[#3a2a18] p-4 rounded-lg shadow-md">
      <h2 className="text-[#a58b5e] text-xl font-semibold mb-2">
        {reseña.juegoId?.titulo || 'Juego desconocido'}
      </h2>

      <p className="text-gray-400 text-sm mb-2">
        Publicado por{' '}
        <span className="text-[#d6b26f]">
          {reseña.usuarioId?.nombre || 'Anónimo'}
        </span>{' '}
        el {new Date(reseña.fechaCreacion).toLocaleDateString()}
      </p>

      <p className="text-gray-300 mb-2 italic">
        {reseña.textoResenia || 'Sin texto...'}
      </p>

      <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-3">
        <span>🎮 {reseña.horasJugadas || 0}h</span>
        <span>⚔️ {reseña.dificultad || 'N/A'}</span>
        <span>🌟 {reseña.puntuacion || 0}/100</span>
        <span>🐉 {reseña.recomendaria ? 'Recomendado' : 'No recomendado'}</span>
      </div>

      {reseña.respuestas?.length > 0 && (
        <div className="mt-2 border-t border-[#3a2a18] pt-2">
          <h3 className="text-[#d6b26f] text-sm mb-1">Respuestas:</h3>
          <ul className="space-y-1">
            {reseña.respuestas.map((resp, i) => (
              <li key={i} className="text-gray-400 text-sm">
                <span className="text-[#a58b5e] font-semibold">
                  {resp.usuario?.nombre ||
                    resp.usuarioId?.nombre ||
                    'Aventurero Anónimo'}
                  :
                </span>{' '}
                {resp.texto}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-3 flex justify-end">
        <button
          onClick={onResponder}
          className="px-3 py-1 bg-[#3a2a18] text-[#d6b26f] rounded hover:bg-[#4a3a24] transition"
        >
          Responder
        </button>
      </div>
    </div>
  )
}

export default ReseniaDetalle

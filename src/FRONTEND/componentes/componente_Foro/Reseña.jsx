import { useState } from 'react';

const Reseña = ({ juegoId, usuarioId }) => {
  const [puntuacion, setPuntuacion] = useState(5);
  const [textoResenia, setTextoResenia] = useState('');
  const [horasJugadas, setHorasJugadas] = useState(0);
  const [dificultad, setDificultad] = useState('');
  const [recomendaria, setRecomendaria] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!textoResenia || textoResenia.length < 5) {
      setMensaje('La reseña debe tener al menos 5 caracteres.');
      return;
    }

    setCargando(true);
    setMensaje('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          juegoId,
          usuarioId,
          puntuacion,
          textoResenia,
          horasJugadas,
          dificultad,
          recomendaria,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al enviar reseña');

      setMensaje('Reseña enviada correctamente ✅');
      // Reset campos
      setPuntuacion(5);
      setTextoResenia('');
      setHorasJugadas(0);
      setDificultad('');
      setRecomendaria(true);
    } catch (err) {
      setMensaje(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="reseña-container p-4 border rounded-md shadow-sm max-w-md">
      <h3 className="text-lg font-bold mb-2">Escribe tu reseña</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label>
          Puntuación:
          <select
            value={puntuacion}
            onChange={(e) => setPuntuacion(Number(e.target.value))}
            className="ml-2 border rounded p-1"
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
            className="w-full border rounded p-2"
            rows={4}
          />
        </label>

        <label>
          Horas jugadas:
          <input
            type="number"
            value={horasJugadas}
            onChange={(e) => setHorasJugadas(Number(e.target.value))}
            className="ml-2 border rounded p-1 w-20"
            min={0}
          />
        </label>

        <label>
          Dificultad:
          <input
            type="text"
            value={dificultad}
            onChange={(e) => setDificultad(e.target.value)}
            className="ml-2 border rounded p-1"
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={recomendaria}
            onChange={(e) => setRecomendaria(e.target.checked)}
          />
          Recomendaría el juego
        </label>

        <button
          type="submit"
          disabled={cargando}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {cargando ? 'Enviando...' : 'Enviar reseña'}
        </button>
      </form>
      {mensaje && <p className="mt-2 text-sm">{mensaje}</p>}
    </div>
  );
};

export default Reseña;
import { useState } from "react";

function FormularioReseñas({ gameTitle }) {
  // Estado local con reseñas simuladas
  const [reviews, setReviews] = useState([
    {
      id: 1,
      usuario: "Enrique Márquez",
      puntuacion: 92,
      textoResenia: "Excelente juego, historia profunda y jugabilidad increíble.",
      horasJugadas: 50,
      dificultad: "Difícil",
      recomendaria: true,
      fechaCreacion: "2025-11-01",
    },
    {
      id: 2,
      usuario: "Jacobo Garcés",
      puntuacion: 80,
      textoResenia: "Muy bueno, aunque algunos bugs arruinan la experiencia.",
      horasJugadas: 30,
      dificultad: "Normal",
      recomendaria: true,
      fechaCreacion: "2025-11-03",
    },
  ]);

  const [formData, setFormData] = useState({
    usuario: "",
    puntuacion: "",
    textoResenia: "",
    horasJugadas: "",
    dificultad: "Normal",
    recomendaria: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaResenia = {
      id: reviews.length + 1,
      ...formData,
      fechaCreacion: new Date().toISOString().split("T")[0],
    };
    setReviews([nuevaResenia, ...reviews]);
    setFormData({
      usuario: "",
      puntuacion: "",
      textoResenia: "",
      horasJugadas: "",
      dificultad: "Normal",
      recomendaria: false,
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900/90 text-yellow-200 rounded-2xl shadow-2xl border border-yellow-700/30">
      <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">
        Reseñas de {gameTitle}
      </h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          name="usuario"
          type="text"
          placeholder="Tu nombre"
          value={formData.usuario}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl bg-gray-800 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-yellow-100 placeholder-gray-400"
        />

        <input
          name="puntuacion"
          type="number"
          placeholder="Puntuación (0 - 100)"
          value={formData.puntuacion}
          onChange={handleChange}
          min="0"
          max="100"
          required
          className="w-full p-3 rounded-xl bg-gray-800 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-yellow-100 placeholder-gray-400"
        />

        <textarea
          name="textoResenia"
          placeholder="Escribe tu reseña..."
          value={formData.textoResenia}
          onChange={handleChange}
          rows="3"
          required
          className="w-full p-3 rounded-xl bg-gray-800 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-yellow-100 placeholder-gray-400"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="horasJugadas"
            type="number"
            placeholder="Horas jugadas"
            value={formData.horasJugadas}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-800 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-yellow-100 placeholder-gray-400"
          />

          <select
            name="dificultad"
            value={formData.dificultad}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-800 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-yellow-100"
          >
            <option value="Fácil">Fácil</option>
            <option value="Normal">Normal</option>
            <option value="Difícil">Difícil</option>
          </select>
        </div>

        <label className="flex items-center gap-2 mt-2 text-yellow-200">
          <input
            name="recomendaria"
            type="checkbox"
            checked={formData.recomendaria}
            onChange={handleChange}
            className="w-4 h-4 accent-green-500"
          />
          ¿Lo recomendarías?
        </label>

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-400 transition p-3 rounded-xl w-full font-semibold text-gray-900 mt-3 shadow-md"
        >
          Enviar reseña
        </button>
      </form>

      {/* Lista de reseñas */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-400 text-center italic">
            No hay reseñas todavía.
          </p>
        ) : (
          reviews.map((r) => (
            <div
              key={r.id}
              className="bg-gray-800/90 rounded-2xl p-4 shadow-lg hover:shadow-yellow-400/30 transition-transform hover:-translate-y-1 border border-yellow-600/20"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-yellow-300">
                  {r.usuario}
                </span>
                <span className="text-sm text-yellow-500">
                  {r.fechaCreacion}
                </span>
              </div>

              <p className="text-yellow-400 font-bold">
                Puntuación: {r.puntuacion}/100
              </p>
              <p className="italic mt-2">{r.textoResenia}</p>
              <p className="text-sm text-yellow-300 mt-1">
                Horas jugadas: {r.horasJugadas || "N/A"} — Dificultad:{" "}
                {r.dificultad}
              </p>
              <p
                className={`text-sm mt-2 font-semibold flex items-center gap-2 justify-center ${
                  r.recomendaria ? "text-green-400" : "text-red-400"
                }`}
              >
                {r.recomendaria ? "✅ Recomendado" : "❌ No recomendado"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FormularioReseñas;
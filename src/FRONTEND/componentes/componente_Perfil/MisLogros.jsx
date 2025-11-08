import { useState } from 'react'
import '../../styles/Perfil.css'

function MisLogros() {
  const todosLosLogros = [
    {
      id: 1,
      titulo: 'Primer logro',
      descripcion: 'Has conseguido tu primer logro',
    },
    {
      id: 2,
      titulo: 'Cazador de tesoros',
      descripcion: 'Descubriste un tesoro oculto',
    },
    {
      id: 3,
      titulo: 'Compañero fiel',
      descripcion: 'Agregaste a tu primer amigo',
    },
    { id: 4, titulo: 'Veterano', descripcion: 'Jugaste más de 100 horas' },
    {
      id: 5,
      titulo: 'Maestro de misiones',
      descripcion: 'Completaste 50 misiones',
    },
    {
      id: 6,
      titulo: 'Reseñador legendario',
      descripcion: 'Dejaste tu primera reseña',
    },
  ]

  const [mostrarTodos, setMostrarTodos] = useState(false)
  const logrosVisibles = mostrarTodos
    ? todosLosLogros
    : todosLosLogros.slice(0, 4)

  return (
    <div className="mis-logros-container">
      <h2 className="titulo-seccion">🏆 Mis Logros</h2>
      <div className="grid-logros">
        {logrosVisibles.map((logro) => (
          <div key={logro.id} className="logro-card">
            <h3>{logro.titulo}</h3>
            <p>{logro.descripcion}</p>
          </div>
        ))}
      </div>

      {todosLosLogros.length > 4 && (
        <button
          className="btn-vermas"
          onClick={() => setMostrarTodos(!mostrarTodos)}
        >
          {mostrarTodos ? 'Ver menos ▲' : 'Ver más ▼'}
        </button>
      )}
    </div>
  )
}

export default MisLogros

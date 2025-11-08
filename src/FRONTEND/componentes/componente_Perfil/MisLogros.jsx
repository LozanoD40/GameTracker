import '../../styles/Perfil.css'
import { useState } from 'react'
import IconElijeClase from './../../../../public/Logros/IconElijeClase.png'
import iconPrimeraResenia from './../../../../public/Logros/iconPrimeraResenia.png'
import iconContesta from './../../../../public/Logros/iconContesta.png'

function MisLogros() {
  const [logrosVisibles, setLogrosVisibles] = useState(4)
  const [logroActivo, setLogroActivo] = useState(null)

  const todosLosLogros = [
    {
      id: 1,
      titulo: 'Primer logro',
      descripcion: 'Has conseguido tu primer logro',
      icon: IconElijeClase,
    },
    {
      id: 2,
      titulo: 'Cazador de tesoros',
      descripcion: 'Descubriste un tesoro oculto',
      icon: iconPrimeraResenia,
    },
    {
      id: 3,
      titulo: 'Compañero fiel',
      descripcion: 'Agregaste a tu primer amigo',
      icon: iconContesta,
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
    { id: 7, titulo: 'Explorador', descripcion: 'Visitaste todos los mundos' },
    { id: 8, titulo: 'Artesano', descripcion: 'Mejoraste un objeto al máximo' },
  ]

  const mostrarMas = () => {
    if (logrosVisibles >= todosLosLogros.length) setLogrosVisibles(4)
    else setLogrosVisibles(logrosVisibles + 4)
  }

  return (
    <div className="mis-logros-container">
      <h2 className="titulo-seccion">Mis Logros</h2>

      <div className="grid-logros">
        {todosLosLogros.slice(0, logrosVisibles).map((logro) => (
          <div
            key={logro.id}
            className="logro-card"
            onClick={() => setLogroActivo(logro)}
          >
            <div className="rombo"></div>
            <img src={logro.icon} alt={logro.icon} className="icon-logro" />
            <h3>{logro.titulo}</h3>
          </div>
        ))}
      </div>

      {todosLosLogros.length > 4 && (
        <button className="btn-vermas" onClick={mostrarMas}>
          {logrosVisibles >= todosLosLogros.length
            ? 'Ver menos ▲'
            : 'Ver más ▼'}
        </button>
      )}

      {logroActivo && (
        <dialog open className="dialog-logro" id="dialog-logro">
          <div className="dialog-content">
            <img src={logroActivo.icon} alt={logroActivo.icon} className="icon-logro" />
            <h3>{logroActivo.titulo}</h3>
            <p>{logroActivo.descripcion}</p>
            <button onClick={() => setLogroActivo(null)}>Cerrar</button>
          </div>
        </dialog>
      )}
    </div>
  )
}

export default MisLogros

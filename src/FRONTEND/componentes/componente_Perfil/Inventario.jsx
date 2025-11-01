function Inventario() {
  const user = 12
  const logros = 144
  const complete = 12
  const hora = 144
  const dificultad = 12
  const genero = 144
  const interaccion = 122

  return (
    <div className="user-stats-container">
      <div className="atributos">
        <h2>Atributos del Usuario{user}</h2>
        <ul>
          {' '}
          <li>Juegos completados: {complete} </li>
          <li>Logros conseguidos: {logros} </li>
          <li>Horas jugadas: {hora}</li>{' '}
          <li>Nivel de dificultad promedio: {dificultad}</li>{' '}
          <li>Variedad de géneros: {genero}</li>{' '}
          <li>Participación / interacción: {interaccion}</li>{' '}
        </ul>{' '}
      </div>{' '}
    </div>
  )
}
export default Inventario

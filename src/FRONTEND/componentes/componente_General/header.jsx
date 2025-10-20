import { Link } from 'react-router-dom'

function Headers() {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <Link to="/" id='Logo'>
            GameTracker
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/" className="boton-gremio">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/biblioteca" className="boton-gremio">
              Biblioteca
            </Link>
          </li>
          <li>
            <Link to="/inventario" className="boton-gremio">
              Inventario
            </Link>
          </li>
          <li>
            <Link to="/perfil" className="boton-gremio">
              Perfil
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Headers

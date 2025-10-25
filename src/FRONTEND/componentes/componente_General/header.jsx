import { Link } from 'react-router-dom'
import React, { useState } from 'react'

function Headers() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <nav className={`navbar ${open ? 'nav-open' : ''}`}>
        <div className="logo">
          <Link to="/" id="Logo" onClick={() => setOpen(false)}>
            GameTracker
          </Link>
        </div>

        <button
          className={`hamburger ${open ? 'is-active' : ''}`}
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((s) => !s)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul id="primary-navigation" className={`nav-links ${open ? 'open' : ''}`}>
          <li>
            <Link to="/" className="boton-gremio" onClick={() => setOpen(false)}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/biblioteca" className="boton-gremio" onClick={() => setOpen(false)}>
              Biblioteca
            </Link>
          </li>
          <li>
            <Link to="/foro" className="boton-gremio" onClick={() => setOpen(false)}>
              Foro
            </Link>
          </li>
          <li>
            <Link to="/inventario" className="boton-gremio" onClick={() => setOpen(false)}>
              Inventario
            </Link>
          </li>
          <li>
            <Link to="/perfil" className="boton-gremio" onClick={() => setOpen(false)}>
              Perfil
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Headers

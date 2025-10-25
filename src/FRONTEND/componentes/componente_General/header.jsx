import './../../styles/header.css'
import { Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'

function Headers() {
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)

  // cerrar con ESC y clic fuera
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    function onClickOutside(e) {
      if (open && navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClickOutside)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClickOutside)
    }
  }, [open])

  return (
    <div ref={navRef}>
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

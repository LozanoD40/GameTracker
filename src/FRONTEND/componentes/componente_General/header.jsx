import './../../styles/header.css'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import iconIngresar from './../../../assets/iconIngresar.png'
import iconRegistro from './../../../assets/iconRegistro.png'
import Login from './Login'


function Headers() {
  const [open, setOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navRef = useRef(null)

  //redireccion a perfil
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // cerrar menu hamburguesa
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

        <ul
          id="primary-navigation"
          className={`nav-links ${open ? 'open' : ''}`}
        >
          <li>
            <Link
              to="/"
              className="boton-gremio"
              onClick={() => setOpen(false)}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/biblioteca"
              className="boton-gremio"
              onClick={() => setOpen(false)}
            >
              Biblioteca
            </Link>
          </li>
          <li>
            <Link
              to="/foro"
              className="boton-gremio"
              onClick={() => setOpen(false)}
            >
              Foro
            </Link>
          </li>
          <li>
            <Link
              to="/inventario"
              className="boton-gremio"
              onClick={() => setOpen(false)}
            >
              Inventario
            </Link>
          </li>
          <li>
            {!user ? (
              <button
                className="boton-gremio"
                onClick={() => setIsLoginOpen(true)}
              >
                Perfil
                <img
                  src={iconRegistro}
                  alt="registrarte"
                  className="img-Icon"
                />
              </button>
            ) : (
              <Link to="/perfil" className="boton-gremio">
                Perfil
                <img src={iconIngresar} alt="perfil" className="img-Icon" />
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <Login
        isOpen={isLoginOpen}
        onClose={() => {
          setIsLoginOpen(false)
          const userData = localStorage.getItem('user')
          if (userData) {
            setUser(JSON.parse(userData))
          }
        }}
      />
    </div>
  )
}

export default Headers

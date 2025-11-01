import './../../styles/login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contrasenia: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const endpoint = isLogin ? '/api/users/login' : '/api/users'
      const res = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      let data = null
      try {
        data = await res.json()
      } catch {
        setError('Respuesta inválida del servidor')
        return
      }

      if (!res.ok) {
        setError(data?.error || 'Error en el proceso')
        return
      }

      localStorage.setItem('user', JSON.stringify(data))
      onClose()
      navigate('/perfil')
    } catch (err) {
      setError({error: err.mensage})
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="Title">
          {isLogin ? 'Acceder al Reino' : 'Únete a la Aventura'}
        </h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="Form">
          {!isLogin && (
            <input
              className="inpunt"
              type="text"
              name="nombre"
              placeholder="Nombre del Aventurero"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          )}
          <input
            className="inpunt"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            className="inpunt"
            type="password"
            name="contrasenia"
            placeholder="Contraseña"
            value={formData.contrasenia}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="btn-registro">
            {isLogin ? 'Ingresar' : 'Registrarse'}
          </button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)} className="btn-switch">
          {isLogin
            ? '¿No tienes cuenta? Unetenos'
            : '¿Ya tienes cuenta? Ingresa'}
        </button>
      </div>
    </div>
  )
}

export default Login

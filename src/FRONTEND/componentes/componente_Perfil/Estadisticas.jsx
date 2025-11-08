import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from './../componente_General/Login'

const Estadisticas = () => {
  const [user, setUser] = useState(null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      setIsLoginOpen(true)
      return
    }
    setUser(JSON.parse(userData))
  }, [navigate])

  if (!user)
    return (
      <Login
        isOpen={isLoginOpen}
        onClose={() => {
          setIsLoginOpen(false)
          const userData = localStorage.getItem('user')
          if (userData) {
            setUser(JSON.parse(userData))
          } else {
            navigate('/')
          }
        }}
      />
    )

  const stats = {
    tiempoactivo: 120,
    cantidaddeamigos: 10,
    misionesCompletadas: 78,
    tesorosDescubiertos: 14,
    logrosObtenidos: 25,
  }


  return (
    <div className='container'>
      <h3 className='title'>Estadísticas personales de {user.nombre}</h3>

      <div className='content'>
        <div className='leftColumn'>
          <div className='box'>Horas jugadas: {stats.tiempoactivo}</div>
          <div className='box'>Amigos: {stats.cantidaddeamigos}</div>
          <div className='box'>
            Misiones completadas: {stats.misionesCompletadas}
          </div>
          <div className='box'>
            Tesoros descubiertos: {stats.tesorosDescubiertos}
          </div>
          <div className='box'>
            Logros obtenidos: {stats.logrosObtenidos}
          </div>
        </div>

        <div className='rightPanel'>
          <div></div>
        </div>
      </div>
    </div>
  )
}
export default Estadisticas
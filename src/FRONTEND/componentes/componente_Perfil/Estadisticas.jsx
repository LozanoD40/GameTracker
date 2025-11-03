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
    <div style={styles.container}>
      <h3 style={styles.title}>Estadísticas personales de {user.nombre}</h3>

      <div style={styles.content}>
        <div style={styles.leftColumn}>
          <div style={styles.box}>Horas jugadas: {stats.tiempoactivo}</div>
          <div style={styles.box}>Amigos: {stats.cantidaddeamigos}</div>
          <div style={styles.box}>Misiones completadas: {stats.misionesCompletadas}</div>
          <div style={styles.box}>Tesoros descubiertos: {stats.tesorosDescubiertos}</div>
          <div style={styles.box}>Logros obtenidos: {stats.logrosObtenidos}</div>
        </div>

        <div style={styles.rightPanel}>
          {/* Aquí podrías agregar un gráfico o imagen de fondo */}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '20px',
    color: 'white',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  leftColumn: {
    width: '45%',
  },
  box: {
    backgroundColor: '#2e2e2e',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    fontSize: '18px',
  },
  rightPanel: {
    width: '45%',
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    minHeight: '250px',
  },
}

export default Estadisticas
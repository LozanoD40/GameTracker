import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconConfiguracion from './../../../assets/iconConfiguracion.png'
import perfilKnight from './../../../assets/perfilKnight.jpg'
import perfilDwarf from './../../../assets/perfilDwarf.png'
import perfilDragonMan from './../../../assets/perfilDragonMan.png'
import perfilCatGirl from './../../../assets/perfilCatGirl.png'
import perfilBearMan from './../../../assets/perfilBearMan.png'
import perfilElf from './../../../assets/perfilElf.png'
import perfilDarkelf from './../../../assets/iconConfiguracion.png'
import perfilFairy from './../../../assets/iconConfiguracion.png'
import perfilBarbarian from './../../../assets/iconConfiguracion.png'
import perfilWizard from './../../../assets/iconConfiguracion.png'
import Login from './../componente_General/Login'

function Status() {
  const [opcion, setOpcion] = useState(null)
  const [user, setUser] = useState(null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Verificar si hay usuario logueado
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

  const mostrarImagen = () => {
    switch (opcion) {
      case 'Knight':
        return perfilKnight
      case 'Dwarf':
        return perfilDwarf
      case 'DragonMan':
        return perfilDragonMan
      case 'Nekomimi':
        return perfilCatGirl
      case 'BearMan':
        return perfilBearMan
      case 'Elf':
        return perfilElf
      case 'Darkelf':
        return perfilDarkelf
      case 'Fairy':
        return perfilFairy
      case 'Barbarian':
        return perfilBarbarian
      case 'Wizard':
        return perfilWizard
      default:
        return perfilKnight
    }
  }

  const titulo = 'Caza dragones'
  const lvl = 70

  const rango = () => {
    if (lvl < 10) return 'Aspirante'
    else if (lvl < 20) return 'Aprendiz'
    else if (lvl < 30) return 'Aventurero'
    else if (lvl < 40) return 'Guerrero Veterano'
    else if (lvl < 50) return 'Caballero Élite'
    else if (lvl < 60) return 'Maestro de Armas'
    else if (lvl < 70) return 'Héroe de la Corona'
    else if (lvl < 80) return 'Campeón del Reino'
    else return 'Leyenda Eterna'
  }

  return (
    <>
      <div className="title">
        <span></span>
        <h1>STATUS</h1>
        <button
          className="btn-logout"
          onClick={() => {
            localStorage.removeItem('user')
            navigate('/')
          }}
        >
          <img
            src={iconConfiguracion}
            alt="boton de configuracion"
            className="iconConfi"
          />
        </button>
      </div>
      <div className="status">
        <div className="atributes-iz">
          <img
            src={mostrarImagen()}
            alt="imagen del perfil"
            className="atributes"
            id="personaje"
          />
          <div className="level">
            Level: {lvl}
            <span></span>
            <progress
              className="level-progress"
              max="80"
              value={lvl}
            ></progress>
          </div>
        </div>
        <div className="atributes-der">
          <h2 className="atribute">
            Bienvenido: <p>{user.nombre || 'Aventurero Anónimo'}</p>
          </h2>
          <details className="atribute" id="genero-Selection">
            <summary id="summary">
              <h2>Genero:</h2>
              <p>Un valeroso {opcion || ' caballero'}</p>
            </summary>
            <button onClick={() => setOpcion('Knight')}>Knight</button>
            <button onClick={() => setOpcion('Dwarf')}>Dwarf</button>
            <button onClick={() => setOpcion('DragonMan')}>Dragon Man</button>
            <button onClick={() => setOpcion('Nekomimi')}>Nekomimi</button>
            <button onClick={() => setOpcion('BearMan')}>Bear Man</button>
            <button onClick={() => setOpcion('Elf')}>Elf</button>
            <button onClick={() => setOpcion('Darkelf')}>Dark elf</button>
            <button onClick={() => setOpcion('Fairy')}>Fairy</button>
            <button onClick={() => setOpcion('Barbarian')}>Barbarian</button>
            <button onClick={() => setOpcion('Wizard')}>Wizard</button>
          </details>
          <h2 className="atribute">
            Titulo:<p>{titulo}</p>
          </h2>
          <h2 className="atribute">
            Rango: <p>{rango()}</p>
          </h2>
        </div>
      </div>
    </>
  )
}

export default Status

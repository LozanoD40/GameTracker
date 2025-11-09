import '../../styles/Perfil.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iconConfiguracion from './../../../assets/Icons/iconConfiguracion.png'
import perfilKnight from './../../../assets/perfilPlayer/perfilKnight.jpg'
import perfilDwarf from './../../../assets/perfilPlayer/perfilDwarf.png'
import perfilDragonMan from './../../../assets/perfilPlayer/perfilDragonMan.png'
import perfilCatGirl from './../../../assets/perfilPlayer/perfilCatGirl.png'
import perfilBearMan from './../../../assets/perfilPlayer/perfilBearMan.png'
import perfilElf from './../../../assets/perfilPlayer/perfilElf.png'
import perfilDarkelf from './../../../assets/perfilPlayer/perfilDarkElf.png'
import perfilFairy from './../../../assets/perfilPlayer/perfilFairy.png'
import perfilBarbarian from './../../../assets/perfilPlayer/perfilBarbarian.png'
import perfilWizard from './../../../assets/perfilPlayer/perfilWizard.png'
import perfilBard from './../../../assets/perfilPlayer/perfilBard.png'
import perfilSaint from './../../../assets/perfilPlayer/perfilSaint.png'
import perfilAssesing from './../../../assets/perfilPlayer/perfilAssesing.png'
import perfilNecromance from './../../../assets/perfilPlayer/perfilNecromance.png'
import perfilLancer from './../../../assets/perfilPlayer/perfilLancer.png'
import perfilCultist from './../../../assets/perfilPlayer/perfilCultist.png'
import perfilMerchant from './../../../assets/perfilPlayer/perfilMerchant.png'
import perfilHomunculus from './../../../assets/perfilPlayer/perfilHomunculus.png'
import Login from './../componente_General/Login'
import MisLogros from './MisLogros'
import Estadisticas from './Estadisticas'

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
      case 'Dwarf de Hierro':
        return perfilDwarf
      case 'DragonMan del Fuego Eterno':
        return perfilDragonMan
      case 'Nekomimi de Sombras Suaves':
        return perfilCatGirl
      case 'BearMan del Norte':
        return perfilBearMan
      case 'Elfo del gran Bosque':
        return perfilElf
      case 'Dark Elf los repudiados por el bosque':
        return perfilDarkelf
      case 'Fairy de Luz Pura':
        return perfilFairy
      case 'Barbarian del Rugido Antiguo':
        return perfilBarbarian
      case 'Wizard del Ojo Arcano':
        return perfilWizard
      case 'Bardo de las Mil Canciones':
        return perfilBard
      case 'Santa del Sol Blanco':
        return perfilSaint
      case 'Asesino del Silencio':
        return perfilAssesing
      case 'Necromante de la Tumba':
        return perfilNecromance
      case 'Lancero imperial':
        return perfilLancer
      case 'Cultista, seguidor heretico':
        return perfilCultist
      case 'Mercader del Oro Viejo':
        return perfilMerchant
      case 'Homúnculo, la aberracion del mundo':
        return perfilHomunculus
      default:
        return perfilKnight
    }
  }

  const titulo = MisLogros.logros
  const lvl = 20

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
            navigate('/Confi')
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
              <p>{opcion || ' Un Caballero novato'}</p>
            </summary>
            <button onClick={() => setOpcion('Caballero del Alba')}>
              Knight
            </button>
            <button onClick={() => setOpcion('Dwarf de Hierro')}>Dwarf</button>
            <button onClick={() => setOpcion('DragonMan del Fuego Eterno')}>
              Dragon Man
            </button>
            <button onClick={() => setOpcion('Nekomimi de Sombras Suaves')}>
              Nekomimi
            </button>
            <button onClick={() => setOpcion('BearMan del Norte ')}>
              Bear Man
            </button>
            <button onClick={() => setOpcion('Elfo del gran Bosque')}>
              Elf
            </button>
            <button
              onClick={() => setOpcion('Dark Elf los repudiados por el bosque')}
            >
              Dark Elf
            </button>
            <button onClick={() => setOpcion('Fairy de Luz Pura')}>
              Fairy
            </button>
            <button onClick={() => setOpcion('Barbarian del Rugido Antiguo')}>
              Barbarian
            </button>
            <button onClick={() => setOpcion('Wizard del Ojo Arcano')}>
              Wizard
            </button>
            <button onClick={() => setOpcion('Bardo de las Mil Canciones')}>
              Bard
            </button>
            <button onClick={() => setOpcion('Santa del Sol Blanco')}>
              Saint
            </button>
            <button onClick={() => setOpcion('Asesino del Silencio')}>
              Assassing
            </button>
            <button onClick={() => setOpcion('Necromante de la Tumba')}>
              Necromancer
            </button>
            <button onClick={() => setOpcion('Lancero imperial')}>
              Lancer
            </button>
            <button onClick={() => setOpcion('Cultista, seguidor heretico')}>
              Cultist
            </button>
            <button onClick={() => setOpcion('Mercader del Oro Viejo')}>
              Merchant
            </button>
            <button
              onClick={() => setOpcion('Homúnculo, la aberracion del mundo')}
            >
              Homunculus
            </button>
          </details>
          <h2 className="atribute">
            Titulo:<p>{titulo || 'Aventurero novato'}</p>
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

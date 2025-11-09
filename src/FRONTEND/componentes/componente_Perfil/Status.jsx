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

function Status() {
  const [user, setUser] = useState(null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [opcion, setOpcion] = useState('')
  const [lvl, setLvl] = useState(0)
  const [titulo, setTitulo] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      setIsLoginOpen(true)
      return
    }
    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } catch (err) {
      console.error('Error parseando user desde localStorage:', err)
      setIsLoginOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Obtener estadísticas, logros y género del usuario
  useEffect(() => {
    if (!user) return

    const uid = user.id || user._id

    const fetchData = async () => {
      try {
        // Stats
        const statsRes = await fetch(
          `http://localhost:3000/api/dataUser/usuario/${uid}/stats`
        )
        if (!statsRes.ok) {
          console.warn('No se pudieron obtener stats:', await statsRes.text())
        } else {
          const stats = await statsRes.json()
          const {
            tiempoActivo = 0,
            cantidaddeamigos = 0,
            misionesCompletadas = 0,
            tesorosDescubiertos = 0,
            logrosObtenidos = 0,
            reseñasDadas = 0,
          } = stats || {}

          const total =
            (tiempoActivo +
              cantidaddeamigos +
              misionesCompletadas +
              tesorosDescubiertos +
              logrosObtenidos +
              reseñasDadas) /
            10

          setLvl(Math.min(Math.floor(total) || 0, 120))
        }

        // Logros
        const logrosRes = await fetch(
          `http://localhost:3000/api/dataUser/usuario/${uid}/logros`
        )
        if (logrosRes.ok) {
          const logros = await logrosRes.json()
          if (Array.isArray(logros) && logros.length > 0) {
            const ultimoLogro = logros[logros.length - 1]
            setTitulo(ultimoLogro.nombre || 'Aventurero Novato')
          } else {
            setTitulo('Aventurero Novato')
          }
        } else {
          console.warn('No se pudieron obtener logros:', await logrosRes.text())
          setTitulo('Aventurero Novato')
        }

        // Género (opción)
        const generoRes = await fetch(
          `http://localhost:3000/api/dataUser/usuario/${uid}`
        )
        if (generoRes.ok) {
          const generoData = await generoRes.json()
          // aceptar formato: objeto único o array con objeto
          const item = Array.isArray(generoData) ? generoData[0] : generoData
          if (item && item.genero) setOpcion(item.genero)
        } else {
          console.warn('No se pudo obtener género:', await generoRes.text())
        }
      } catch (err) {
        console.error('Error cargando datos del perfil:', err)
      }
    }

    fetchData()
  }, [user])

  const guardarGenero = async (nuevoGenero) => {
    try {
      const uid = user.id || user._id
      const response = await fetch(
        `http://localhost:3000/api/dataUser/usuario/${uid}/genero`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ genero: nuevoGenero }),
        }
      )
      if (!response.ok) throw new Error(await response.text())
      const data = await response.json()
      console.log('Género guardado:', data)
      setOpcion(nuevoGenero)
    } catch (err) {
      console.error('Error al guardar el género:', err)
    }
  }

  const mostrarImagen = () => {
    switch (opcion) {
      case 'Caballero del Alba':
        return perfilKnight
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

  const rango = () => {
    if (lvl < 10) return 'Aspirante'
    if (lvl < 20) return 'Aprendiz'
    if (lvl < 30) return 'Aventurero'
    if (lvl < 40) return 'Guerrero Veterano'
    if (lvl < 50) return 'Caballero Élite'
    if (lvl < 60) return 'Maestro de Armas'
    if (lvl < 70) return 'Héroe de la Corona'
    if (lvl < 80) return 'Campeón del Reino'
    return 'Leyenda Eterna'
  }

  if (!user)
    return (
      <Login
        isOpen={isLoginOpen}
        onClose={() => {
          setIsLoginOpen(false)
          const userData = localStorage.getItem('user')
          if (userData) setUser(JSON.parse(userData))
          else navigate('/')
        }}
      />
    )

  return (
    <>
      <div className="title">
        <span></span> <h1>STATUS</h1>
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
              max={120}
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
              <h2>Género:</h2>
              <p>{opcion || ' Un Caballero novato'}</p>
            </summary>
            {[
              'Caballero del Alba',
              'Dwarf de Hierro',
              'DragonMan del Fuego Eterno',
              'Nekomimi de Sombras Suaves',
              'BearMan del Norte',
              'Elfo del gran Bosque',
              'Dark Elf los repudiados por el bosque',
              'Fairy de Luz Pura',
              'Barbarian del Rugido Antiguo',
              'Wizard del Ojo Arcano',
              'Bardo de las Mil Canciones',
              'Santa del Sol Blanco',
              'Asesino del Silencio',
              'Necromante de la Tumba',
              'Lancero imperial',
              'Cultista, seguidor heretico',
              'Mercader del Oro Viejo',
              'Homúnculo, la aberracion del mundo',
            ].map((genero) => (
              <button key={genero} onClick={() => guardarGenero(genero)}>
                {genero}
              </button>
            ))}
          </details>

          <h2 className="atribute">
            Título:<p>{titulo}</p>
          </h2>
          <h2 className="atribute">
            Rango:<p>{rango()}</p>
          </h2>
        </div>
      </div>
    </>
  )
}

export default Status

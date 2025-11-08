import './../styles/Perfil.css'
import Status from './../componentes/componente_Perfil/Status'
import Estadisticas from './../componentes/componente_Perfil/Estadisticas'
import MisJuegos from '../componentes/componente_Perfil/misJuegos'
import MisLogros from '../componentes/componente_Perfil/misLogros'

function Perfil() {
const stats = {
  tiempoactivo: 12,
  cantidaddeamigos: 9999,
  misionesCompletadas: 30,
  tesorosDescubiertos: 4,
  logrosObtenidos: 25,
  reseñasDadas: 18,
}
  return (
    <div>
      <Status />
      <div className="hr"></div>
      <div className="estadisticas-right">
        <Estadisticas stats={stats} />
      </div>
      <div className="hr"></div>
      <MisJuegos />
      <div className="hr"></div>
      <MisLogros />
    </div>
  )
}

export default Perfil

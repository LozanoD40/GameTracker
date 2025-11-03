import './../styles/perfil.css'
import Status from './../componentes/componente_Perfil/Status'
import Inventario from './../componentes/componente_Perfil/Inventario'
import Stats from './../componentes/componente_Perfil/Stats'

function Perfil() {
  return (
    <div>
      <Status />
      <div className="hr"></div>
      <Inventario />
      <div className="hr"></div>
      <Stats />
    </div>
  )
}

export default Perfil

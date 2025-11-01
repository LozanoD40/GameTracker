import './../styles/perfil.css'
import Status from './../componentes/componente_Perfil/Status'
import Inventario from './../componentes/componente_Perfil/Inventario'

function Perfil() {
  return (
    <div>
      <Status />
      <div className="hr"></div>
      <Inventario />
    </div>
  )
}

export default Perfil

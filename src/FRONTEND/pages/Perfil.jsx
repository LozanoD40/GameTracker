import './../styles/perfil.css'
import Status from './../componentes/componente_Perfil/Status'
import Stats from './../componentes/componente_Perfil/Stats'

function Perfil() {
  return (
    <div>
      <Status />
      <div className="hr"></div>
      <Stats />
    </div>
  )
}

export default Perfil

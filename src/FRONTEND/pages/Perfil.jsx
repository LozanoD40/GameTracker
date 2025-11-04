import './../styles/perfil.css'
import Status from './../componentes/componente_Perfil/Status'
import Stats from './../componentes/componente_Perfil/Stats'
import MisJuegos from '../componentes/componente_Perfil/misJuegos'

function Perfil() {
  return (
    <div>
      <Status />
      <div className="hr"></div>
      <Stats />
      <div className="hr"></div>
      <h2>Logros</h2>
      <div className="hr"></div>
      <MisJuegos />
    </div>
  )
}

export default Perfil

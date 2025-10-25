import Headers from '../componentes/componente_General/header'
import Footer from '../componentes/componente_General/footer'
import BibliotecaJuegos from '../componentes/componente_Biblioteca/BibliotecaJuegos'

function Biblioteca() {
  return (
    <>
      <Headers />
      <div className="biblioteca">
        <div className="grid-juegos"></div>
        <BibliotecaJuegos />
      </div>
      <Footer />
    </>
  )
}

export default Biblioteca

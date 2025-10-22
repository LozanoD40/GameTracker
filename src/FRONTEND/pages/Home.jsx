import Headers from '../componentes/componente_General/header'
import SliderCarruselPrincipal from '../componentes/componente_Home/SliderCarruselPrincipal'
import SliderCarruselSecundario from '../componentes/componente_Home/SliderCarruselSecundario'
import Footer from '../componentes/componente_General/footer'

function Home() {
  return (
    <div>
      <Headers />
      <SliderCarruselPrincipal />
      <SliderCarruselSecundario />
      <Footer />
    </div>
  )
}

export default Home

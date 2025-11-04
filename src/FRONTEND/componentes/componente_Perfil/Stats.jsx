import Estadisticas from "./Estadisticas"

function Stats() {
  const mockStats = {
    total: 18,
    completados: 7,
    generoFavorito: "Acción",
    horasJugadas: 342,
    ultimoJuego: "Alan Wake",
  };

  return (
    <>
      <Estadisticas stats={mockStats} />
    </>
  )
}

export default Stats
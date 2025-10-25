import SliderCategoria from './SliderCategoria'
import Fornite from '../componente_General/Portadas/Fortnite.jpg'
import callOfDuty from '../componente_General/Portadas/Call_of_Duty.jpg'
import Starcraft_2 from '../componente_General/Portadas/Starcraft_2.jpeg'
import World_of_Warcraft from '../componente_General/Portadas/World_of_Warcraft.png'

const juegosRecomendados = [
  { id: 1, titulo: 'Reino de Sombras', imagen: Fornite },
  { id: 2, titulo: 'Guerreros del Norte', imagen: Starcraft_2 },
  { id: 3, titulo: 'Dragones Eternos', imagen: World_of_Warcraft },
  { id: 4, titulo: 'Alianza Mítica', imagen: callOfDuty },
  { id: 5, titulo: 'Aventureros del Valle', imagen: Starcraft_2 },
]

const juegosGratis = [
  { id: 6, titulo: 'Battle Free', imagen: callOfDuty },
  { id: 7, titulo: 'Sky World', imagen: World_of_Warcraft },
  { id: 8, titulo: 'Dungeon Explorer', imagen: Starcraft_2 },
  { id: 9, titulo: 'Pixel Quest', imagen: callOfDuty },
  { id: 10, titulo: 'Galaxy Run', imagen: Fornite },
]

const juegosAventura = [
  { id: 6, titulo: 'Battle Free', imagen: Starcraft_2 },
  { id: 7, titulo: 'Sky World', imagen: callOfDuty },
  { id: 8, titulo: 'Dungeon Explorer', imagen: World_of_Warcraft },
  { id: 9, titulo: 'Pixel Quest', imagen: Fornite },
  { id: 10, titulo: 'Galaxy Run', imagen: callOfDuty },
]

export default function SlidersContainer() {
  return (
    <div className="sliders-container">
      <SliderCategoria titulo="Juegos " juegos={juegosRecomendados} />
      <SliderCategoria titulo="Juegos Gratis" juegos={juegosGratis} />
      <SliderCategoria titulo="Juegos Aventura" juegos={juegosAventura} />
    </div>
  )
}

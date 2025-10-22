import SliderCategoria from './SliderCategoria'

const juegosRecomendados = [
  { id: 1, titulo: 'Reino de Sombras', imagen: 'url1' },
  { id: 2, titulo: 'Guerreros del Norte', imagen: 'url2' },
  { id: 3, titulo: 'Dragones Eternos', imagen: 'url3' },
  { id: 4, titulo: 'Alianza Mítica', imagen: 'url4' },
  { id: 5, titulo: 'Aventureros del Valle', imagen: 'url5' },
]

const juegosGratis = [
  { id: 6, titulo: 'Battle Free', imagen: 'url6' },
  { id: 7, titulo: 'Sky World', imagen: 'url7' },
  { id: 8, titulo: 'Dungeon Explorer', imagen: 'url8' },
  { id: 9, titulo: 'Pixel Quest', imagen: 'url9' },
  { id: 10, titulo: 'Galaxy Run', imagen: 'url10' },
]

const juegosAventura = [
  { id: 6, titulo: 'Battle Free', imagen: 'url6' },
  { id: 7, titulo: 'Sky World', imagen: 'url7' },
  { id: 8, titulo: 'Dungeon Explorer', imagen: 'url8' },
  { id: 9, titulo: 'Pixel Quest', imagen: 'url9' },
  { id: 10, titulo: 'Galaxy Run', imagen: 'url10' },
]

export default function SlidersContainer() {
  return (
    <div className="sliders-container">
      <SliderCategoria titulo="Juegos Recomendados"juegos={juegosRecomendados}/>
      <SliderCategoria titulo="Juegos Gratis" juegos={juegosGratis} />
      <SliderCategoria titulo="Juegos Aventura" juegos={juegosAventura} />
    </div>
  )
}



import React, { useState, useMemo, useEffect } from 'react'
import Left_4_Dead_2 from './../componente_General/Portadas/Left_4_Dead_2.webp'
import Fortnite from './../componente_General/Portadas/Fortnite.jpg'
import World_of_Warcraft from './../componente_General/Portadas/World_of_Warcraft.png'
import Hollow_Knight from './../componente_General/Portadas/Hollow_Knight.webp'
import Call_of_Duty from './../componente_General/Portadas/Call_of_Duty.jpg'
import Tetris from './../componente_General/Portadas/Tetris.png'
import Starcraft_2 from './../componente_General/Portadas/Starcraft_2.jpeg'
import Skyrim from './../componente_General/Portadas/Skyrim.webp'

export default function BibliotecaJuegos() {
  // Datos de ejemplo
  const sampleGames = [
    { id: 1, title: 'Left 4 Dead 2', genres: ['Acción', 'Aventura', 'Horror'], cover: Left_4_Dead_2 },
    { id: 2, title: 'Fortnite', genres: ['Acción', 'Multijugador'], cover: Fortnite },
    { id: 3, title: 'World of Warcraft', genres: ['Estrategia', 'Simulación'], cover: World_of_Warcraft },
    { id: 4, title: 'Hollow Knight', genres: ['Plataformas', 'Indie'], cover: Hollow_Knight },
    { id: 5, title: 'Call of Duty', genres: ['Acción', 'FPS'], cover: Call_of_Duty },
    { id: 6, title: 'Tetris', genres: ['Puzzle', 'Relax'], cover: Tetris },
    { id: 7, title: 'Starcraft 2', genres: ['Estrategia', 'Multijugador'], cover: Starcraft_2 },
    { id: 8, title: 'Skyrim', genres: ['RPG', 'Acción', 'Aventura'], cover: Skyrim },
  ]

  // Estados
  const [query, setQuery] = useState('')
  const [includeGenres, setIncludeGenres] = useState([])
  const [excludeGenres, setExcludeGenres] = useState([])
  const [wishlist, setWishlist] = useState(() => {
    try {
      const raw = localStorage.getItem('gameWishlist:v1')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('gameWishlist:v1', JSON.stringify(wishlist))
    } catch {
      /* ignore */
    }
  }, [wishlist])

  const allGenres = useMemo(() => {
    const s = new Set()
    sampleGames.forEach((g) => g.genres.forEach((x) => s.add(x)))
    return Array.from(s).sort()
  }, [])

  const filtered = useMemo(() => {
    return sampleGames.filter((game) => {
      if (query && !game.title.toLowerCase().includes(query.toLowerCase())) return false
      if (includeGenres.length > 0 && !includeGenres.some((g) => game.genres.includes(g))) return false
      if (excludeGenres.length > 0 && excludeGenres.some((g) => game.genres.includes(g))) return false
      return true
    })
  }, [query, includeGenres, excludeGenres])

  const toggleWishlist = (id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }
  const inWishlist = (id) => wishlist.includes(id)
  const resetFilters = () => { setQuery(''); setIncludeGenres([]); setExcludeGenres([]) }

  return (
    <div className="biblioteca">
      <header>
        <h1>Biblioteca de Juegos</h1>
        <p className="descripcion">Explora tu colección y guarda favoritos.</p>
      </header>

      <div className="busqueda">
        <button>Buscar</button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca por título..."
        />
      </div>

      <details className="filtros">
        <summary>Filtros</summary>
        <div className="contenido-filtros">
          <div className="bloque-filtro">
            <label>Filtrar por género:</label>
            <div className="grupo-botones">
              {allGenres.map((g) => (
                <button
                  key={`inc-${g}`}
                  onClick={() =>
                    setIncludeGenres((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]))
                  }
                  className={includeGenres.includes(g) ? 'activo' : ''}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="bloque-filtro">
            <label>Excluir géneros:</label>
            <div className="grupo-botones">
              {allGenres.map((g) => (
                <button
                  key={`exc-${g}`}
                  onClick={() =>
                    setExcludeGenres((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]))
                  }
                  className={excludeGenres.includes(g) ? 'excluir' : ''}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="acciones-filtros">
            <button onClick={resetFilters}>Reset</button>
            <button onClick={() => setWishlist([])}>Limpiar Wishlist</button>
          </div>
        </div>
      </details>

      <section className="coleccion">
        <h2>Colección</h2>
        <p>
          Mostrando {filtered.length} de {sampleGames.length} juegos
        </p>

        <div className="grid-juegos">
          {filtered.map((game) => (
            <article key={game.id} className="juego">
              <div className="juego-imagen">
                <img src={game.cover} alt={game.title} />
                <button className={`wishlist-btn ${inWishlist(game.id) ? 'activo' : ''}`} onClick={() => toggleWishlist(game.id)}>
                  {inWishlist(game.id) ? '❤️' : '🤍'}
                </button>
              </div>

              <div className="juego-info">
                <h3>{game.title}</h3>
                <p>{game.genres.join(' • ')}</p>
                <div className="acciones-juego">
                  <button>Ver</button>
                  <button onClick={() => toggleWishlist(game.id)}>{inWishlist(game.id) ? 'Quitar' : 'Wishlist'}</button>
                </div>
              </div>
            </article>
          ))}

          {filtered.length === 0 && <div className="sin-resultados">No se encontraron juegos con esos filtros.</div>}
        </div>
      </section>
    </div>
  )
}

import { href } from 'react-router-dom';
import Left_4_Dead_2 from './Portadas/Left_4_Dead_2.webp'
import Fortnite from './Portadas/Fortnite.jpg'
import World_of_Warcraft from './Portadas/World_of_Warcraft.png'
import Hollow_Knight from './Portadas/Hollow_Knight.webp'
import Call_of_Duty from './Portadas/Call_of_Duty.jpg'
import Tetris from './Portadas/Tetris.png'
import Starcraft_2 from './Portadas/Starcraft_2.jpeg'
import Skyrim from './Portadas/Skyrim.webp'
import Headers from '../componentes/componente_General/header'
import React, { useEffect, useMemo, useState } from "react"

// Biblioteca de Juegos - Componente React (single-file)
// Requisitos cumplidos:
// - Portada (cover) para cada juego
// - Vista principal de colección (grid)
// - Filtrado: incluir o excluir géneros, búsqueda por texto
// - Wishlist (guardada en localStorage)
// - Recomendaciones aleatorias

function Biblioteca() {
  // Datos de ejemplo — reemplaza las URLs por tus propias portadas si quieres
  const sampleGames = [
    { id: 1, title: "Left 4 Dead 2", genres: ["Acción", "Aventura", "Horror"], cover: Left_4_Dead_2},
    { id: 2, title: "Fortnite", genres: ["Acción", "Multijugador"], cover: Fortnite },
    { id: 3, title: "World of Warcraft", genres: ["Estrategia", "Simulación"], cover: World_of_Warcraft },
    { id: 4, title: "Hollow Knight", genres: ["Plataformas", "Indie"], cover: Hollow_Knight },
    { id: 5, title: "Call of Duty", genres: ["Acción", "FPS"], cover: Call_of_Duty },
    { id: 6, title: "Tetris", genres: ["Puzzle", "Relax"], cover: Tetris },
    { id: 7, title: "Starcraft 2", genres: ["Estrategia", "Multijugador"], cover: Starcraft_2 },
    { id: 8, title: "Skyrim", genres: ["RPG", "Acción", "Aventura"], cover: Skyrim },
  ];

  // Estado de filtros y búsqueda
  const [query, setQuery] = useState("");
  const [includeGenres, setIncludeGenres] = useState([]);
  const [excludeGenres, setExcludeGenres] = useState([]);

  // Wishlist -> guardado en localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const raw = localStorage.getItem("gameWishlist:v1");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("gameWishlist:v1", JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  // Extraer lista única de géneros
  const allGenres = useMemo(() => {
    const set = new Set();
    sampleGames.forEach((g) => g.genres.forEach((x) => set.add(x)));
    return Array.from(set).sort();
  }, []);

  // Filtrado principal
  const filtered = useMemo(() => {
    return sampleGames.filter((game) => {
      // búsqueda por título
      if (query && !game.title.toLowerCase().includes(query.toLowerCase())) return false;

      // incluir géneros (si hay selecciones, el juego debe contener al menos uno)
      if (includeGenres.length > 0) {
        const ok = includeGenres.some((g) => game.genres.includes(g));
        if (!ok) return false;
      }

      // excluir géneros: si el juego contiene alguno de estos géneros, se filtra fuera
      if (excludeGenres.length > 0) {
        const hasExcluded = excludeGenres.some((g) => game.genres.includes(g));
        if (hasExcluded) return false;
      }

      return true;
    });
  }, [query, includeGenres, excludeGenres]);

  // Wishlist helpers
  const toggleWishlist = (id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const inWishlist = (id) => wishlist.includes(id);

  // Recomendaciones aleatorias (3 juegos que no estén ya en wishlist si es posible)
  const getRandomRecommendations = (count = 3) => {
    const pool = sampleGames.filter((g) => !wishlist.includes(g.id));
    const src = pool.length ? pool : sampleGames; // si todos están en wishlist, usar todo
    const shuffled = [...src].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, src.length));
  };

  const [recommendations, setRecommendations] = useState(() => getRandomRecommendations(3));
  const refreshRecommendations = () => setRecommendations(getRandomRecommendations(3));

  // Interacciones con filtros
  const toggleIncludeGenre = (genre) => {
    setIncludeGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]));
  };
  const toggleExcludeGenre = (genre) => {
    setExcludeGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]));
  };

  const resetFilters = () => {
    setQuery("");
    setIncludeGenres([]);
    setExcludeGenres([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Headers/>
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold">Biblioteca de Juegos</h1>
            <p className="text-sm text-gray-600">Explora tu colección y guarda favoritos.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-gray-500">Wishlist</div>
              <div className="font-medium">{wishlist.length} juego(s)</div>
            </div>
            <button
              onClick={() => {
                // quick clear wishlist
                if (confirm("¿Borrar toda la wishlist?")) setWishlist([]);
              }}
              className="px-3 py-2 bg-white border rounded shadow-sm text-sm"
            >
              Limpiar
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar: filtros */}
          <aside className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold mb-2">Filtros</h2>

            <label className="block text-sm mb-1">Buscar</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca por título..."
              className="w-full px-3 py-2 border rounded mb-3"
            />

            <div className="mb-3">
              <div className="text-sm font-medium mb-1">Filtrar por género</div>
              <div className="flex flex-wrap gap-2">
                {allGenres.map((g) => (
                  <button
                    key={`inc-${g}`}
                    onClick={() => toggleIncludeGenre(g)}
                    className={`px-2 py-1 text-sm rounded border ${includeGenres.includes(g) ? "bg-blue-600 text-white" : "bg-white"}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <div className="text-sm font-medium mb-1">Excluir géneros</div>
              <div className="flex flex-wrap gap-2">
                {allGenres.map((g) => (
                  <button
                    key={`exc-${g}`}
                    onClick={() => toggleExcludeGenre(g)}
                    className={`px-2 py-1 text-sm rounded border ${excludeGenres.includes(g) ? "bg-red-600 text-white" : "bg-white"}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={resetFilters} className="px-3 py-2 bg-gray-100 rounded">Reset</button>
              <button onClick={() => { setIncludeGenres([]); setExcludeGenres([]); setQuery(""); }} className="px-3 py-2 bg-gray-100 rounded">Borrar</button>
            </div>

            <hr className="my-4" />

            {/* Wishlist preview */}
            <div>
              <h3 className="font-medium mb-2">Wishlist</h3>
              {wishlist.length === 0 ? (
                <div className="text-sm text-gray-500">No hay juegos en la wishlist.</div>
              ) : (
                <ul className="space-y-2">
                  {wishlist.map((id) => {
                    const g = sampleGames.find((x) => x.id === id);
                    if (!g) return null;
                    return (
                      <li key={`wl-${id}`} className="flex items-center gap-3">
                        <img src={g.cover} alt="cover" className="w-10 h-12 object-cover rounded" />
                        <div className="flex-1 text-sm">{g.title}</div>
                        <button onClick={() => toggleWishlist(id)} className="text-red-500 text-sm">Quitar</button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <hr className="my-4" />

          </aside>

          {/* Main collection view */}
          <section className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Colección</h2>
                <p className="text-sm text-gray-600">Mostrando {filtered.length} de {sampleGames.length} juegos</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500">Vista</div>
                <button className="px-2 py-1 border rounded">Grid</button>
                <button className="px-2 py-1 border rounded">Lista</button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filtered.map((game) => (
                <article key={game.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="relative">
                    <img src={game.cover} alt={`${game.title} cover`} className="w-full h-48 object-cover" />
                    <button
                      onClick={() => toggleWishlist(game.id)}
                      className={`absolute top-2 right-2 px-2 py-1 rounded ${inWishlist(game.id) ? "bg-red-500 text-white" : "bg-white"}`}
                    >
                      {inWishlist(game.id) ? "❤️" : "🤍"}
                    </button>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm">{game.title}</h3>
                    <div className="text-xs text-gray-500">{game.genres.join(" • ")}</div>
                    <div className="mt-3 flex gap-2">
                      <button className="flex-1 px-2 py-1 border rounded text-sm">Ver</button>
                      <button onClick={() => toggleWishlist(game.id)} className="px-3 py-1 border rounded text-sm">{inWishlist(game.id) ? "Quitar" : "Wishlist"}</button>
                    </div>
                  </div>
                </article>
              ))}

              {filtered.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-8">No se encontraron juegos con esos filtros.</div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Biblioteca
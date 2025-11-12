import { useState, useEffect } from 'react'

function Noticies() {
  const [noticias, setNoticias] = useState([])
  const [nueva, setNueva] = useState({ encabezado: '', texto: '', imagen: '' })

  // Obtener todas las noticias
  useEffect(() => {
    fetch('http://localhost:3000/api/noticias')
      .then((res) => res.json())
      .then((data) => setNoticias(data))
      .catch((err) => console.error(err))
  }, [])

  // Agregar una noticia
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:3000/api/noticias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nueva),
    })
    const data = await res.json()
    setNoticias([data, ...noticias]) 
    setNueva({ encabezado: '', texto: '', imagen: '' })
  }
  return (
    <section className="">
      <h2 className="">🕯 Noticias del Reino</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="">
        <input
          className=""
          type="text"
          placeholder="Encabezado..."
          value={nueva.encabezado}
          onChange={(e) => setNueva({ ...nueva, encabezado: e.target.value })}
        />
        <textarea
          className=""
          placeholder="Texto..."
          value={nueva.texto}
          onChange={(e) => setNueva({ ...nueva, texto: e.target.value })}
        />
        <input
          className=""
          type="text"
          placeholder="URL de imagen (opcional)"
          value={nueva.imagen}
          onChange={(e) => setNueva({ ...nueva, imagen: e.target.value })}
        />
        <button className="">Publicar Noticia</button>
      </form>

      {/* Lista de noticias */}
      <div className="">
        {noticias.map((n) => (
          <article key={n._id} className="">
            {n.imagen && <img src={n.imagen} alt="" className="" />}
            <h3 className="">{n.encabezado}</h3>
            <p className="">{n.texto}</p>
            <p className="">📜 {new Date(n.fecha).toLocaleDateString()}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Noticies

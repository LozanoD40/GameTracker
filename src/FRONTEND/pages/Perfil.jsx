import React, { useEffect, useState } from 'react'
import Headers from '../componentes/componente_General/header'

// 🔗 Función auxiliar para traer datos del backend
const getUserProfile = async (userId) => {
  try {
    const res = await fetch(`http://localhost:4000/api/users/${userId}`)
    if (!res.ok) throw new Error('Error al obtener el perfil')
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

function PerfilAventurero() {
  const [datos, setDatos] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // ⚙️ Aquí pones el ID real del usuario autenticado
    const userId = '6723b7a3c9a3b1cfa4e8d1f2' // Ejemplo temporal

    getUserProfile(userId)
      .then((data) => {
        if (data) setDatos(data)
        else setError('No se encontraron datos del perfil.')
      })
      .catch(() => setError('Error al cargar los datos del usuario.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="cargando-texto">⚙️ Cargando perfil...</p>
  if (error) return <p className="error-texto">❌ {error}</p>
  if (!datos) return null

  return (
    <div className="perfil-aventurero-cuerpo">
      <Headers />

      {/* ======================= ENCABEZADO ======================= */}
      <header className="perfil-encabezado metal-forjado">
        <div className="avatar-marco">
          <img
            src={datos.avatar || '/ruta/a/tu/avatar.jpg'}
            alt="Retrato del Héroe"
            className="avatar-retrato"
          />
          <div className="rango-banda pergamino-texto">{datos.rango}</div>
        </div>

        <div className="datos-principales">
          <h1 className="nombre-heroe titulo-gotico">{datos.nombre}</h1>

          <div className="nivel-info">
            <span className="etiqueta-metal">Nivel:</span>
            <span className="nivel-valor gema-oro">{datos.nivel}</span>
            <div className="barra-experiencia madera-oscura">
              <div
                className="barra-progreso pocion-verde"
                style={{ width: `${datos.experiencia}%` }}
                title={`${datos.experiencia}% de experiencia al siguiente nivel`}
              ></div>
            </div>
          </div>

          <p className="estatus-actual pergamino-texto">
            <span className="etiqueta-metal">Estatus:</span> {datos.estatus}
          </p>
        </div>

        <button className="boton-ajustes escudo-icono">
          ⚙️ Ajustes de Pertenencias (Ajustes)
        </button>
      </header>

      {/* ======================= CUERPO DEL PERFIL ======================= */}
      <main className="perfil-contenido">
        {/* 📜 Crónica Personal */}
        <section className="seccion-bloque pergamino-antiguo">
          <h2 className="seccion-titulo cinta-herladica">
            📜 Crónica Personal (Biografía)
          </h2>
          <p className="biografia-texto">{datos.biografia}</p>
        </section>

        {/* 🏆 Logros */}
        <section className="seccion-bloque madera-tallada">
          <h2 className="seccion-titulo cinta-herladica">
            🏆 Hazañas Recientes (Logros)
          </h2>
          <ul className="lista-logros">
            {datos.logrosRecientes?.map((logro, index) => (
              <li key={index} className="logro-item">
                <span className="logro-icono">{logro.icono}</span>
                <span className="logro-desc pergamino-texto">
                  {logro.descripcion}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* 📚 Juegos */}
        <section className="seccion-bloque metal-forjado">
          <h2 className="seccion-titulo cinta-herladica">
            📚 Tomos de Aventura (Mis Juegos)
          </h2>
          <ul className="lista-juegos">
            {datos.juegos?.map((juego, index) => (
              <li key={index} className="juego-item">
                <span className="juego-nombre">{juego.titulo}</span>
                <span className="juego-horas gema-oro">
                  {juego.horas} Horas de Servicio
                </span>
              </li>
            ))}
            <li className="ver-todos-juegos">
              <a href="/mis-juegos">Ver el Archivo Completo (Mis Juegos)</a>
            </li>
          </ul>
        </section>

        {/* 🤝 Amigos */}
        <section className="seccion-bloque pergamino-antiguo">
          <h2 className="seccion-titulo cinta-herladica">
            🤝 Compañeros de Gremio (Amigos)
          </h2>
          <div className="amigos-resumen">
            <span className="amigos-total">
              Tienes **145** aliados en tu Hermandad.
            </span>
            <a href="/amigos" className="boton-gremio">
              Gestionar Hermandad (Amigos)
            </a>
          </div>
        </section>

        {/* 🖼️ Trofeos */}
        <section className="seccion-bloque madera-tallada">
          <h2 className="seccion-titulo cinta-herladica">
            🖼️ Sala de Trofeos (Expositor)
          </h2>
          <div className="expositor-contenido">
            <p className="texto-losa">
              Aquí yace la Losa de la Obra Maestra: [Nombre de la Obra de Arte]
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default PerfilAventurero

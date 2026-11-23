import { useState } from 'react'
import './App.css'

function App() {
  const [perfil, setPerfil] = useState({
    edad: '',
    nivel_educativo: '',
    estado: '',
    intereses: [],
    meta: ''
  })

  const [ruta, setRuta] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)
  const [vista, setVista] = useState('inicio')
  const [esEjemplo, setEsEjemplo] = useState(false)

  const interesesOpciones = [
    'Tecnología', 'Arte y diseño', 'Negocios', 'Ciencias',
    'Educación', 'Salud', 'Emprendimiento', 'Música',
    'Deportes', 'Medio ambiente'
  ]

  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

  const toggleInteres = (interes) => {
    setPerfil(prev => ({
      ...prev,
      intereses: prev.intereses.includes(interes)
        ? prev.intereses.filter(i => i !== interes)
        : [...prev.intereses, interes]
    }))
  }

  const formularioCompleto = () => {
    return (
      perfil.edad &&
      Number(perfil.edad) > 0 &&
      perfil.nivel_educativo &&
      perfil.estado &&
      perfil.intereses.length > 0 &&
      perfil.meta.trim()
    )
  }

  const generarRuta = async (event) => {
    event.preventDefault()
    setError(null)
    setCargando(true)
    setRuta(null)
    setEsEjemplo(false)

    try {
      const respuesta = await fetch(`${API_URL}/generar-ruta`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...perfil,
          edad: parseInt(perfil.edad, 10)
        })
      })

      if (!respuesta.ok) {
        throw new Error('El servidor no pudo generar tu ruta.')
      }

      const datos = await respuesta.json()

      if (!datos.ruta) {
        throw new Error('La respuesta del servidor llegó vacía.')
      }

      setRuta(datos.ruta)
      setVista('resultado')
    } catch (err) {
      console.error('Error al generar la ruta:', err)
      setError('No pudimos conectar con Rumbo en este momento. Comprueba que el servidor esté activo e inténtalo de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  const mostrarEjemplo = () => {
    setRuta(`TU OBJETIVO
Explorar oportunidades para iniciar una carrera en tecnología.

BECAS Y APOYOS
• Consulta convocatorias de becas de universidades públicas y privadas.
• Revisa los programas de apoyo educativo disponibles en tu estado.
• Investiga los apoyos de formación para jóvenes de tu comunidad.

CURSOS Y FORMACIÓN
• Fundamentos de programación: construye una base en lógica y código.
• Desarrollo web: aprende HTML, CSS y JavaScript.
• Inglés: fortalece una habilidad útil para continuar aprendiendo.

SIGUIENTES PASOS
1. Define el área tecnológica que más te interesa.
2. Compara requisitos y fechas de las convocatorias.
3. Elige un curso introductorio y establece un horario de estudio.

RECOMENDACIÓN
Empieza con una meta pequeña y medible. Revisa siempre los requisitos y la vigencia de cada oportunidad en su sitio oficial.`)
    setEsEjemplo(true)
    setVista('resultado')
    setError(null)
  }

  const volverAlInicio = () => {
    setRuta(null)
    setEsEjemplo(false)
    setError(null)
    setVista('inicio')
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" onClick={volverAlInicio} aria-label="Rumbo, inicio">
          <span className="brand-mark">r.</span>
          <span>rumbo</span>
        </a>

        <nav className="main-nav" aria-label="Navegación principal">
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#crear-ruta">Tu ruta</a>
        </nav>

        <button className="header-cta" type="button" onClick={() => setVista('formulario')}>
          Comenzar <span aria-hidden="true">↗</span>
        </button>
      </header>

      {vista === 'inicio' && (
        <main id="inicio">
          <section className="hero-section">
            <div className="hero-copy">
              <span className="eyebrow"><span className="status-dot" /> ORIENTACIÓN PERSONALIZADA</span>
              <h1>Tu futuro no tiene que ser <span>un camino a ciegas.</span></h1>
              <p className="hero-description">
                Encuentra oportunidades educativas y profesionales que conectan con tus intereses, tu contexto y lo que quieres lograr.
              </p>
              <div className="hero-actions">
                <button className="button-primary" type="button" onClick={() => setVista('formulario')}>
                  Encuentra tu rumbo <span aria-hidden="true">→</span>
                </button>
                <button className="button-text" type="button" onClick={mostrarEjemplo}>
                  Explorar un ejemplo <span aria-hidden="true">↗</span>
                </button>
              </div>
              <div className="hero-note">
                <span className="note-icon">✳</span>
                <span>Una ruta pensada a partir de quién eres y hacia dónde quieres ir.</span>
              </div>
            </div>

            <div className="hero-visual" aria-label="Vista previa ilustrativa de una ruta personalizada">
              <div className="visual-topline">
                <span>VISTA PREVIA</span>
                <span className="visual-live"><i /> RUTA PERSONALIZADA</span>
              </div>
              <div className="preview-heading">
                <span className="preview-kicker">TU SIGUIENTE CAPÍTULO</span>
                <h2>Hay más de un camino para llegar.</h2>
                <p>Descubre posibilidades y conviértelas en próximos pasos.</p>
              </div>
              <div className="preview-route">
                <div className="route-line" />
                <div className="preview-step">
                  <span className="step-number">01</span>
                  <div><strong>Conoce tus opciones</strong><small>Explora áreas que conectan contigo</small></div>
                  <span className="step-check">✓</span>
                </div>
                <div className="preview-step active">
                  <span className="step-number">02</span>
                  <div><strong>Encuentra oportunidades</strong><small>Becas, cursos y experiencias</small></div>
                  <span className="step-arrow">↗</span>
                </div>
                <div className="preview-step">
                  <span className="step-number">03</span>
                  <div><strong>Da el siguiente paso</strong><small>Avanza con una dirección clara</small></div>
                  <span className="step-lock">○</span>
                </div>
              </div>
              <div className="preview-footer"><span>RUMBO / 001</span><span>HECHO PARA AVANZAR ↗</span></div>
              <div className="visual-orbit orbit-one" />
              <div className="visual-orbit orbit-two" />
            </div>
          </section>

          <section className="value-strip" id="como-funciona">
            <div><span className="value-index">01 / PERFIL</span><strong>Primero, te conocemos.</strong><p>Cuéntanos tus intereses y objetivos.</p></div>
            <div><span className="value-index">02 / EXPLORACIÓN</span><strong>Después, exploramos.</strong><p>Identificamos opciones para tu contexto.</p></div>
            <div><span className="value-index">03 / DIRECCIÓN</span><strong>Y trazamos tu ruta.</strong><p>Organizamos ideas en próximos pasos.</p></div>
          </section>

          <section className="closing-cta" id="crear-ruta">
            <div><span className="eyebrow">EL PRIMER PASO ES TUYO</span><h2>¿A dónde te gustaría llegar?</h2></div>
            <button className="button-primary" type="button" onClick={() => setVista('formulario')}>Crear mi perfil <span aria-hidden="true">→</span></button>
          </section>
        </main>
      )}

      {vista === 'formulario' && (
        <main className="workspace">
          <button className="back-link" type="button" onClick={volverAlInicio}>← Volver al inicio</button>
          <div className="workspace-heading">
            <span className="eyebrow">PASO 01 / TU PERFIL</span>
            <h1>Empecemos por <span>conocerte.</span></h1>
            <p>Comparte un poco sobre ti. Con esta información podremos orientar mejor tu búsqueda.</p>
          </div>

          <form className="profile-form" onSubmit={generarRuta}>
            <div className="form-section-title"><span>01</span><div><strong>Tu contexto</strong><small>Información general para encontrar opciones relevantes.</small></div></div>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="edad">¿Cuántos años tienes?</label>
                <input id="edad" type="number" min="1" max="100" placeholder="Ej. 20" value={perfil.edad} onChange={e => setPerfil({...perfil, edad: e.target.value})} required />
              </div>
              <div className="field">
                <label htmlFor="nivel">Nivel educativo</label>
                <select id="nivel" value={perfil.nivel_educativo} onChange={e => setPerfil({...perfil, nivel_educativo: e.target.value})} required>
                  <option value="">Selecciona tu nivel</option>
                  <option>Secundaria</option>
                  <option>Preparatoria (cursando o trunca)</option>
                  <option>Preparatoria terminada</option>
                  <option>Universidad (cursando o trunca)</option>
                  <option>Universidad terminada</option>
                  <option>Posgrado</option>
                </select>
              </div>
              <div className="field field-full">
                <label htmlFor="estado">¿En qué estado vives?</label>
                <select id="estado" value={perfil.estado} onChange={e => setPerfil({...perfil, estado: e.target.value})} required>
                  <option value="">Selecciona tu estado</option>
                  {['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'].map(estado => <option key={estado}>{estado}</option>)}
                </select>
              </div>
            </div>

            <div className="form-divider" />
            <div className="form-section-title"><span>02</span><div><strong>Lo que te mueve</strong><small>Selecciona una o más áreas que te interesen.</small></div></div>
            <div className="interest-list">
              {interesesOpciones.map(interes => (
                <button key={interes} type="button" className={`interest-chip ${perfil.intereses.includes(interes) ? 'selected' : ''}`} onClick={() => toggleInteres(interes)} aria-pressed={perfil.intereses.includes(interes)}>
                  <span>{perfil.intereses.includes(interes) ? '✓' : '+'}</span>{interes}
                </button>
              ))}
            </div>

            <div className="form-divider" />
            <div className="form-section-title"><span>03</span><div><strong>Tu siguiente meta</strong><small>Cuéntanos qué te gustaría conseguir.</small></div></div>
            <div className="field">
              <label htmlFor="meta">¿Cuál es tu meta principal?</label>
              <textarea id="meta" rows="3" placeholder="Ej. Encontrar una beca para estudiar ingeniería..." value={perfil.meta} onChange={e => setPerfil({...perfil, meta: e.target.value})} required />
            </div>

            {error && <p className="error-message" role="alert">{error}</p>}
            <div className="form-submit">
              <p>Tu información se utilizará para generar una recomendación personalizada.</p>
              <button className="button-primary" type="submit" disabled={!formularioCompleto() || cargando}>
                {cargando ? <><span className="spinner" /> Preparando tu ruta...</> : <>Generar mi ruta <span aria-hidden="true">→</span></>}
              </button>
            </div>
          </form>
        </main>
      )}

      {vista === 'resultado' && ruta && (
        <main className="workspace result-workspace">
          <button className="back-link" type="button" onClick={() => setVista('formulario')}>← Volver a mi perfil</button>
          <div className="result-heading">
            <span className="eyebrow">{esEjemplo ? 'EJEMPLO ILUSTRATIVO' : 'TU PERFIL / RUTA GENERADA'}</span>
            <h1>Tu próximo paso <span>empieza aquí.</span></h1>
            <p>{esEjemplo ? 'Esta es una muestra de cómo Rumbo puede organizar recomendaciones. No representa una búsqueda en tiempo real.' : 'Revisa las recomendaciones y contrasta requisitos y fechas en los sitios oficiales.'}</p>
          </div>
          <section className="result-panel">
            <div className="result-panel-top"><span>RUMBO / TU RUTA</span><span className="result-status"><i /> {esEjemplo ? 'MUESTRA' : 'GENERADA'}</span></div>
            <pre className="route-content">{ruta}</pre>
            <div className="result-disclaimer">Las recomendaciones generadas por IA pueden contener información desactualizada. Verifica siempre los detalles con la institución correspondiente.</div>
          </section>
          <div className="result-actions">
            <button className="button-primary" type="button" onClick={() => { setRuta(null); setEsEjemplo(false); setVista('formulario') }}>Crear otra ruta <span aria-hidden="true">→</span></button>
            <button className="button-text" type="button" onClick={volverAlInicio}>Volver al inicio</button>
          </div>
        </main>
      )}

      <footer className="site-footer">
        <a className="brand footer-brand" href="#inicio" onClick={volverAlInicio}><span className="brand-mark">r.</span><span>rumbo</span></a>
        <span>Una ruta más clara hacia tus oportunidades.</span>
        <span>© {new Date().getFullYear()} RUMBO</span>
      </footer>
    </div>
  )
}

export default App

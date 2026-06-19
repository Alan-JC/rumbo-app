import { useState } from 'react'
import './App.css'

function App() {

  // Estado del perfil del usuario
  const [perfil, setPerfil] = useState({
    edad: '',
    nivel_educativo: '',
    estado: '',
    intereses: [],
    meta: ''
  })

  // Estado para guardar la ruta generada por la IA
  const [ruta, setRuta] = useState(null)

  // Estado para mostrar el loading mientras la IA responde
  const [cargando, setCargando] = useState(false)

  // Estado para mostrar errores si algo falla
  const [error, setError] = useState(null)

  // Opciones de intereses disponibles
  const interesesOpciones = [
    'Tecnología', 'Arte y diseño', 'Negocios', 'Ciencias',
    'Educación', 'Salud', 'Emprendimiento', 'Música',
    'Deportes', 'Medio ambiente'
  ]

  // Agrega o quita un interés de la lista
  const toggleInteres = (interes) => {
    setPerfil(prev => ({
      ...prev,
      intereses: prev.intereses.includes(interes)
        ? prev.intereses.filter(i => i !== interes)
        : [...prev.intereses, interes]
    }))
  }

  // Valida que todos los campos estén llenos antes de enviar
  const formularioCompleto = () => {
    return (
      perfil.edad &&
      perfil.nivel_educativo &&
      perfil.estado &&
      perfil.intereses.length > 0 &&
      perfil.meta
    )
  }

  // Envía el perfil al backend y obtiene la ruta de la IA
  const generarRuta = async () => {
    setError(null)
    setCargando(true)
    setRuta(null)

    try {
      const respuesta = await fetch('http://127.0.0.1:8000/generar-ruta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...perfil,
          edad: parseInt(perfil.edad)
        })
      })

      const datos = await respuesta.json()
      setRuta(datos.ruta)

    } catch (err) {
      console.error('Error:', err)
      setError('Hubo un problema al conectar con el servidor. Intenta de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="container">

      {/* Encabezado */}
      <div className="header">
        <h1>rumbo</h1>
        <p>Descubre las oportunidades que siempre estuvieron ahí para ti</p>
      </div>

      {/* Formulario — solo se muestra si aún no hay ruta generada */}
      {!ruta && (
        <div className="form">

          {/* Edad */}
          <div className="field">
            <label>¿Cuántos años tienes?</label>
            <input
              type="number"
              placeholder="Ej. 22"
              value={perfil.edad}
              onChange={e => setPerfil({...perfil, edad: e.target.value})}
            />
          </div>

          {/* Nivel educativo */}
          <div className="field">
            <label>Nivel educativo</label>
            <select
              value={perfil.nivel_educativo}
              onChange={e => setPerfil({...perfil, nivel_educativo: e.target.value})}
            >
              <option value="">Selecciona...</option>
              <option>Secundaria</option>
              <option>Preparatoria (cursando o trunca)</option>
              <option>Preparatoria terminada</option>
              <option>Universidad (cursando o trunca)</option>
              <option>Universidad terminada</option>
              <option>Posgrado</option>
            </select>
          </div>

          {/* Estado */}
          <div className="field">
            <label>¿En qué estado vives?</label>
            <select
              value={perfil.estado}
              onChange={e => setPerfil({...perfil, estado: e.target.value})}
            >
              <option value="">Selecciona...</option>
              <option>Aguascalientes</option>
              <option>Baja California</option>
              <option>Chiapas</option>
              <option>Chihuahua</option>
              <option>Ciudad de México</option>
              <option>Guanajuato</option>
              <option>Jalisco</option>
              <option>México</option>
              <option>Nuevo León</option>
              <option>Oaxaca</option>
              <option>Puebla</option>
              <option>Veracruz</option>
              <option>Yucatán</option>
            </select>
          </div>

          {/* Intereses */}
          <div className="field">
            <label>Áreas de interés</label>
            <div className="chips">
              {interesesOpciones.map(interes => (
                <button
                  key={interes}
                  className={`chip ${perfil.intereses.includes(interes) ? 'sel' : ''}`}
                  onClick={() => toggleInteres(interes)}
                >
                  {interes}
                </button>
              ))}
            </div>
          </div>

          {/* Meta principal */}
          <div className="field">
            <label>¿Cuál es tu meta principal?</label>
            <input
              type="text"
              placeholder="Ej. Conseguir mi primer empleo en tecnología"
              value={perfil.meta}
              onChange={e => setPerfil({...perfil, meta: e.target.value})}
            />
          </div>

          {/* Mensaje de error si algo falla */}
          {error && <p className="error">{error}</p>}

          {/* Botón — desactivado si el formulario está incompleto o está cargando */}
          <button
            className="btn-primary"
            onClick={generarRuta}
            disabled={!formularioCompleto() || cargando}
          >
            {cargando ? 'Generando tu ruta...' : 'Generar mi ruta →'}
          </button>

        </div>
      )}

      {/* Resultado — se muestra cuando la IA responde */}
      {ruta && (
        <div className="resultado">
          <h2>Tu ruta personalizada</h2>
          <div className="ruta-contenido">
            {ruta}
          </div>
          {/* Botón para volver a empezar */}
          <button
            className="btn-secondary"
            onClick={() => setRuta(null)}
          >
            ← Generar otra ruta
          </button>
        </div>
      )}

    </div>
  )
}

export default App
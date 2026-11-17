<div align="center">

# rumbo

### Una ruta más clara hacia tus oportunidades.

Aplicación web que genera una ruta personalizada de oportunidades educativas y profesionales en México a partir del perfil, intereses y metas de cada persona.

**React · FastAPI · Python · Groq · Llama 3.3**

</div>

---

## ¿Qué hace?

1. Recopila información del perfil: edad, nivel educativo, estado, intereses y meta.
2. Envía esos datos al backend mediante una API.
3. Utiliza un modelo de lenguaje a través de Groq para generar una ruta con becas, cursos, oportunidades laborales o prácticas y una recomendación.

## Estructura

```text
rumbo-app/
├── backend/
│   ├── main.py
│   └── requirements.txt
└── frontend/
    ├── public/
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   └── index.css
    ├── package.json
    └── vite.config.js
```

## Tecnologías

| Área | Tecnología |
|---|---|
| Frontend | React 19, Vite |
| Backend | Python, FastAPI |
| IA generativa | Groq API, Llama 3.3 70B |
| Datos de entrada | Pydantic |

## Ejecución local

### 1. Backend

Desde la carpeta `backend`, instala las dependencias:

```bash
pip install -r requirements.txt
```

Crea un archivo `.env` dentro de `backend` con tu propia clave:

```env
GROQ_API_KEY=tu_clave
```

Inicia la API:

```bash
uvicorn main:app --reload
```

La API estará disponible en `http://127.0.0.1:8000`.

### 2. Frontend

En otra terminal, entra a `frontend`:

```bash
npm install
npm run dev
```

Abre la dirección local que indique Vite.

## Estado del proyecto

Prototipo en desarrollo. La generación de rutas depende de la conexión con Groq y de que el backend esté ejecutándose.

---

<div align="center">
  <sub>Diseñado para convertir metas en próximos pasos.</sub>
</div>

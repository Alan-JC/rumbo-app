# Rumbo — Frontend

Interfaz web de Rumbo, una aplicación que recopila el perfil e intereses de una persona y solicita al backend una ruta personalizada de oportunidades educativas y profesionales.

## Tecnologías

- React 19
- Vite
- JavaScript
- CSS

## Desarrollo local

```bash
npm install
npm run dev
```

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia Vite en modo desarrollo. |
| `npm run build` | Genera la compilación de producción. |
| `npm run lint` | Ejecuta ESLint. |
| `npm run preview` | Previsualiza la compilación. |

## Backend

El frontend envía el perfil a `http://127.0.0.1:8000/generar-ruta`. Inicia primero el backend FastAPI y configura la clave de Groq únicamente en el entorno del servidor.

## Estado

Prototipo en desarrollo. La URL del backend está configurada para desarrollo local y debe ajustarse para un despliegue.

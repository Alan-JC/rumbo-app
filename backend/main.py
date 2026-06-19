from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
import os

# Carga las variables de entorno del archivo .env
load_dotenv()

# Inicializa el cliente de Groq con la API key
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()

# Permite conexiones desde el frontend en desarrollo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de datos que recibimos del frontend
class PerfilUsuario(BaseModel):
    edad: int
    nivel_educativo: str
    estado: str
    intereses: list[str]
    meta: str

@app.get("/")
def root():
    return {"mensaje": "Rumbo API funcionando"}

@app.post("/generar-ruta")
def generar_ruta(perfil: PerfilUsuario):
    prompt = f"""
    Eres un orientador experto en oportunidades educativas y profesionales en México.
    
    El usuario tiene el siguiente perfil:
    - Edad: {perfil.edad} años
    - Nivel educativo: {perfil.nivel_educativo}
    - Estado: {perfil.estado}
    - Intereses: {", ".join(perfil.intereses)}
    - Meta principal: {perfil.meta}
    
    Genera una ruta personalizada con:
    1. 3 becas o apoyos económicos reales y accesibles en México
    2. 3 cursos gratuitos o de bajo costo relevantes para su perfil
    3. 2 oportunidades laborales o de práctica acordes a su nivel
    4. 1 consejo específico para su situación
    
    Sé concreto, menciona nombres reales de programas e instituciones.
    Usa secciones claras con emojis.
    """

    # Llama a la API de Groq y obtiene la respuesta
    respuesta = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )

    return {"ruta": respuesta.choices[0].message.content}
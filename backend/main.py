from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

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

    respuesta = model.generate_content(prompt)
    return {"ruta": respuesta.text}
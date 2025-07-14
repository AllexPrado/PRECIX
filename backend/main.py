

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from .database import get_product_by_barcode, init_db, populate_example_data, get_db_connection, authenticate_admin, get_system_status
from .static_middleware import mount_frontend
from fastapi.responses import FileResponse
import shutil
import os
BANNERS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), 'banners'))
os.makedirs(BANNERS_DIR, exist_ok=True)
import logging


app = FastAPI()

# Endpoint para status do sistema (dashboard admin)
# Endpoint para status do sistema (dashboard admin)
@app.get('/admin/status')
def admin_status():
    return get_system_status()

# Endpoint para upload de banner
@app.post('/admin/banners/upload')
async def upload_banner(file: UploadFile = File(...)):
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in ['.jpg', '.jpeg', '.png', '.gif', '.webp']:
        return {"success": False, "message": "Formato de imagem não suportado."}
    dest_path = os.path.join(BANNERS_DIR, file.filename)
    with open(dest_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"success": True, "filename": file.filename}

# Endpoint para listar banners
@app.get('/admin/banners')
def list_banners():
    files = [f for f in os.listdir(BANNERS_DIR) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp'))]
    return [{"filename": f, "url": f"/admin/banners/{f}"} for f in files]

# Endpoint para servir banner individual
@app.get('/admin/banners/{filename}')
def get_banner(filename: str):
    file_path = os.path.join(BANNERS_DIR, filename)
    if not os.path.exists(file_path):
        return {"success": False, "message": "Arquivo não encontrado."}
    return FileResponse(file_path)

# Endpoint para deletar banner
@app.delete('/admin/banners/{filename}')
def delete_banner(filename: str):
    file_path = os.path.join(BANNERS_DIR, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return {"success": True}
    return {"success": False, "message": "Arquivo não encontrado."}

# Configuração básica de logs
logging.basicConfig(level=logging.INFO)

# Permitir CORS em desenvolvimento (frontend separado)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.on_event('startup')
def startup():
    init_db()
    populate_example_data()



# Endpoint para retornar todos os produtos (para sync do frontend)
@app.get('/product/all')
def get_all_products():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT barcode, name, price, promo FROM products')
    rows = cur.fetchall()
    conn.close()
    return [dict(row) for row in rows]


# Endpoint de login admin
from fastapi import Request
from fastapi.responses import JSONResponse
@app.post('/admin/login')
async def admin_login(request: Request):
    data = await request.json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return JSONResponse(status_code=400, content={"success": False, "message": "Usuário e senha obrigatórios"})
    if authenticate_admin(username, password):
        return {"success": True, "message": "Login realizado com sucesso"}
    else:
        return JSONResponse(status_code=401, content={"success": False, "message": "Usuário ou senha inválidos"})

# Endpoint para buscar produto pelo código de barras
@app.get('/product/{barcode}')
def get_product(barcode: str):
    product = get_product_by_barcode(barcode)
    if not product:
        raise HTTPException(status_code=404, detail='Produto não encontrado')
    return product


# Serve o frontend (build) se existir, mas não impede execução separada
def mount_frontend_if_exists():
    FRONTEND_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'dist'))
    if os.path.exists(FRONTEND_PATH):
        logging.info(f"Montando frontend na pasta: {FRONTEND_PATH}")
        mount_frontend(app, FRONTEND_PATH)
    else:
        logging.warning(f"Pasta {FRONTEND_PATH} não encontrada. Certifique-se de que o build do frontend foi gerado corretamente.")

mount_frontend_if_exists()

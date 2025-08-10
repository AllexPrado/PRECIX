
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import os
import shutil
from jose import jwt
from datetime import datetime
import json

DB_PATH = r'd:\Sonda\Precix\sync\products.db'
BACKUP_META_PATH = r'd:\Sonda\Precix\sync\last_backup.json'
SECRET_KEY = "precix_super_secret_key_2025"
ALGORITHM = "HS256"

router = APIRouter()
security = HTTPBearer()

def require_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get('role') != 'admin':
            raise HTTPException(status_code=403, detail='Acesso restrito a administradores')
    except Exception:
        raise HTTPException(status_code=401, detail='Token inválido ou expirado')

def save_last_backup(action: str):
    meta = {
        "action": action,
        "timestamp": datetime.now().isoformat()
    }
    with open(BACKUP_META_PATH, 'w') as f:
        json.dump(meta, f)

def get_last_backup():
    if not os.path.exists(BACKUP_META_PATH):
        return None
    with open(BACKUP_META_PATH, 'r') as f:
        return json.load(f)

@router.get('/admin/backup')
def download_backup(current_user: str = Depends(require_admin)):
    """Permite download do arquivo atual do banco de dados (apenas admin)."""
    if not os.path.exists(DB_PATH):
        raise HTTPException(status_code=404, detail='Arquivo de banco não encontrado')
    save_last_backup('download')
    return FileResponse(DB_PATH, filename='products.db', media_type='application/octet-stream')

@router.post('/admin/restore')
def restore_backup(file: UploadFile = File(...), current_user: str = Depends(require_admin)):
    """Permite upload de um novo arquivo de banco de dados (apenas admin)."""
    # Salva o arquivo temporariamente
    temp_path = DB_PATH + '.tmp'
    with open(temp_path, 'wb') as f:
        shutil.copyfileobj(file.file, f)
    # Substitui o banco atual
    try:
        os.replace(temp_path, DB_PATH)
        save_last_backup('restore')
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Erro ao restaurar banco: {e}')
    return {"success": True, "message": "Banco restaurado com sucesso."}

@router.get('/admin/last-backup')
def last_backup_info(current_user: str = Depends(require_admin)):
    meta = get_last_backup()
    if not meta:
        return {"action": None, "timestamp": None}
    return meta

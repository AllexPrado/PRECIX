import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

def mount_frontend(app: FastAPI, frontend_dir: str = 'frontend'):
    static_path = os.path.abspath(frontend_dir)
    app.mount("/app", StaticFiles(directory=static_path, html=True), name="frontend")

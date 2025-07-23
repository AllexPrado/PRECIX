# agente.spec - Configuração PyInstaller para empacotar o agente local PRECIX
# Gera executável único para Windows, incluindo GUI e dependências

block_cipher = None

from PyInstaller.utils.hooks import collect_data_files

datas = collect_data_files('.', includes=['config.json'])

a = Analysis([
    'main.py',
    'gui.py'
],
    pathex=['.'],
    datas=datas,
    hiddenimports=[],
    hookspath=[],
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,
          name='AgentePRECIX',
          debug=False,
          strip=False,
          upx=True,
          console=False)

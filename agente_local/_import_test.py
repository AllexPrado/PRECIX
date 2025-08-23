import traceback
import runpy
try:
    runpy.run_path('d:/Sonda/Precix/agente_local/gui.py', run_name='__main__')
    print('RAN_OK')
except Exception:
    traceback.print_exc()

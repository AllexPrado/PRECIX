import sys, traceback
sys.path.insert(0, r'd:\Sonda\Precix\agente_local')
try:
    import gui
    print('Imported gui module OK')
except Exception:
    traceback.print_exc()
    raise

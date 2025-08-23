import sys, inspect, traceback
sys.path.insert(0, r'd:\Sonda\Precix\agente_local')
# monkeypatch QWidget.__init__ to print stack
from PyQt5 import QtWidgets
orig_init = QtWidgets.QWidget.__init__

def patched_init(self, *args, **kwargs):
    print('QWidget.__init__ called. Stack:')
    for fr in inspect.stack()[1:10]:
        print(f'  File "{fr.filename}", line {fr.lineno}, in {fr.function}')
    return orig_init(self, *args, **kwargs)

QtWidgets.QWidget.__init__ = patched_init

try:
    import gui
    print('Imported gui OK')
except Exception:
    traceback.print_exc()
    raise

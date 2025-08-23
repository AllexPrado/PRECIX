import runpy, traceback
from PyQt5 import QtWidgets
orig = QtWidgets.QWidget.__init__

def trap(self, *a, **k):
    app = QtWidgets.QApplication.instance()
    if app is None:
        print('--- WIDGET INIT BEFORE QAPP ---')
        print('Widget class:', type(self))
        traceback.print_stack(limit=6)
    return orig(self, *a, **k)

QtWidgets.QWidget.__init__ = trap
try:
    runpy.run_path('d:/Sonda/Precix/agente_local/gui.py', run_name='__main__')
    print('IMPORT_OK')
except Exception as e:
    print('IMPORT_ERROR', e)
    traceback.print_exc()

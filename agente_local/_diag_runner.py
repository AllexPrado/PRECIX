import sys, traceback
from PyQt5.QtWidgets import QWidget, QApplication
_orig_init = QWidget.__init__

def _patched_init(self, *args, **kwargs):
    if QApplication.instance() is None:
        print('\n--- WIDGET INIT BEFORE QAPP ---', file=sys.stderr)
        print('Widget class:', type(self), file=sys.stderr)
        traceback.print_stack(file=sys.stderr)
    return _orig_init(self, *args, **kwargs)

QWidget.__init__ = _patched_init

import runpy
runpy.run_path('d:/Sonda/Precix/agente_local/gui.py', run_name='__main__')

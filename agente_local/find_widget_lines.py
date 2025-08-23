from pathlib import Path
p = Path(r'D:\Sonda\Precix\agente_local\gui.py')
s = p.read_text(encoding='utf-8')
lines = s.splitlines()
keywords = ['QWidget(', 'QLabel(', 'QPushButton(', 'QTableWidget(', 'QTextEdit(', 'QApplication(']
for i,l in enumerate(lines,1):
    for kw in keywords:
        if kw in l:
            start = max(1, i-5)
            end = min(len(lines), i+2)
            print('---', i, kw)
            for j in range(start, end+1):
                print(f'{j:04}: {lines[j-1]!r}')
            print()
            break

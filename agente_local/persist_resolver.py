import os
import glob
import json

# config path in LOCALAPPDATA
config_path = os.path.join(os.environ.get('LOCALAPPDATA', ''), 'AgentePRECIX', 'config.json')

candidates = []
search_dirs = [
    r'D:\Document\Sonda',
    r'D:\Sonda\Precix\agente_local\dist',
    r'D:\Sonda\Precix\dist',
    r'D:\Sonda\Precix',
    os.getcwd(),
]
patterns = ['pricetab*.txt', 'pricetab*.csv', '*pricetab*.txt', '*pricetab*.csv', 'pricetab*.*']
for d in search_dirs:
    try:
        for pat in patterns:
            for p in glob.glob(os.path.join(d, pat)):
                try:
                    sz = os.path.getsize(p)
                except Exception:
                    sz = 0
                candidates.append((p, sz))
    except Exception:
        pass

# Also search recursive in D:\Document and D:\Sonda
for base in [r'D:\Document', r'D:\Sonda']:
    for root, dirs, files in os.walk(base):
        for f in files:
            if 'pricetab' in f.lower():
                p = os.path.join(root, f)
                try:
                    sz = os.path.getsize(p)
                except Exception:
                    sz = 0
                candidates.append((p, sz))

candidates = [c for c in candidates if c[1] > 0]
if not candidates:
    print('No non-empty candidates found')
else:
    # pick largest
    candidates.sort(key=lambda x: x[1], reverse=True)
    chosen = candidates[0][0]
    print('Chosen candidate:', chosen, 'size=', candidates[0][1])
    # write into config
    existing = {}
    if os.path.exists(config_path):
        try:
            with open(config_path, 'r', encoding='utf-8') as fh:
                existing = json.load(fh) or {}
        except Exception:
            existing = {}
    existing['arquivo_entrada'] = chosen
    try:
        with open(config_path, 'w', encoding='utf-8') as fh:
            json.dump(existing, fh, indent=2)
        print('Wrote arquivo_entrada to config:', config_path)
    except Exception as e:
        print('Failed to write config:', e)

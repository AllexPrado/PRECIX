import os,sys
sys.path.append(r'D:\Sonda\Precix\agente_local')
import main
cfg=main.load_config()
arquivo_cfg = cfg.get('arquivo_origem') or cfg.get('arquivo_entrada') or cfg.get('arquivo_entrada_arquivo') or cfg.get('arquivo_entrada_path') or ''
print('config value:', arquivo_cfg)

def resolve_input_file(cfg_value):
    if not cfg_value:
        return None
    cand = os.path.normpath(cfg_value)
    try:
        if os.path.exists(cand) and os.path.getsize(cand) > 0:
            return cand
    except Exception:
        pass
    base = os.path.dirname(cand) or os.getcwd()
    name = os.path.basename(cand)
    alt_names = [name, name.replace('.txt', '_entrada.txt'), name.replace('.txt', 'entrada.txt'), 'pricetab_entrada.txt', 'pricetab.txt']
    for an in alt_names:
        p = os.path.join(base, an)
        try:
            if os.path.exists(p) and os.path.getsize(p) > 0:
                return p
        except Exception:
            continue
    try:
        if os.path.isdir(cand):
            for fn in os.listdir(cand):
                if fn.lower().startswith('pricetab') and fn.lower().endswith('.txt'):
                    p = os.path.join(cand, fn)
                    try:
                        if os.path.getsize(p) > 0:
                            return p
                    except Exception:
                        continue
    except Exception:
        pass
    common = [os.path.join(os.path.dirname(__file__), '..', 'sync', name), os.path.join(os.path.dirname(__file__), '..', 'backend', name), os.path.join(os.getcwd(), name)]
    for p in common:
        p = os.path.normpath(p)
        try:
            if os.path.exists(p) and os.path.getsize(p) > 0:
                return p
        except Exception:
            continue
    return None

print('resolved:', resolve_input_file(arquivo_cfg))

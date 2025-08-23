import os
import sys
sys.path.append(os.path.dirname(__file__))
import main

def test_arquivo():
    cfg = main.load_config()
    arquivo = cfg.get('arquivo_origem') or cfg.get('arquivo_entrada') or cfg.get('arquivo_entrada_arquivo') or ''
    print(f"Config arquivo de entrada: {arquivo}")
    if not arquivo or not os.path.exists(arquivo):
        print("Arquivo de entrada não existe ou não configurado.")
        return
    with open(arquivo, 'r', encoding='utf-8', errors='ignore') as f:
        lines = [ln.rstrip('\n') for ln in f if ln.strip()]
    print(f"Linhas lidas do arquivo de entrada: {len(lines)}")
    layout = cfg.get('arquivo_layout') or 'barcode|name|price'
    sep = cfg.get('arquivo_separador') or cfg.get('arquivo_separador_custom') or '|'
    cols = [c.strip() for c in layout.split(sep)]
    dados_temp = []
    for i, line in enumerate(lines):
        parts = [p for p in line.split(sep)]
        if i == 0 and [p.strip().lower() for p in parts] == [c.lower() for c in cols]:
            continue
        row = {}
        for idx, col in enumerate(cols):
            row[col] = parts[idx].strip() if idx < len(parts) else ''
        dados_temp.append(row)
    print('Exemplo de 3 linhas parseadas:', dados_temp[:3])
    out = os.path.join(os.path.dirname(__file__), 'diagnostic_pricetab_arquivo.txt')
    main.gerar_arquivo_precos(dados_temp, out, incluir_cabecalho=True)
    print('Arquivo gerado em', out, 'tamanho bytes =', os.path.getsize(out) if os.path.exists(out) else 'NA')
    if os.path.exists(out):
        with open(out, 'r', encoding='utf-8', errors='ignore') as f:
            print('Primeiras 10 linhas do gerado:')
            for _ in range(10):
                ln = f.readline()
                if not ln:
                    break
                print(ln.rstrip('\n'))


def test_db():
    cfg = main.load_config()
    print('Configuracao DB:', cfg.get('db_nome') or cfg.get('db_path') or cfg.get('db_file'))
    dados = main.buscar_dados_do_banco(cfg)
    print('Registros lidos do DB:', len(dados) if isinstance(dados, list) else dados)
    if dados:
        out = os.path.join(os.path.dirname(__file__), 'diagnostic_pricetab_db.txt')
        main.gerar_arquivo_precos(dados, out, incluir_cabecalho=True)
        print('Arquivo gerado em', out, 'tamanho bytes =', os.path.getsize(out) if os.path.exists(out) else 'NA')
        if os.path.exists(out):
            with open(out, 'r', encoding='utf-8', errors='ignore') as f:
                print('Primeiras 10 linhas do gerado (DB):')
                for _ in range(10):
                    ln = f.readline()
                    if not ln:
                        break
                    print(ln.rstrip('\n'))

if __name__ == '__main__':
    print('=== Teste Arquivo ===')
    test_arquivo()
    print('\n=== Teste DB ===')
    test_db()

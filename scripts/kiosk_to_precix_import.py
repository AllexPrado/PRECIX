import sqlite3
import csv

# Força leitura de TEXT como bytes
sqlite3.register_converter('TEXT', lambda b: b)

# Script para importar produtos do banco do Kiosk (produto.db) para o banco PRECIX (exemplo: tabela products)
# e também gerar um arquivo TXT de teste com os dados reais do Kiosk

def importar_kiosk_para_precix(db_kiosk_path, db_precix_path):
    conn_kiosk = sqlite3.connect(db_kiosk_path, detect_types=sqlite3.PARSE_DECLTYPES)
    conn_precix = sqlite3.connect(db_precix_path)
    cur_kiosk = conn_kiosk.cursor()
    cur_precix = conn_precix.cursor()

    # Ajuste conforme o schema do PRECIX
    cur_precix.execute('DELETE FROM products')
    conn_precix.commit()

    cur_kiosk.execute('SELECT CodigoAutomacao, DescCompleta, PrecoVenda FROM PRODUTO')
    produtos = cur_kiosk.fetchall()
    for codigo, descricao, preco in produtos:
        # Corrige encoding e caracteres inválidos
        if isinstance(descricao, bytes):
            try:
                descricao = descricao.decode('latin1')
            except Exception:
                descricao = descricao.decode('latin1', errors='replace')
        else:
            try:
                descricao = str(descricao).encode('latin1').decode('utf-8', errors='replace')
            except Exception:
                descricao = str(descricao)
        descricao = descricao.replace('\ufffd', '?')  # Substitui caracteres inválidos
        preco_float = float(preco) if preco else 0.0  # <-- Corrigido: não dividir por 100
        cur_precix.execute('INSERT INTO products (barcode, name, price) VALUES (?, ?, ?)', (codigo, descricao, preco_float))
    conn_precix.commit()
    conn_kiosk.close()
    conn_precix.close()
    print('Importação concluída.')

def exportar_kiosk_para_txt(db_kiosk_path, txt_path):
    conn = sqlite3.connect(db_kiosk_path, detect_types=sqlite3.PARSE_DECLTYPES)
    cur = conn.cursor()
    cur.execute('SELECT CodigoAutomacao, DescCompleta, PrecoVenda FROM PRODUTO')
    produtos = cur.fetchall()
    with open(txt_path, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f, delimiter='|', lineterminator='\n')
        for codigo, descricao, preco in produtos:
            # Corrige encoding e caracteres inválidos
            if isinstance(descricao, bytes):
                try:
                    descricao = descricao.decode('latin1')
                except Exception:
                    descricao = descricao.decode('latin1', errors='replace')
            else:
                try:
                    descricao = str(descricao).encode('latin1').decode('utf-8', errors='replace')
                except Exception:
                    descricao = str(descricao)
            descricao = descricao.replace('\ufffd', '?')
            preco_str = f"{float(preco)/100:.2f}".replace('.', ',') if preco else '0,00'
            writer.writerow([codigo, descricao, preco_str, ''])
    conn.close()
    print('Exportação TXT concluída.')

def exportar_precix_para_txt(db_precix_path, txt_path):
    conn = sqlite3.connect(db_precix_path)
    cur = conn.cursor()
    cur.execute('SELECT barcode, name, price, promo FROM products')
    produtos = cur.fetchall()
    with open(txt_path, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f, delimiter=';', lineterminator='\n')
        for codigo, descricao, preco, promo in produtos:
            # Garante que o preço está em reais e com duas casas decimais
            preco_float = float(preco)
            preco_str = f"{preco_float:.2f}".replace('.', ',') if preco_float else '0,00'
            writer.writerow([codigo, descricao, preco_str, promo if promo else ''])
    conn.close()
    print('Exportação TXT concluída.')

if __name__ == '__main__':
    # importar_kiosk_para_precix(r'd:\Sonda\Precix\Kiosk\Precos\produto.db', r'd:\Sonda\Precix\sync\products.db')
    exportar_precix_para_txt(r'd:\Sonda\Precix\sync\products.db', r'd:\Sonda\Precix\produtos.txt')

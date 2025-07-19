import sqlite3
import csv

# Exporta produtos do banco SQLite do PRECIX para o formato do banco do Kiosk (tabela PRODUTO)
# e/ou para TXT compatível

def exportar_para_kiosk_sqlite(db_precix_path, db_kiosk_path):
    # Ajuste os nomes dos campos conforme o schema do PRECIX
    conn_precix = sqlite3.connect(db_precix_path)
    conn_kiosk = sqlite3.connect(db_kiosk_path)
    cur_precix = conn_precix.cursor()
    cur_kiosk = conn_kiosk.cursor()

    # Exemplo: supondo que o PRECIX tem tabela 'products' com 'code', 'name', 'price'
    cur_precix.execute('SELECT code, name, price FROM products')
    produtos = cur_precix.fetchall()

    # Limpa a tabela PRODUTO do banco do Kiosk
    cur_kiosk.execute('DELETE FROM PRODUTO')
    conn_kiosk.commit()

    for codigo, descricao, preco in produtos:
        cur_kiosk.execute('''
            INSERT INTO PRODUTO (CodigoAutomacao, DescCompleta, PrecoVenda)
            VALUES (?, ?, ?)
        ''', (codigo, descricao, int(float(preco)*100)))  # PrecoVenda é INTEGER (centavos)
    conn_kiosk.commit()
    conn_precix.close()
    conn_kiosk.close()
    print('Exportação concluída.')

# Exporta para TXT compatível

def exportar_para_txt(db_precix_path, txt_path):
    conn = sqlite3.connect(db_precix_path)
    cur = conn.cursor()
    cur.execute('SELECT code, name, price FROM products')
    produtos = cur.fetchall()
    with open(txt_path, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f, delimiter='|', lineterminator='\n')
        for codigo, descricao, preco in produtos:
            preco_str = f"{float(preco):.2f}".replace('.', ',')
            writer.writerow([codigo, descricao, preco_str, ''])
    conn.close()
    print('Exportação TXT concluída.')

if __name__ == '__main__':
    # Exemplo de uso:
    # exportar_para_kiosk_sqlite('precix.db', 'produto.db')
    # exportar_para_txt('precix.db', 'pricetab_exportado.txt')
    pass

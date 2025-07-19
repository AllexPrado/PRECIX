import csv

# Parser para importar e exportar arquivos TXT no formato do Kiosk
# Formato: CODIGO|DESCRICAO|PRECO|

def importar_txt(caminho):
    produtos = []
    with open(caminho, encoding='utf-8') as f:
        reader = csv.reader(f, delimiter='|')
        for row in reader:
            if len(row) < 3:
                continue
            codigo = row[0].strip()
            descricao = row[1].strip()
            preco = row[2].replace(',', '.').strip()
            if not codigo or not descricao or not preco:
                continue
            produtos.append({
                'codigo': codigo,
                'descricao': descricao,
                'preco': float(preco)
            })
    return produtos

def exportar_txt(produtos, caminho):
    with open(caminho, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f, delimiter='|', lineterminator='\n')
        for p in produtos:
            preco_str = f"{p['preco']:.2f}".replace('.', ',')
            writer.writerow([p['codigo'], p['descricao'], preco_str, ''])

if __name__ == '__main__':
    # Exemplo de uso
    produtos = importar_txt('d:/Sonda/Precix/Kiosk/Precos/pricetab.txt')
    print(f"Produtos importados: {len(produtos)}")
    exportar_txt(produtos, 'd:/Sonda/Precix/Kiosk/Precos/pricetab_exportado.txt')
    print("Exportação concluída.")

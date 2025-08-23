import sys
"""
Interface gráfica (GUI) do Agente Local PRECIX
Este arquivo deve ser executado apenas para interface, nunca importar ou executar loops do serviço.
"""

import sys
import os
import json
import shutil
import requests
import ftplib
import socket
from PyQt5.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QHBoxLayout, QPushButton,
    QTableWidget, QTableWidgetItem, QLineEdit, QLabel, QMessageBox,
    QComboBox, QFileDialog, QCheckBox, QTabWidget, QTextEdit
)
from PyQt5.QtGui import QIcon, QPixmap, QTextCursor
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QIcon, QPixmap
from PyQt5.QtCore import Qt

CONFIG_PATH = os.path.join(os.environ.get('LOCALAPPDATA', os.getcwd()), 'AgentePRECIX', 'config.json')
os.makedirs(os.path.dirname(CONFIG_PATH), exist_ok=True)

# Função para carregar configuração

def load_config():
    try:
        if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                return json.load(f)
        else:
            # Se não existir, tenta copiar config.json padrão do diretório do app (dist ou raiz do instalador)
            possible_paths = [
                os.path.join(os.path.dirname(sys.argv[0]), 'config.json'),
                os.path.join(os.path.dirname(__file__), 'config.json')
            ]
            for default_path in possible_paths:
                if os.path.exists(default_path):
                    import shutil
                    shutil.copy(default_path, CONFIG_PATH)
                    with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                        return json.load(f)
            return {"lojas": [], "equipamentos": []}
    except Exception:
        return {"lojas": [], "equipamentos": []}
        
class LojaWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)
        self.table = QTableWidget()
        self.layout.addWidget(self.table)
        self.load_lojas()
        self.add_form()
        self.add_buttons()

    def load_lojas(self):
        # Exibe todas as lojas vinculadas no config.json
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
            lojas_vinculadas = config.get('lojas_vinculadas', [])
        except Exception:
            lojas_vinculadas = []
        self.table.setRowCount(len(lojas_vinculadas))
        self.table.setColumnCount(2)
        self.table.setHorizontalHeaderLabels(['Código', 'Nome'])
        for i, loja in enumerate(lojas_vinculadas):
            self.table.setItem(i, 0, QTableWidgetItem(str(loja.get('codigo', ''))))
            self.table.setItem(i, 1, QTableWidgetItem(loja.get('name', '')))

    def add_form(self):
        self.form_layout = QHBoxLayout()
        self.lojas_combo = QComboBox()
        self.lojas_combo.setEditable(False)
        self.refresh_lojas_backend()
        self.form_layout.addWidget(QLabel('Vincular Loja:'))
        self.form_layout.addWidget(self.lojas_combo)
        self.layout.addLayout(self.form_layout)
        self.set_combo_to_vinculada()

    def set_combo_to_vinculada(self):
        # Não seleciona automaticamente, pois pode haver múltiplas lojas
        pass

    def refresh_lojas_backend(self):
        self.lojas_combo.clear()
        try:
            response = requests.get('http://localhost:8000/admin/stores', timeout=5)
            if response.status_code == 200:
                lojas = response.json()
                for loja in lojas:
                    display = f"{loja.get('codigo', loja.get('id'))} - {loja.get('name')}"
                    self.lojas_combo.addItem(display, loja)
            else:
                self.lojas_combo.addItem('Erro ao buscar lojas', None)
        except Exception:
            self.lojas_combo.addItem('Falha de conexão', None)
        self.set_combo_to_vinculada()

    def add_buttons(self):
        self.btn_layout = QHBoxLayout()
        self.vincular_btn = QPushButton('Adicionar Loja Vinculada')
        self.vincular_btn.clicked.connect(self.vincular_loja)
        self.btn_layout.addWidget(self.vincular_btn)
        self.remover_btn = QPushButton('Remover Loja Selecionada')
        self.remover_btn.clicked.connect(self.remover_loja_vinculada)
        self.btn_layout.addWidget(self.remover_btn)
        self.refresh_btn = QPushButton('Atualizar Lista de Lojas')
        self.refresh_btn.clicked.connect(self.refresh_lojas_backend)
        self.btn_layout.addWidget(self.refresh_btn)
        self.layout.addLayout(self.btn_layout)

    def vincular_loja(self):
        idx = self.lojas_combo.currentIndex()
        loja = self.lojas_combo.itemData(idx)
        if not loja:
            QMessageBox.warning(self, 'Erro', 'Selecione uma loja válida!')
            return
        try:
            if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    config = json.load(f)
            else:
                config = {}
            lojas_vinculadas = config.get('lojas_vinculadas', [])
            # Não duplicar
            if any(l.get('codigo') == loja.get('codigo') for l in lojas_vinculadas):
                QMessageBox.warning(self, 'Aviso', 'Esta loja já está vinculada!')
                return
            lojas_vinculadas.append(loja)
            config['lojas_vinculadas'] = lojas_vinculadas
            with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
                json.dump(config, f, indent=2)
            self.load_lojas()
            QMessageBox.information(self, 'Sucesso', 'Loja vinculada com sucesso!')
        except Exception as e:
            QMessageBox.critical(self, 'Erro', f'Falha ao vincular loja: {str(e)}')

    def remover_loja_vinculada(self):
        row = self.table.currentRow()
        if row < 0:
            QMessageBox.warning(self, 'Erro', 'Selecione uma loja na tabela para remover!')
            return
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
            lojas_vinculadas = config.get('lojas_vinculadas', [])
            if row < len(lojas_vinculadas):
                lojas_vinculadas.pop(row)
                config['lojas_vinculadas'] = lojas_vinculadas
                with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
                    json.dump(config, f, indent=2)
                self.load_lojas()
                QMessageBox.information(self, 'Sucesso', 'Loja removida!')
        except Exception as e:
            QMessageBox.critical(self, 'Erro', f'Falha ao remover loja: {str(e)}')

    def adicionar_loja(self):
        codigo = self.codigo_input.text().strip()
        nome = self.nome_input.text().strip()
        if not codigo or not nome:
            QMessageBox.warning(self, 'Erro', 'Preencha todos os campos!')
            return
        try:
            # Carrega todo o config.json existente
            if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    try:
                        config = json.load(f)
                    except Exception:
                        config = {"lojas": [], "equipamentos": []}
            else:
                config = {"lojas": [], "equipamentos": []}
            if "lojas" not in config:
                config["lojas"] = []
            config["lojas"].append({"codigo": codigo, "nome": nome})
            # Garante que outros campos não sejam perdidos
            with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
                json.dump(config, f, indent=2)
            self.load_lojas()
            self.codigo_input.clear()
            self.nome_input.clear()
            QMessageBox.information(self, 'Sucesso', 'Loja cadastrada!')
        except Exception as e:
            QMessageBox.critical(self, 'Erro', f'Falha ao cadastrar loja: {str(e)}')

    def remover_loja(self):
        row = self.table.currentRow()
        if row < 0:
            QMessageBox.warning(self, 'Erro', 'Selecione uma loja para remover!')
            return
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
            lojas = config.get('lojas', [])
            if row < len(lojas):
                lojas.pop(row)
                config['lojas'] = lojas
                with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
                    json.dump(config, f, indent=2)
                self.load_lojas()
                QMessageBox.information(self, 'Sucesso', 'Loja removida!')
        except Exception as e:
            QMessageBox.critical(self, 'Erro', f'Falha ao remover loja: {str(e)}')

    def editar_loja(self):
        row = self.table.currentRow()
        if row < 0:
            QMessageBox.warning(self, 'Erro', 'Selecione uma loja para editar!')
            return
        codigo = self.codigo_input.text().strip()
        nome = self.nome_input.text().strip()
        if not codigo or not nome:
            QMessageBox.warning(self, 'Erro', 'Preencha todos os campos para editar!')
            return
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
            lojas = config.get('lojas', [])
            if row < len(lojas):
                lojas[row] = {"codigo": codigo, "nome": nome}
                config['lojas'] = lojas
                with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
                    json.dump(config, f, indent=2)
                self.load_lojas()
                QMessageBox.information(self, 'Sucesso', 'Loja editada!')
        except Exception as e:
            QMessageBox.critical(self, 'Erro', f'Falha ao editar loja: {str(e)}')

class ConfiguracaoArquivoWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)
        # Cabeçalho visual
        header = QHBoxLayout()
        logo = QLabel()
        logo.setPixmap(QPixmap('logo-sonda.png').scaled(48, 48, Qt.KeepAspectRatio))
        header.addWidget(logo)
        header_title = QLabel('<h2>Configuração do Arquivo de Preços</h2>')
        header.addWidget(header_title)
        header.addStretch()
        self.layout.addLayout(header)

        # Fonte de Dados
        self.fonte_label = QLabel('Fonte de Dados:')
        self.fonte_combo = QComboBox()
        self.fonte_combo.addItems(['Arquivo', 'API', 'Banco de Dados'])
        self.layout.addWidget(self.fonte_label)
        self.layout.addWidget(self.fonte_combo)

        # Arquivo de entrada do cliente (ou pasta)
        self.input_file_label = QLabel('Arquivo de entrada do cliente (ou pasta):')
        self.input_file_path = QLineEdit()
        self.input_file_btn = QPushButton('Selecionar arquivo de entrada')
        self.input_file_btn.clicked.connect(self.selecionar_arquivo_entrada)
        self.layout.addWidget(self.input_file_label)
        self.layout.addWidget(self.input_file_path)
        self.layout.addWidget(self.input_file_btn)
        # Botão para processar/importar arquivo do cliente manualmente
        self.processar_btn = QPushButton('Processar arquivo de entrada do cliente')
        self.processar_btn.clicked.connect(self.processar_arquivo_entrada)
        self.layout.addWidget(self.processar_btn)
        # Separador
        self.sep_label = QLabel('Separador do arquivo:')
        self.sep_combo = QComboBox()
        self.sep_combo.addItems([';', '|', ','])
        self.sep_custom = QLineEdit()
        self.sep_custom.setPlaceholderText('Ou digite um separador personalizado')
        self.layout.addWidget(self.sep_label)
        self.layout.addWidget(self.sep_combo)
        self.layout.addWidget(self.sep_custom)
        # Layout customizado
        self.layout_label = QLabel('Layout do arquivo (exemplo):')
        self.layout_input = QLineEdit()
        self.layout_input.setPlaceholderText('Ex: barcode;name;price')
        self.layout.addWidget(self.layout_label)
        self.layout.addWidget(self.layout_input)
        # Local de geração
        self.path_label = QLabel('Local de geração do arquivo:')
        self.path_input = QLineEdit()
        self.path_btn = QPushButton('Selecionar arquivo de saída')
        self.path_btn.clicked.connect(self.selecionar_arquivo_saida)
        self.layout.addWidget(self.path_label)
        self.layout.addWidget(self.path_input)
        self.layout.addWidget(self.path_btn)
        # Campos exportados
        self.fields_label = QLabel('Campos exportados:')
        self.barcode_cb = QCheckBox('Código de barras')
        self.name_cb = QCheckBox('Nome')
        self.price_cb = QCheckBox('Preço')
        self.barcode_cb.setChecked(True)
        self.name_cb.setChecked(True)
        self.price_cb.setChecked(True)
        self.layout.addWidget(self.fields_label)
        self.layout.addWidget(self.barcode_cb)
        self.layout.addWidget(self.name_cb)
        self.layout.addWidget(self.price_cb)
        # Checkbox para incluir cabeçalho
        self.cabecalho_cb = QCheckBox('Incluir cabeçalho no arquivo de preços')
        self.cabecalho_cb.setChecked(False)
        self.layout.addWidget(self.cabecalho_cb)
        # Botão de teste
        self.gerar_btn = QPushButton('Gerar arquivo de teste')
        self.gerar_btn.clicked.connect(self.gerar_arquivo_teste)
        self.layout.addWidget(self.gerar_btn)
        # Botão de salvar configuração
        self.salvar_btn = QPushButton('Salvar Configuração')
        self.salvar_btn.clicked.connect(self.salvar_config)
        self.layout.addWidget(self.salvar_btn)
        # Integração IA
        self.ia_label = QLabel('Integração com Agno (IA):')
        self.ia_cb = QCheckBox('Ativar IA')
        self.layout.addWidget(self.ia_label)
        self.layout.addWidget(self.ia_cb)
        self.ia_output = QTextEdit()
        self.ia_output.setReadOnly(True)
        self.layout.addWidget(self.ia_output)
        # Carregar configurações salvas
        self.carregar_config()
        # Estilo visual (QSS)
        self.setStyleSheet('''
            QLabel { font-size: 12px; }
            QLineEdit, QComboBox { font-size: 12px; padding: 1px; }
            QPushButton {
                font-size: 12px;
                padding: 2px 8px;
                background: qlineargradient(x1:0, y1:0, x2:0, y2:1, stop:0 #2196F3, stop:1 #1565C0);
                color: white;
                border-radius: 4px;
                min-height: 24px;
                max-height: 28px;
                min-width: 120px;
                border: none;
            }
            QPushButton:pressed {
                background: #0d47a1;
            }
            QCheckBox { font-size: 12px; }
            QTabWidget::pane { border: 1px solid #ccc; }
            QTextEdit { font-size: 12px; }
        ''')

    def selecionar_arquivo_entrada(self):
        arquivo, _ = QFileDialog.getOpenFileName(self, 'Selecionar arquivo de entrada', '', 'Arquivos de texto (*.txt);;Todos os arquivos (*)')
        if arquivo:
            self.input_file_path.setText(arquivo)

    def carregar_config(self):
        try:
            if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    config = json.load(f)
            else:
                config = {"lojas": [], "equipamentos": []}
            self.fonte_combo.setCurrentText(config.get('tipo_integracao', 'Arquivo'))
            self.sep_combo.setCurrentText(config.get('arquivo_separador', ';'))
            self.sep_custom.setText(config.get('arquivo_separador_custom', ''))
            self.path_input.setText(config.get('arquivo_local', ''))
            self.input_file_path.setText(config.get('arquivo_entrada', ''))
            self.barcode_cb.setChecked('barcode' in config.get('arquivo_campos', ['barcode', 'name', 'price']))
            self.name_cb.setChecked('name' in config.get('arquivo_campos', ['barcode', 'name', 'price']))
            self.price_cb.setChecked('price' in config.get('arquivo_campos', ['barcode', 'name', 'price']))
            self.ia_cb.setChecked(config.get('ia_ativo', False))
            self.layout_input.setText(config.get('arquivo_layout', 'barcode;name;price'))
            self.cabecalho_cb.setChecked(config.get('arquivo_incluir_cabecalho', False))
        except Exception:
            pass

    def _gerar_token_into(self, widget):
        """Generate a 32-byte hex token and insert into the given QLineEdit widget.
        Safe to call from the UI thread.
        """
        try:
            import secrets
            token = secrets.token_hex(32)
            try:
                widget.setText(token)
            except Exception:
                # widget might be a plain callable that accepts text
                try:
                    widget.set_value(token)
                except Exception:
                    pass
        except Exception:
            pass

    def _copy_to_clipboard(self, text):
        """Copy given text to the system clipboard using QApplication clipboard."""
        try:
            from PyQt5.QtWidgets import QApplication
            cb = QApplication.clipboard()
            cb.clear(mode=cb.Clipboard)
            cb.setText(text, mode=cb.Clipboard)
            # optional user feedback: set status label if present
            try:
                self.status_output.setText('Token copiado para a área de transferência')
            except Exception:
                pass
        except Exception:
            pass

    def selecionar_pasta(self):
        pasta = QFileDialog.getExistingDirectory(self, 'Selecionar pasta')
        if pasta:
            self.path_input.setText(pasta)

    def selecionar_arquivo_saida(self):
        arquivo, _ = QFileDialog.getSaveFileName(self, 'Selecionar arquivo de saída', '', 'Arquivos de texto (*.txt);;Todos os arquivos (*)')
        if arquivo:
            self.path_input.setText(arquivo)

    def salvar_config(self):
        sep = self.get_separador()
        campos = self.get_campos()
        path = self.path_input.text().strip() or os.getcwd()
        ia_ativo = self.ia_cb.isChecked()
        layout = self.layout_input.text().strip() or 'barcode;name;price'
        fonte = self.fonte_combo.currentText()
        try:
            if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    config = json.load(f)
            else:
                config = {"lojas": [], "equipamentos": []}
        except Exception:
            config = {"lojas": [], "equipamentos": []}
        config['tipo_integracao'] = fonte
        config['arquivo_separador'] = sep
        config['arquivo_separador_custom'] = self.sep_custom.text().strip()
        config['arquivo_campos'] = campos
        config['arquivo_local'] = path
        config['arquivo_entrada'] = self.input_file_path.text().strip()
        config['ia_ativo'] = ia_ativo
        config['arquivo_layout'] = layout
        config['arquivo_incluir_cabecalho'] = self.cabecalho_cb.isChecked()
        with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2)
        QMessageBox.information(self, 'Configuração', 'Configuração do arquivo salva com sucesso!')

    def processar_arquivo_entrada_automatico(self):
        # Rotina automática chamada pelo timer
        try:
            from main import gerar_arquivo_precos, enviar_arquivo_automatico
            # Carrega config para saber a fonte de dados
            if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    config = json.load(f)
            else:
                config = {}
            fonte = config.get('tipo_integracao', 'Arquivo')
            saida = config.get('arquivo_local', self.path_input.text().strip() or os.getcwd())
            arquivo_saida = saida
            # Corrige duplicidade de nome de arquivo
            if arquivo_saida and arquivo_saida.count('pricetab.txt') > 1:
                partes = arquivo_saida.split('pricetab.txt')
                arquivo_saida = ''.join(partes[:-1]) + 'pricetab.txt'
            produtos = []
            if fonte == 'Arquivo':
                entrada = config.get('arquivo_entrada', self.input_file_path.text().strip())
                if not entrada:
                    return
                if os.path.isdir(entrada):
                    arquivos = [f for f in os.listdir(entrada) if f.lower().endswith('.txt')]
                    if not arquivos:
                        return
                    arquivos.sort(key=lambda x: os.path.getmtime(os.path.join(entrada, x)), reverse=True)
                    arquivo_cliente = os.path.join(entrada, arquivos[0])
                else:
                    arquivo_cliente = entrada
                with open(arquivo_cliente, 'r', encoding='utf-8') as f:
                    conteudo = f.read()
                linhas = [l.strip() for l in conteudo.splitlines() if l.strip()]
                campos = config.get('arquivo_campos', ['barcode', 'name', 'price'])
                sep = config.get('arquivo_separador', ';')
                for linha in linhas:
                    partes = linha.split(sep)
                    if len(partes) == len(campos):
                        produtos.append(dict(zip(campos, partes)))
                # Se não conseguiu converter, salva como texto puro
                if not produtos:
                    produtos = conteudo
            elif fonte == 'API':
                import requests
                url = config.get('api_externa', '')
                usuario = config.get('api_usuario', '')
                senha = config.get('api_senha', '')
                token = config.get('api_token', '')
                headers = {}
                auth = None
                if token:
                    headers['Authorization'] = f'Bearer {token}'
                elif usuario and senha:
                    auth = (usuario, senha)
                r = requests.get(url, headers=headers, auth=auth, timeout=15)
                r.raise_for_status()
                data = r.json()
                print('[DEBUG] Resposta da API:', str(data)[:500])
                # Passa o dicionário completo para gerar_arquivo_precos
                produtos = None
                dados = data
            elif fonte == 'Banco de Dados':
                import importlib
                tipo = config.get('db_tipo', 'SQLite')
                host = config.get('db_host', '')
                porta = config.get('db_porta', '')
                usuario = config.get('db_user', '')
                senha = config.get('db_pass', '')
                nome = config.get('db_nome', '')
                sql = config.get('db_sql', '')
                if tipo == 'SQLite':
                    import sqlite3
                    conn = sqlite3.connect(nome)
                    cur = conn.cursor()
                    cur.execute(sql)
                    produtos = [dict(zip([d[0] for d in cur.description], row)) for row in cur.fetchall()]
                    conn.close()
                elif tipo == 'MySQL':
                    if importlib.util.find_spec('mysql.connector'):
                        import mysql.connector
                        conn = mysql.connector.connect(host=host, port=int(porta or 3306), user=usuario, password=senha, database=nome)
                        cur = conn.cursor()
                        cur.execute(sql)
                        produtos = [dict(zip([d[0] for d in cur.description], row)) for row in cur.fetchall()]
                        conn.close()
                elif tipo == 'PostgreSQL':
                    if importlib.util.find_spec('psycopg2'):
                        import psycopg2
                        conn = psycopg2.connect(host=host, port=int(porta or 5432), user=usuario, password=senha, dbname=nome)
                        cur = conn.cursor()
                        cur.execute(sql)
                        produtos = [dict(zip([d[0] for d in cur.description], row)) for row in cur.fetchall()]
                        conn.close()
                elif tipo == 'SQL Server':
                    if importlib.util.find_spec('pyodbc'):
                        import pyodbc
                        conn_str = (
                            f"DRIVER={{ODBC Driver 17 for SQL Server}};"
                            f"SERVER={host},{porta or '1433'};"
                            f"DATABASE={nome};"
                            f"UID={usuario};PWD={senha}"
                        )
                        conn = pyodbc.connect(conn_str, timeout=5)
                        cur = conn.cursor()
                        cur.execute(sql)
                        produtos = [dict(zip([d[0] for d in cur.description], row)) for row in cur.fetchall()]
                        conn.close()
                elif tipo == 'Oracle':
                    if importlib.util.find_spec('cx_Oracle'):
                        import cx_Oracle
                        dsn = cx_Oracle.makedsn(host, int(porta or 1521), service_name=nome)
                        conn = cx_Oracle.connect(user=usuario, password=senha, dsn=dsn)
                        cur = conn.cursor()
                        cur.execute(sql)
                        produtos = [dict(zip([d[0] for d in cur.description], row)) for row in cur.fetchall()]
                        conn.close()
            # Geração do arquivo texto para equipamentos legados usando main.py
            if fonte == 'API' and dados is not None:
                print('[DEBUG] Dados enviados para gerar_arquivo_precos:', str(dados)[:500])
                gerar_arquivo_precos(dados, arquivo_saida, incluir_cabecalho=config.get('arquivo_incluir_cabecalho', False))
            else:
                gerar_arquivo_precos(produtos, arquivo_saida, incluir_cabecalho=config.get('arquivo_incluir_cabecalho', False))
            # Envio automático após gerar arquivo
            try:
                enviar_arquivo_automatico(arquivo_saida)
            except Exception as e:
                print(f'Erro ao enviar arquivo automaticamente: {e}')
        except Exception as e:
            print('Erro ao processar arquivo de entrada automático:', e)

    def processar_arquivo_entrada(self):
        from PyQt5.QtWidgets import QMessageBox
        try:
            from main import gerar_arquivo_precos, enviar_arquivo_automatico
            entrada = self.input_file_path.text().strip()
            if not entrada:
                QMessageBox.warning(self, 'Atenção', 'Selecione o arquivo ou pasta de entrada do cliente.')
                return
            if os.path.isdir(entrada):
                arquivos = [f for f in os.listdir(entrada) if f.lower().endswith('.txt')]
                if not arquivos:
                    QMessageBox.warning(self, 'Atenção', 'Nenhum arquivo .txt encontrado na pasta.')
                    return
                arquivos.sort(key=lambda x: os.path.getmtime(os.path.join(entrada, x)), reverse=True)
                arquivo_cliente = os.path.join(entrada, arquivos[0])
            else:
                arquivo_cliente = entrada
            with open(arquivo_cliente, 'r', encoding='utf-8') as f:
                conteudo = f.read()
            linhas = [l.strip() for l in conteudo.splitlines() if l.strip()]
            # Carrega config para campos e separador
            if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    config = json.load(f)
            else:
                config = {}
            campos = config.get('arquivo_campos', ['barcode', 'name', 'price'])
            sep = config.get('arquivo_separador', ';')
            produtos = []
            for linha in linhas:
                partes = linha.split(sep)
                if len(partes) == len(campos):
                    produtos.append(dict(zip(campos, partes)))
            # Se não conseguiu converter, salva como texto puro
            if not produtos:
                produtos = conteudo
            saida = self.path_input.text().strip() or os.getcwd()
            arquivo_saida = saida
            if arquivo_saida and arquivo_saida.count('pricetab.txt') > 1:
                partes = arquivo_saida.split('pricetab.txt')
                arquivo_saida = ''.join(partes[:-1]) + 'pricetab.txt'
            gerar_arquivo_precos(produtos, arquivo_saida, incluir_cabecalho=config.get('arquivo_incluir_cabecalho', False))
            try:
                enviar_arquivo_automatico(arquivo_saida)
            except Exception as e:
                print(f'Erro ao enviar arquivo automaticamente: {e}')
            QMessageBox.information(self, 'Processamento', f'Arquivo processado e salvo em: {arquivo_saida}')
        except Exception as e:
            QMessageBox.critical(self, 'Erro', f'Falha ao processar arquivo: {str(e)}')

    def gerar_arquivo_teste(self):
        sep = self.get_separador()
        campos = self.get_campos()
        path = self.path_input.text() or '.'
        filename = path
        if filename and filename.count('pricetab.txt') > 1:
            partes = filename.split('pricetab.txt')
            filename = ''.join(partes[:-1]) + 'pricetab.txt'
        produtos = [
            {'barcode': '123', 'name': 'Produto A', 'price': 10.5},
            {'barcode': '456', 'name': 'Produto B', 'price': 20.0}
        ]
        try:
            from main import gerar_arquivo_precos, enviar_arquivo_automatico
            gerar_arquivo_precos(produtos, filename, incluir_cabecalho=self.cabecalho_cb.isChecked())
            try:
                enviar_arquivo_automatico(filename)
            except Exception as e:
                print(f'Erro ao enviar arquivo automaticamente: {e}')
            QMessageBox.information(self, 'Arquivo gerado', f'Arquivo de teste gerado em: {filename}')
        except Exception as e:
            QMessageBox.critical(self, 'Erro', f'Falha ao gerar arquivo: {str(e)}')
        if self.ia_cb.isChecked():
            self.ia_output.setText('Agno IA: Sugestão - Layout OK, campos exportados: ' + ', '.join(campos))
        else:
            self.ia_output.clear()

    def get_separador(self):
        custom = self.sep_custom.text().strip()
        return custom if custom else self.sep_combo.currentText()

    def get_campos(self):
        campos = []
        if self.barcode_cb.isChecked():
            campos.append('barcode')
        if self.name_cb.isChecked():
            campos.append('name')
        if self.price_cb.isChecked():
            campos.append('price')
        return campos

class BancoDadosWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.layout = QVBoxLayout()
        self.layout.setContentsMargins(16, 16, 16, 16)
        self.layout.setSpacing(12)
        self.setLayout(self.layout)
        self.title = QLabel('<b>Configuração de Banco de Dados</b>')
        self.title.setStyleSheet('font-size:18px;')
        self.layout.addWidget(self.title)
        self.db_container = QWidget()
        self.db_container_layout = QVBoxLayout()
        self.db_container_layout.setContentsMargins(8, 8, 8, 8)
        self.db_container_layout.setSpacing(8)
        self.db_container.setLayout(self.db_container_layout)
        self.db_tipo_label = QLabel('Tipo do Banco:')
        self.db_tipo_combo = QComboBox()
        self.db_tipo_combo.addItems(['SQLite', 'MySQL', 'PostgreSQL', 'SQL Server', 'Oracle'])
        self.db_host_label = QLabel('Host:')
        self.db_host_input = QLineEdit()
        self.db_porta_label = QLabel('Porta:')
        self.db_porta_input = QLineEdit()
        self.db_user_label = QLabel('Usuário:')
        self.db_user_input = QLineEdit()
        self.db_pass_label = QLabel('Senha:')
        self.db_pass_input = QLineEdit()
        self.db_pass_input.setEchoMode(QLineEdit.Password)
        self.db_nome_label = QLabel('Nome do Banco/Arquivo:')
        self.db_nome_input = QLineEdit()
        self.db_sql_label = QLabel('Consulta SQL:')
        self.db_sql_input = QLineEdit()
        for w in [self.db_tipo_label, self.db_tipo_combo, self.db_host_label, self.db_host_input,
                  self.db_porta_label, self.db_porta_input, self.db_user_label, self.db_user_input,
                  self.db_pass_label, self.db_pass_input, self.db_nome_label, self.db_nome_input,
                  self.db_sql_label, self.db_sql_input]:
            self.db_container_layout.addWidget(w)
        self.layout.addWidget(self.db_container)
        self.status_label = QLabel('Status da conexão:')
        self.status_output = QLabel('-')
        self.layout.addWidget(self.status_label)
        self.layout.addWidget(self.status_output)
        self.ultima_label = QLabel('Última sincronização:')
        self.ultima_output = QLabel('-')
        self.layout.addWidget(self.ultima_label)
        self.layout.addWidget(self.ultima_output)
        self.teste_btn = QPushButton('Testar Conexão')
        self.teste_btn.clicked.connect(self.testar_conexao)
        self.layout.addWidget(self.teste_btn)
        self.salvar_btn = QPushButton('Salvar Configuração')
        self.salvar_btn.clicked.connect(self.salvar_config)
        self.layout.addWidget(self.salvar_btn)

    def testar_conexao(self):
        from PyQt5.QtWidgets import QApplication, QMessageBox
        import importlib
        QApplication.setOverrideCursor(Qt.WaitCursor)
        try:
            tipo = self.db_tipo_combo.currentText()
            host = self.db_host_input.text().strip()
            porta = self.db_porta_input.text().strip()
            usuario = self.db_user_input.text().strip()
            senha = self.db_pass_input.text().strip()
            nome = self.db_nome_input.text().strip()
            status = ''
            if tipo == 'SQLite':
                import sqlite3
                try:
                    if not nome:
                        raise Exception('Informe o nome do arquivo SQLite.')
                    conn = sqlite3.connect(nome)
                    conn.close()
                    status = 'Conexão SQLite OK!'
                except Exception as e:
                    status = f'Erro SQLite: {e}'
            elif tipo == 'MySQL':
                if importlib.util.find_spec('mysql.connector'):
                    import mysql.connector
                    try:
                        conn = mysql.connector.connect(
                            host=host,
                            port=int(porta) if porta else 3306,
                            user=usuario,
                            password=senha,
                            database=nome
                        )
                        conn.close()
                        status = 'Conexão MySQL OK!'
                    except Exception as e:
                        status = f'Erro MySQL: {e}'
                else:
                    status = 'mysql-connector-python não instalado.'
            elif tipo == 'PostgreSQL':
                if importlib.util.find_spec('psycopg2'):
                    import psycopg2
                    try:
                        conn = psycopg2.connect(
                            host=host,
                            port=int(porta) if porta else 5432,
                            user=usuario,
                            password=senha,
                            dbname=nome
                        )
                        conn.close()
                        status = 'Conexão PostgreSQL OK!'
                    except Exception as e:
                        status = f'Erro PostgreSQL: {e}'
                else:
                    status = 'psycopg2 não instalado.'
            elif tipo == 'SQL Server':
                import importlib
                if importlib.util.find_spec('pyodbc'):
                    import pyodbc
                    try:
                        conn_str = (
                            f"DRIVER={{ODBC Driver 17 for SQL Server}};"
                            f"SERVER={host},{porta if porta else '1433'};"
                            f"DATABASE={nome};"
                            f"UID={usuario};PWD={senha}"
                        )
                        conn = pyodbc.connect(conn_str, timeout=5)
                        conn.close()
                        status = 'Conexão SQL Server OK!'
                    except Exception as e:
                        status = f'Erro SQL Server: {e}'
                else:
                    status = 'pyodbc não instalado.'
            elif tipo == 'Oracle':
                import importlib
                if importlib.util.find_spec('cx_Oracle'):
                    import cx_Oracle
                    try:
                        dsn = cx_Oracle.makedsn(host, int(porta) if porta else 1521, service_name=nome)
                        conn = cx_Oracle.connect(user=usuario, password=senha, dsn=dsn)
                        conn.close()
                        status = 'Conexão Oracle OK!'
                    except Exception as e:
                        status = f'Erro Oracle: {e}'
                else:
                    status = 'cx_Oracle não instalado.'
            else:
                status = f'Teste não implementado para: {tipo}'
            self.status_output.setText(status)
            QMessageBox.information(self, 'Teste de Conexão', status)
        finally:
            QApplication.restoreOverrideCursor()

    def salvar_config(self):
        from PyQt5.QtWidgets import QApplication, QMessageBox
        import json
        import os
        QApplication.setOverrideCursor(Qt.WaitCursor)
        try:
            config = {}
            config['db_tipo'] = self.db_tipo_combo.currentText()
            config['db_host'] = self.db_host_input.text().strip()
            config['db_porta'] = self.db_porta_input.text().strip()
            config['db_user'] = self.db_user_input.text().strip()
            config['db_pass'] = self.db_pass_input.text().strip()
            config['db_nome'] = self.db_nome_input.text().strip()
            config['db_sql'] = self.db_sql_input.text().strip()
            # Carrega config existente para não sobrescrever outros dados
            if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    try:
                        old = json.load(f)
                    except Exception:
                        old = {}
            else:
                old = {}
            old.update(config)
            with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
                json.dump(old, f, indent=2)
            self.status_output.setText('Configuração salva!')
            QMessageBox.information(self, 'Salvar Configuração', 'Configuração salva com sucesso!')
        finally:
            QApplication.restoreOverrideCursor()

class IntegracaoPrecixWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)
        # Título
        self.title = QLabel('<b>Configuração de Integração API PRECIX</b>')
        self.title.setStyleSheet('font-size:18px;')
        self.layout.addWidget(self.title)
        # Porta local
        self.porta_label = QLabel('Porta local:')
        self.porta_input = QLineEdit()
        self.layout.addWidget(self.porta_label)
        self.layout.addWidget(self.porta_input)
        # Timeout
        self.timeout_label = QLabel('Timeout (segundos):')
        self.timeout_input = QLineEdit()
        self.layout.addWidget(self.timeout_label)
        self.layout.addWidget(self.timeout_input)
        # Modo de operação
        self.modo_label = QLabel('Modo de operação:')
        self.modo_combo = QComboBox()
        self.modo_combo.addItems(['Produção', 'Homologação', 'Desenvolvimento'])
        self.layout.addWidget(self.modo_label)
        self.layout.addWidget(self.modo_combo)
        # URL da API
        self.api_label = QLabel('URL da API Externa:')
        self.api_input = QLineEdit()
        self.layout.addWidget(self.api_label)
        self.layout.addWidget(self.api_input)
        # Autenticação
        self.auth_label = QLabel('Autenticação:')
        self.layout.addWidget(self.auth_label)
        self.user_input = QLineEdit()
        self.user_input.setPlaceholderText('Usuário')
        self.layout.addWidget(self.user_input)
        self.pass_input = QLineEdit()
        self.pass_input.setPlaceholderText('Senha')
        self.pass_input.setEchoMode(QLineEdit.Password)
        self.layout.addWidget(self.pass_input)
        self.token_input = QLineEdit()
        self.token_input.setPlaceholderText('Token (opcional)')
        self.layout.addWidget(self.token_input)
        # Tokens administrativos
        self.ack_token_label = QLabel('ACK token (admin HTTP):')
        self.ack_token_input = QLineEdit()
        self.ack_token_input.setPlaceholderText('X-ACK-Token para proteger endpoints /acks')
        ack_row = QHBoxLayout()
        ack_row.addWidget(self.ack_token_input)
        self.ack_gen_btn = QPushButton('Gerar')
        self.ack_gen_btn.setToolTip('Gerar token aleatório (32 bytes)')
        self.ack_gen_btn.clicked.connect(lambda: self._gerar_token_into(self.ack_token_input))
        ack_row.addWidget(self.ack_gen_btn)
        self.ack_copy_btn = QPushButton('Copiar')
        self.ack_copy_btn.setToolTip('Copiar token para área de transferência')
        self.ack_copy_btn.clicked.connect(lambda: self._copy_to_clipboard(self.ack_token_input.text()))
        ack_row.addWidget(self.ack_copy_btn)
        self.layout.addWidget(self.ack_token_label)
        self.layout.addLayout(ack_row)
        self.backend_token_label = QLabel('Backend write token (Bearer):')
        self.backend_token_input = QLineEdit()
        self.backend_token_input.setPlaceholderText('Token para autorizar escrita no backend')
        backend_row = QHBoxLayout()
        backend_row.addWidget(self.backend_token_input)
        self.backend_gen_btn = QPushButton('Gerar')
        self.backend_gen_btn.setToolTip('Gerar token aleatório (32 bytes)')
        self.backend_gen_btn.clicked.connect(lambda: self._gerar_token_into(self.backend_token_input))
        backend_row.addWidget(self.backend_gen_btn)
        self.backend_copy_btn = QPushButton('Copiar')
        self.backend_copy_btn.setToolTip('Copiar token para área de transferência')
        self.backend_copy_btn.clicked.connect(lambda: self._copy_to_clipboard(self.backend_token_input.text()))
        backend_row.addWidget(self.backend_copy_btn)
        self.layout.addWidget(self.backend_token_label)
        self.layout.addLayout(backend_row)
        # Status e última sync
        self.status_label = QLabel('Status da conexão:')
        self.status_output = QLabel('-')
        self.layout.addWidget(self.status_label)
        self.layout.addWidget(self.status_output)
        self.ultima_label = QLabel('Última sincronização:')
        self.ultima_output = QLabel('-')
        self.layout.addWidget(self.ultima_label)
        self.layout.addWidget(self.ultima_output)
        # Botões
        self.teste_btn = QPushButton('Testar Conexão')
        self.teste_btn.clicked.connect(self.testar_conexao)
        self.salvar_btn = QPushButton('Salvar Configuração')
        self.salvar_btn.clicked.connect(self.salvar_config)
        btn_layout = QHBoxLayout()
        btn_layout.addWidget(self.teste_btn)
        btn_layout.addSpacing(16)
        btn_layout.addWidget(self.salvar_btn)
        btn_container = QWidget()
        btn_container.setLayout(btn_layout)
        self.layout.addWidget(btn_container)
        # Carregar config existente
        self.carregar_config()

    def _gerar_token_into(self, widget):
        """Generate a 32-byte hex token and insert into the given QLineEdit widget."""
        try:
            import secrets
            token = secrets.token_hex(32)
            try:
                widget.setText(token)
            except Exception:
                try:
                    widget.set_value(token)
                except Exception:
                    pass
        except Exception:
            pass

    def _copy_to_clipboard(self, text):
        """Copy given text to the system clipboard using QApplication clipboard."""
        try:
            from PyQt5.QtWidgets import QApplication
            cb = QApplication.clipboard()
            cb.clear(mode=cb.Clipboard)
            cb.setText(text, mode=cb.Clipboard)
            try:
                self.status_output.setText('Token copiado para a área de transferência')
            except Exception:
                pass
        except Exception:
            pass

    def salvar_config(self):
        porta = self.porta_input.text().strip() or '8000'
        timeout = int(self.timeout_input.text().strip() or '10')
        modo = self.modo_combo.currentText()
        api_externa = self.api_input.text().strip()
        usuario = self.user_input.text().strip()
        senha = self.pass_input.text().strip()
        token = self.token_input.text().strip()
        try:
            if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    config = json.load(f)
            else:
                config = {}
        except Exception:
            config = {}
        config['porta_local'] = porta
        config['timeout'] = timeout
        config['modo_operacao'] = modo
        config['api_externa'] = api_externa
        config['api_usuario'] = usuario
        config['api_senha'] = senha
        # persist both API token (used for reading) and backend write token (used by agent for POST/PUT)
        config['api_token'] = token
        if self.ack_token_input.text().strip():
            config['ack_token'] = self.ack_token_input.text().strip()
        if self.backend_token_input.text().strip():
            config['backend_token'] = self.backend_token_input.text().strip()
        config['tipo_integracao'] = 'API'
        from datetime import datetime
        config['ultima_sync'] = datetime.now().strftime('%d/%m/%Y %H:%M:%S')
        with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2)
        self.ultima_output.setText(config['ultima_sync'])
    # Remover manipulação de layout de botões do salvar_config
        # Após carregar config, garanta que a interface reflita o tipo de integração
        # ...existing code...

    def toggle_db_fields(self, value):
        is_db = value == 'Banco de Dados'
        # Campos de API
        self.api_label.setVisible(not is_db)
        self.api_input.setVisible(not is_db)
        self.auth_label.setVisible(not is_db)
        self.user_input.setVisible(not is_db)
        self.pass_input.setVisible(not is_db)
        self.token_input.setVisible(not is_db)
        # Campos de banco de dados
        self.db_container.setVisible(is_db)

    def testar_conexao(self):
        porta = self.porta_input.text().strip() or '8000'
        timeout = int(self.timeout_input.text().strip() or '10')
        modo = self.modo_combo.currentText()
        api_externa = self.api_input.text().strip()
        usuario = self.user_input.text().strip()
        senha = self.pass_input.text().strip()
        token = self.token_input.text().strip()
        status_msg = ''
        from PyQt5.QtWidgets import QMessageBox
        if not api_externa:
            QMessageBox.warning(self, 'Atenção', 'Preencha a URL da API externa para testar a conexão.')
            self.status_output.setText('Preencha a URL da API externa.')
            return
        try:
            url = api_externa
            headers = {}
            auth = None
            if token:
                headers['Authorization'] = f'Bearer {token}'
            elif usuario and senha:
                auth = (usuario, senha)
            r = requests.get(url, timeout=timeout, headers=headers, auth=auth)
            if r.status_code in (200, 201, 204):
                status_msg = 'Conexão OK'
            else:
                try:
                    content = r.text[:200]
                except Exception:
                    content = ''
                status_msg = f'Erro: {r.status_code} - {content}'
        except Exception as e:
            status_msg = f'Falha: {str(e)[:60]}'
        self.status_output.setText(status_msg)
        try:
            if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    config = json.load(f)
            else:
                config = {}
        except Exception:
            config = {}
        config['porta_local'] = porta
        config['timeout'] = timeout
        config['modo_operacao'] = modo
        config['api_externa'] = api_externa
        config['api_usuario'] = usuario
        config['api_senha'] = senha
        config['api_token'] = token
        config['status_conexao'] = status_msg
        config['tipo_integracao'] = 'API'
        from datetime import datetime
        config['ultima_sync'] = datetime.now().strftime('%d/%m/%Y %H:%M:%S')
        with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2)
        self.ultima_output.setText(config['ultima_sync'])

    def salvar_config(self):
        porta = self.porta_input.text().strip() or '8000'
        timeout = int(self.timeout_input.text().strip() or '10')
        modo = self.modo_combo.currentText()
        api_externa = self.api_input.text().strip()
        usuario = self.user_input.text().strip()
        senha = self.pass_input.text().strip()
        token = self.token_input.text().strip()
    # Removido: fonte_combo e campos de banco de dados
        try:
            if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    config = json.load(f)
            else:
                config = {}
        except Exception:
            config = {}
        config['porta_local'] = porta
        config['timeout'] = timeout
        config['modo_operacao'] = modo
        config['api_externa'] = api_externa
        config['api_usuario'] = usuario
        config['api_senha'] = senha
        config['api_token'] = token
        config['tipo_integracao'] = 'API'
        from datetime import datetime
        config['ultima_sync'] = datetime.now().strftime('%d/%m/%Y %H:%M:%S')
        with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2)
        self.ultima_output.setText(config['ultima_sync'])
        self.status_output.setText('Configuração salva!')
    def carregar_config(self):
        try:
            if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    config = json.load(f)
            else:
                config = {}
            self.porta_input.setText(str(config.get('porta_local', '8000')))
            self.timeout_input.setText(str(config.get('timeout', '10')))
            self.modo_combo.setCurrentText(config.get('modo_operacao', 'Produção'))
            self.api_input.setText(config.get('api_externa', ''))
            self.user_input.setText(config.get('api_usuario', ''))
            self.pass_input.setText(config.get('api_senha', ''))
            self.token_input.setText(config.get('api_token', ''))
            # admin/admin-write tokens
            self.ack_token_input.setText(config.get('ack_token', ''))
            self.backend_token_input.setText(config.get('backend_token', ''))
            self.status_output.setText(config.get('status_conexao', '-'))
            self.ultima_output.setText(config.get('ultima_sync', '-'))
        except Exception:
            pass

class EnvioWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)
        self.title = QLabel('<b>Envio de Arquivos</b>')
        self.title.setStyleSheet('font-size:18px;')
        self.layout.addWidget(self.title)
        self.metodo_label = QLabel('Método de envio:')
        self.metodo_combo = QComboBox()
        self.metodo_combo.addItems(['FTP', 'TCP', 'LOCAL'])
        self.layout.addWidget(self.metodo_label)
        self.layout.addWidget(self.metodo_combo)
        self.host_label = QLabel('Host/IP:')
        self.host_input = QLineEdit()
        self.layout.addWidget(self.host_label)
        self.layout.addWidget(self.host_input)
        self.porta_label = QLabel('Porta:')
        self.porta_input = QLineEdit()
        self.layout.addWidget(self.porta_label)
        self.layout.addWidget(self.porta_input)
        self.usuario_label = QLabel('Usuário:')
        self.usuario_input = QLineEdit()
        self.layout.addWidget(self.usuario_label)
        self.layout.addWidget(self.usuario_input)
        self.senha_label = QLabel('Senha:')
        self.senha_input = QLineEdit()
        self.senha_input.setEchoMode(QLineEdit.Password)
        self.layout.addWidget(self.senha_label)
        self.layout.addWidget(self.senha_input)
        # Botão azul largura total
        self.teste_btn = QPushButton('Testar Envio')
        self.teste_btn.clicked.connect(self.testar_envio)
        self.layout.addWidget(self.teste_btn)
        self.status_output = QLabel('Status: -')
        self.layout.addWidget(self.status_output)
        self.carregar_config()
    def carregar_config(self):
        try:
            if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    config = json.load(f)
            else:
                config = {}
            self.metodo_combo.setCurrentText(config.get('envio_metodo', 'FTP'))
            self.host_input.setText(config.get('envio_host', ''))
            self.porta_input.setText(str(config.get('envio_porta', '21')))
            self.usuario_input.setText(config.get('envio_usuario', ''))
            self.senha_input.setText(config.get('envio_senha', ''))
            self.status_output.setText(config.get('envio_status', '-'))
        except Exception:
            pass
    def testar_envio(self):
        metodo = self.metodo_combo.currentText()
        host = self.host_input.text().strip()
        porta = int(self.porta_input.text().strip() or '21')
        usuario = self.usuario_input.text().strip()
        senha = self.senha_input.text().strip()
        try:
            if metodo == 'FTP':
                ftp = ftplib.FTP()
                ftp.connect(host, porta, timeout=5)
                ftp.login(usuario, senha)
                ftp.quit()
                self.status_output.setText('FTP OK')
            elif metodo == 'TCP':
                s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                s.settimeout(5)
                s.connect((host, porta))
                s.close()
                self.status_output.setText('TCP OK')
            elif metodo == 'LOCAL':
                # Apenas simula sucesso local
                self.status_output.setText('LOCAL OK')
        except Exception as e:
            self.status_output.setText(f'Falha: {str(e)[:60]}')
        try:
            if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    config = json.load(f)
            else:
                config = {}
        except Exception:
            config = {}
        config['envio_metodo'] = metodo
        config['envio_host'] = host
        config['envio_porta'] = porta
        config['envio_usuario'] = usuario
        config['envio_senha'] = senha
        config['envio_status'] = self.status_output.text()
        with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2)

class AutomacaoWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)
        self.title = QLabel('<b>Automação</b>')
        self.title.setStyleSheet('font-size:18px;')
        self.layout.addWidget(self.title)
        self.intervalo_label = QLabel('Intervalo de atualização automática (minutos):')
        self.layout.addWidget(self.intervalo_label)
        self.intervalo_input = QLineEdit()
        self.layout.addWidget(self.intervalo_input)
        # ComboBox para modo de operação
        self.modo_label = QLabel('Modo de operação:')
        self.layout.addWidget(self.modo_label)
        self.modo_combo = QComboBox()
        self.modo_combo.addItems(['Produção', 'Homologação'])
        self.layout.addWidget(self.modo_combo)
        # Botão azul largura total
        self.forcar_btn = QPushButton('Forçar Atualização Manual')
        self.forcar_btn.clicked.connect(self.forcar_atualizacao)
        self.layout.addWidget(self.forcar_btn)
        # Botão salvar
        self.salvar_btn = QPushButton('Salvar')
        self.salvar_btn.clicked.connect(self.salvar_config)
        self.layout.addWidget(self.salvar_btn)
        self.status_output = QLabel('Status: -')
        self.layout.addWidget(self.status_output)
        self.carregar_config()

    def carregar_config(self):
        try:
            if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    config = json.load(f)
            else:
                config = {}
            self.intervalo_input.setText(str(config.get('automacao_intervalo', '60')))
            self.status_output.setText(config.get('automacao_status', '-'))
            self.modo_combo.setCurrentText(config.get('automacao_modo', 'Produção'))
        except Exception:
            pass

    def salvar_config(self):
        intervalo = self.intervalo_input.text().strip()
        modo = self.modo_combo.currentText()
        if not intervalo:
            QMessageBox.warning(self, 'Erro', 'Informe o intervalo!')
            return
        try:
            if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    config = json.load(f)
            else:
                config = {}
            config['automacao_intervalo'] = intervalo
            config['automacao_modo'] = modo
            with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
                json.dump(config, f, indent=2)
            self.status_output.setText('Configuração salva!')
        except Exception as e:
            QMessageBox.critical(self, 'Erro', f'Falha ao salvar: {str(e)}')

    def forcar_atualizacao(self):
        from PyQt5.QtWidgets import QMessageBox
        import traceback
        try:
            if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    config = json.load(f)
            else:
                config = {}
        except Exception:
            config = {}
        from datetime import datetime
        config['automacao_status'] = 'Solicitada atualização manual'
        config['automacao_ultima'] = datetime.now().strftime('%d/%m/%Y %H:%M:%S')
        config['forcar_atualizacao'] = True
        with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2)
        self.status_output.setText(config['automacao_status'])
        # Executa o processamento do arquivo de entrada imediatamente
        # Busca a janela principal corretamente
        main_window = self.window()
        try:
            if hasattr(main_window, 'config_tab'):
                main_window.config_tab.processar_arquivo_entrada_automatico()
                QMessageBox.information(self, 'Automação', 'Arquivo gerado/processado com sucesso (verifique logs para detalhes de envio).')
            else:
                QMessageBox.warning(self, 'Automação', 'Não foi possível acionar a geração automática. Reinicie o sistema e tente novamente.')
        except Exception as e:
            QMessageBox.critical(self, 'Erro', f'Falha ao gerar/processar arquivo: {str(e)}\n{traceback.format_exc()}')

class EquipamentosWidget(QWidget):
    def preencher_formulario(self, row):
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
            equipamentos = config.get('equipamentos', [])
            if row < len(equipamentos):
                eq = equipamentos[row]
                self.ip_input.setText(str(eq.get('ip', '')))
                self.porta_input.setText(str(eq.get('porta', '')))
                self.desc_input.setText(eq.get('descricao', ''))
                # Seleciona a loja vinculada no ComboBox
                loja_codigo = eq.get('loja', None)
                for i in range(self.loja_combo.count()):
                    loja = self.loja_combo.itemData(i)
                    if loja and loja.get('codigo') == loja_codigo:
                        self.loja_combo.setCurrentIndex(i)
                        break
        except Exception:
            pass
    def __init__(self):
        super().__init__()
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)
        self.table = QTableWidget()
        self.layout.addWidget(self.table)
        self.table.cellClicked.connect(self.preencher_formulario)
        self.load_equipamentos()
        self.add_form()
        self.add_buttons()

    def load_equipamentos(self):
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
            equipamentos = config.get('equipamentos', [])
        except Exception:
            equipamentos = []
        self.table.setRowCount(len(equipamentos))
        self.table.setColumnCount(4)
        self.table.setHorizontalHeaderLabels(['IP', 'Porta', 'Descrição', 'Código da Loja'])
        for i, eq in enumerate(equipamentos):
            self.table.setItem(i, 0, QTableWidgetItem(str(eq.get('ip', ''))))
            self.table.setItem(i, 1, QTableWidgetItem(str(eq.get('porta', ''))))
            self.table.setItem(i, 2, QTableWidgetItem(eq.get('descricao', '')))
            self.table.setItem(i, 3, QTableWidgetItem(str(eq.get('loja', ''))))

    def add_form(self):
        self.form_layout = QHBoxLayout()
        self.ip_input = QLineEdit()
        self.ip_input.setPlaceholderText('IP')
        self.porta_input = QLineEdit()
        self.porta_input.setPlaceholderText('Porta')
        self.desc_input = QLineEdit()
        self.desc_input.setPlaceholderText('Descrição')
        # ComboBox para escolher loja vinculada
        self.loja_combo = QComboBox()
        self.form_layout.addWidget(QLabel('Novo Equipamento:'))
        self.form_layout.addWidget(self.ip_input)
        self.form_layout.addWidget(self.porta_input)
        self.form_layout.addWidget(self.desc_input)
        self.form_layout.addWidget(QLabel('Loja vinculada:'))
        self.form_layout.addWidget(self.loja_combo)
        self.layout.addLayout(self.form_layout)
        self.atualizar_lojas_combo()

    def atualizar_lojas_combo(self):
        self.loja_combo.clear()
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
            lojas_vinculadas = config.get('lojas_vinculadas', [])
            for loja in lojas_vinculadas:
                display = f"{loja.get('codigo', loja.get('id'))} - {loja.get('name')}"
                self.loja_combo.addItem(display, loja)
        except Exception:
            self.loja_combo.addItem('Nenhuma loja vinculada', None)

    def showEvent(self, event):
        # Sempre atualizar o ComboBox ao exibir o widget
        self.atualizar_lojas_combo()
        super().showEvent(event)

    def atualizar_lojas_combo(self):
        self.loja_combo.clear()
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
            lojas_vinculadas = config.get('lojas_vinculadas', [])
            for loja in lojas_vinculadas:
                display = f"{loja.get('codigo', loja.get('id'))} - {loja.get('name')}"
                self.loja_combo.addItem(display, loja)
        except Exception:
            self.loja_combo.addItem('Nenhuma loja vinculada', None)

    def atualizar_loja_vinculada(self):
        # Busca a loja selecionada na aba de lojas
        main_window = self.parentWidget()
        while main_window and not hasattr(main_window, 'loja_tab'):
            main_window = main_window.parentWidget()
        loja_nome = '-'
        loja_codigo = '-'
        if main_window and hasattr(main_window, 'loja_tab'):
            loja_widget = main_window.loja_tab
            if hasattr(loja_widget, 'lojas_combo'):
                idx = loja_widget.lojas_combo.currentIndex()
                loja = loja_widget.lojas_combo.itemData(idx)
                if loja:
                    loja_nome = loja.get('name', '-')
                    loja_codigo = loja.get('codigo', '-')
        self.loja_label.setText(f"{loja_codigo} - {loja_nome}")

    def add_buttons(self):
        self.btn_layout = QHBoxLayout()
        self.add_btn = QPushButton('Adicionar')
        self.add_btn.clicked.connect(self.adicionar_equipamento)
        self.btn_layout.addWidget(self.add_btn)
        self.edit_btn = QPushButton('Atualizar')
        self.edit_btn.clicked.connect(self.editar_equipamento)
        self.btn_layout.addWidget(self.edit_btn)
        self.remove_btn = QPushButton('Remover')
        self.remove_btn.clicked.connect(self.remover_equipamento)
        self.btn_layout.addWidget(self.remove_btn)
        self.refresh_btn = QPushButton('Recarregar Lista')
        self.refresh_btn.clicked.connect(self.load_equipamentos)
        self.btn_layout.addWidget(self.refresh_btn)
        self.layout.addLayout(self.btn_layout)

    def adicionar_equipamento(self):
        ip = self.ip_input.text().strip()
        porta = self.porta_input.text().strip()
        desc = self.desc_input.text().strip()
        idx = self.loja_combo.currentIndex()
        loja = self.loja_combo.itemData(idx)
        loja_codigo = loja.get('codigo') if loja else None
        if not ip or not porta or not desc or not loja_codigo:
            QMessageBox.warning(self, 'Erro', 'Preencha todos os campos e selecione uma loja!')
            return
        try:
            if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    try:
                        config = json.load(f)
                    except Exception:
                        config = {"lojas": [], "equipamentos": []}
            else:
                config = {"lojas": [], "equipamentos": []}
            if "equipamentos" not in config:
                config["equipamentos"] = []
            config["equipamentos"].append({"ip": ip, "porta": int(porta), "descricao": desc, "loja": loja_codigo})
            with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
                json.dump(config, f, indent=2)
            self.load_equipamentos()
            self.ip_input.clear()
            self.porta_input.clear()
            self.desc_input.clear()
            QMessageBox.information(self, 'Sucesso', 'Equipamento cadastrado!')
        except Exception as e:
            QMessageBox.critical(self, 'Erro', f'Falha ao cadastrar equipamento: {str(e)}')

    def remover_equipamento(self):
        row = self.table.currentRow()
        if row < 0:
            QMessageBox.warning(self, 'Erro', 'Selecione um equipamento para remover!')
            return
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
            equipamentos = config.get('equipamentos', [])
            if row < len(equipamentos):
                equipamentos.pop(row)
                config['equipamentos'] = equipamentos
                with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
                    json.dump(config, f, indent=2)
                self.load_equipamentos()
                QMessageBox.information(self, 'Sucesso', 'Equipamento removido!')
        except Exception as e:
            QMessageBox.critical(self, 'Erro', f'Falha ao remover equipamento: {str(e)}')

    def editar_equipamento(self):
        row = self.table.currentRow()
        if row < 0:
            QMessageBox.warning(self, 'Erro', 'Selecione um equipamento para editar!')
            return
        ip = self.ip_input.text().strip()
        porta = self.porta_input.text().strip()
        desc = self.desc_input.text().strip()
        idx = self.loja_combo.currentIndex()
        loja = self.loja_combo.itemData(idx)
        loja_codigo = loja.get('codigo') if loja else None
        if not ip or not porta or not desc or not loja_codigo:
            QMessageBox.warning(self, 'Erro', 'Preencha todos os campos e selecione uma loja!')
            return
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
            equipamentos = config.get('equipamentos', [])
            if row < len(equipamentos):
                equipamentos[row] = {"ip": ip, "porta": int(porta), "descricao": desc, "loja": loja_codigo}
                config['equipamentos'] = equipamentos
                with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
                    json.dump(config, f, indent=2)
                self.load_equipamentos()
                QMessageBox.information(self, 'Sucesso', 'Equipamento editado!')
        except Exception as e:
            QMessageBox.critical(self, 'Erro', f'Falha ao editar equipamento: {str(e)}')

class MonitoramentoWidget(QWidget):
    def __init__(self):
        super().__init__()
        from PyQt5.QtCore import QTimer
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)
        self.title = QLabel('<b>Monitoramento</b>')
        self.title.setStyleSheet('font-size:18px;')
        self.layout.addWidget(self.title)
        self.status_label = QLabel('Status dos equipamentos:')
        self.layout.addWidget(self.status_label)
        # Botão de recarregar
        self.refresh_btn = QPushButton('Recarregar')
        self.refresh_btn.setToolTip('Atualiza os dados de monitoramento')
        self.refresh_btn.clicked.connect(self.carregar_status)
        self.layout.addWidget(self.refresh_btn)
        # Checkbox de auto-refresh
        self.auto_refresh_cb = QCheckBox('Atualizar automaticamente a cada 30s')
        self.auto_refresh_cb.stateChanged.connect(self.toggle_auto_refresh)
        self.layout.addWidget(self.auto_refresh_cb)
        self.status_table = QTableWidget()
        self.layout.addWidget(self.status_table)
        self.hist_label = QLabel('Histórico de atualizações:')
        self.layout.addWidget(self.hist_label)
        self.hist_output = QTextEdit()
        self.hist_output.setReadOnly(True)
        self.layout.addWidget(self.hist_output)
        # Table to display recent ACKs
        # Controls for ACKs: table + export/clear
        self.acks_table = QTableWidget()
        self.acks_table.setColumnCount(3)
        self.acks_table.setHorizontalHeaderLabels(['Tipo', 'TS', 'Payload'])
        self.layout.addWidget(self.acks_table)
        # Export / Clear buttons
        self.acks_btn_layout = QHBoxLayout()
        self.export_btn = QPushButton('Exportar ACKs')
        self.export_btn.setToolTip('Exporta os ACKs persistidos para um arquivo')
        self.export_btn.clicked.connect(self.export_acks)
        self.clear_btn = QPushButton('Limpar ACKs')
        self.clear_btn.setToolTip('Limpa os ACKs persistidos no agente')
        self.clear_btn.clicked.connect(self.clear_acks)
        self.acks_btn_layout.addWidget(self.export_btn)
        self.acks_btn_layout.addWidget(self.clear_btn)
        self.layout.addLayout(self.acks_btn_layout)
        self.alerta_label = QLabel('Alertas:')
        self.layout.addWidget(self.alerta_label)
        self.alerta_output = QLabel('-')
        self.alerta_output.setWordWrap(True)
        self.layout.addWidget(self.alerta_output)
        # API write support status (from agent_status.json)
        self.api_status_label = QLabel('API write suportado: -')
        self.api_status_label.setWordWrap(True)
        self.layout.addWidget(self.api_status_label)
        self.api_error_label = QLabel('API write error: -')
        self.api_error_label.setWordWrap(True)
        self.layout.addWidget(self.api_error_label)
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.carregar_status)
        self.carregar_status()

    def toggle_auto_refresh(self, state):
        if state == Qt.Checked:
            self.timer.start(30000)  # 30 segundos
        else:
            self.timer.stop()

    def carregar_status(self):
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
            equipamentos = config.get('equipamentos', [])
            self.status_table.setRowCount(len(equipamentos))
            self.status_table.setColumnCount(4)
            self.status_table.setHorizontalHeaderLabels(['IP', 'Porta', 'Descrição', 'Status'])
            for i, eq in enumerate(equipamentos):
                self.status_table.setItem(i, 0, QTableWidgetItem(str(eq.get('ip', ''))))
                self.status_table.setItem(i, 1, QTableWidgetItem(str(eq.get('porta', ''))))
                self.status_table.setItem(i, 2, QTableWidgetItem(eq.get('descricao', '')))
                status = eq.get('status', 'Desconhecido')
                item_status = QTableWidgetItem(status)
                # Colorir status
                try:
                    if status.lower() in ['ok', 'online', 'ativo']:
                        item_status.setBackground(Qt.green)
                    elif status.lower() in ['desconhecido', 'erro', 'offline', 'inativo']:
                        item_status.setBackground(Qt.red)
                    else:
                        item_status.setBackground(Qt.yellow)
                except Exception:
                    pass
                self.status_table.setItem(i, 3, item_status)
            # Exibir histórico formatado (config) e também trazer ACKs recentes do agente
            historico = config.get('historico_atualizacoes', [])
            texto_parts = []
            if isinstance(historico, list) and historico:
                texto_parts.append('Historico (config):')
                texto_parts.extend([
                    f"[{h.get('data', '')}] {h.get('evento', h)}" if isinstance(h, dict) else str(h)
                    for h in historico
                ])
            # Tentar buscar ACKs do servidor HTTP admin local
            try:
                port = int(config.get('http_port', 8010) or 8010)
                url = f'http://127.0.0.1:{port}/acks?lines=100'
                headers = {}
                token = config.get('ack_token')
                if token:
                    headers['X-ACK-Token'] = token
                resp = requests.get(url, headers=headers, timeout=3)
                if resp.status_code == 200:
                    j = resp.json()
                    acks = j.get('acks', [])
                    if acks:
                        texto_parts.append('\nACKs recentes:')
                        for a in acks:
                            ts = a.get('ts') or a.get('payload', {}).get('_received_at', '')
                            tipo = a.get('type')
                            payload = a.get('payload')
                            texto_parts.append(f"[{ts}] {tipo}: {payload}")
                            # populate acks table
                            try:
                                row = self.acks_table.rowCount()
                                self.acks_table.insertRow(row)
                                self.acks_table.setItem(row, 0, QTableWidgetItem(str(tipo)))
                                self.acks_table.setItem(row, 1, QTableWidgetItem(str(ts)))
                                self.acks_table.setItem(row, 2, QTableWidgetItem(json.dumps(payload, ensure_ascii=False)))
                            except Exception:
                                pass
            except Exception:
                # não bloquear se falhar ao buscar ACKs
                pass

            # keep the table limited to 500 rows
            try:
                while self.acks_table.rowCount() > 500:
                    self.acks_table.removeRow(0)
            except Exception:
                pass
            texto_hist = '\n'.join(texto_parts)
            self.hist_output.setText(texto_hist)
            # Destacar alerta
            alertas = config.get('alertas', '-')
            if alertas and alertas != '-' and str(alertas).strip():
                self.alerta_output.setText(f'<b style="color:red;">{alertas}</b>')
                self.alerta_output.setStyleSheet('background:#ffe0e0; border:1px solid #ff0000; padding:4px;')
            else:
                self.alerta_output.setText('-')
                self.alerta_output.setStyleSheet('')
            # Mostrar status de escrita API a partir de agent_status.json
            try:
                agent_status_path = os.path.join(os.environ.get('LOCALAPPDATA', os.getcwd()), 'AgentePRECIX', 'agent_status.json')
                api_supported = '-'
                api_error = '-'
                if os.path.exists(agent_status_path):
                    with open(agent_status_path, 'r', encoding='utf-8') as fh:
                        st = json.load(fh) or {}
                    api_supported = str(st.get('api_write_supported', '-'))
                    api_error = str(st.get('api_write_error', '-'))
                self.api_status_label.setText(f'API write suportado: {api_supported}')
                self.api_error_label.setText(f'API write error: {api_error}')
            except Exception:
                pass
        except Exception as e:
            self.hist_output.setText('Erro ao carregar monitoramento: ' + str(e))
            self.alerta_output.setText('-')
            self.alerta_output.setStyleSheet('')

    def export_acks(self):
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                cfg = json.load(f)
        except Exception:
            cfg = {}
        port = int(cfg.get('http_port', 8010) or 8010)
        url = f'http://127.0.0.1:{port}/acks/export'
        headers = {}
        token = cfg.get('ack_token')
        if token:
            headers['X-ACK-Token'] = token
        try:
            resp = requests.get(url, headers=headers, timeout=10)
            if resp.status_code == 200:
                # ask user where to save
                from PyQt5.QtWidgets import QFileDialog
                fname, _ = QFileDialog.getSaveFileName(self, 'Salvar ACKs como', 'acks.jsonl', 'JSONL Files (*.jsonl);;All Files (*)')
                if fname:
                    with open(fname, 'wb') as fh:
                        fh.write(resp.content)
        except Exception as e:
            QMessageBox.warning(self, 'Erro', f'Falha ao exportar ACKs: {e}')

    def clear_acks(self):
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                cfg = json.load(f)
        except Exception:
            cfg = {}
        port = int(cfg.get('http_port', 8010) or 8010)
        url = f'http://127.0.0.1:{port}/acks/clear'
        headers = {}
        token = cfg.get('ack_token')
        if token:
            headers['X-ACK-Token'] = token
        try:
            resp = requests.post(url, headers=headers, timeout=5)
            if resp.status_code == 200:
                QMessageBox.information(self, 'OK', 'ACKs limpos com sucesso')
                # refresh view
                self.carregar_status()
            else:
                QMessageBox.warning(self, 'Erro', f'Falha ao limpar ACKs: {resp.status_code}')
        except Exception as e:
            QMessageBox.warning(self, 'Erro', f'Falha ao limpar ACKs: {e}')

class LogsWidget(QWidget):
    def __init__(self):
        super().__init__()
        import os
        from PyQt5.QtCore import QTimer
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)
        self.title = QLabel('<b>Logs</b>')
        self.title.setStyleSheet('font-size:18px;')
        self.layout.addWidget(self.title)
        # Caminho do log
        self.log_path = os.path.abspath('agente.log')
        self.path_label = QLabel(f'<span style="font-size:10px;color:#888;">Arquivo: {self.log_path}</span>')
        self.layout.addWidget(self.path_label)
        # Botão recarregar
        self.refresh_btn = QPushButton('Recarregar')
        self.refresh_btn.setToolTip('Atualiza o conteúdo do log')
        self.refresh_btn.clicked.connect(self.carregar_logs)
        self.layout.addWidget(self.refresh_btn)
        self.logs_output = QTextEdit()
        self.logs_output.setReadOnly(True)
        self.layout.addWidget(self.logs_output)
        self.carregar_logs()

    def carregar_logs(self):
        import os
        try:
            # tentar via HTTP admin endpoint primeiro
            cfg = {}
            try:
                if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                    with open(CONFIG_PATH, 'r', encoding='utf-8') as fh:
                        cfg = json.load(fh)
            except Exception:
                cfg = {}
            port = int(cfg.get('http_port', 8010) or 8010)
            url = f'http://127.0.0.1:{port}/logs?lines=500'
            headers = {}
            token = cfg.get('ack_token')
            if token:
                headers['X-ACK-Token'] = token
            try:
                resp = requests.get(url, headers=headers, timeout=3)
                if resp.status_code == 200:
                    j = resp.json()
                    lines = j.get('lines', [])
                else:
                    lines = []
            except Exception:
                lines = []

            # fallback para arquivo local se nao tiver linhas
            if not lines:
                if not os.path.exists('agente.log') or os.path.getsize('agente.log') == 0:
                    self.logs_output.setText('Nenhum evento registrado.')
                    return
                with open('agente.log', 'r', encoding='utf-8') as f:
                    lines = f.readlines()
            # Limitar a 500 últimas linhas
            if len(lines) > 500:
                lines = lines[-500:]
            # Destacar erros/avisos
            html = ''
            for line in lines:
                l = line if isinstance(line, str) else str(line)
                if 'ERROR' in l.upper():
                    html += f'<span style="color:#b00;font-weight:bold;">{l.strip()}</span><br>'
                elif 'WARNING' in l.upper():
                    html += f'<span style="color:#e69500;">{l.strip()}</span><br>'
                else:
                    html += f'{l.strip()}<br>'
            self.logs_output.setHtml(html)
            # Auto-rolagem para o final
            self.logs_output.moveCursor(self.logs_output.textCursor().End)
        except Exception as e:
            self.logs_output.setText(f'Erro ao carregar log: {e}')

# Certifique-se de que todas as classes de widgets estão definidas antes da classe EquipamentosGUI

class EquipamentosGUI(QWidget):
    def __init__(self):
        from PyQt5.QtWidgets import QApplication
        if QApplication.instance() is None:
            self._app = QApplication(sys.argv)
        super().__init__()
        self.setWindowTitle('Agente Local PRECIX')
        self.setMinimumSize(800, 600)
        self.setMaximumSize(900, 700)
        self.resize(850, 650)
        self.tabs = QTabWidget()
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)
        self.layout.addWidget(self.tabs)
        # Aba de lojas
        self.loja_tab = LojaWidget()
        self.tabs.addTab(self.loja_tab, 'Lojas')
        # Aba de equipamentos
        self.equip_tab = EquipamentosWidget()
        self.tabs.addTab(self.equip_tab, 'Equipamentos')
        # Aba de configuração de arquivo
        self.config_tab = ConfiguracaoArquivoWidget()
        self.tabs.addTab(self.config_tab, 'Arquivo')
        # Aba de integração API
        self.integracao_tab = IntegracaoPrecixWidget()
        self.tabs.addTab(self.integracao_tab, 'API')
        # Nova aba de banco de dados
        self.banco_tab = BancoDadosWidget()
        self.tabs.addTab(self.banco_tab, 'Banco de Dados')
        # Aba de envio
        self.envio_tab = EnvioWidget()
        self.tabs.addTab(self.envio_tab, 'Envio')
        # Aba de monitoramento
        self.monitoramento_tab = MonitoramentoWidget()
        self.tabs.addTab(self.monitoramento_tab, 'Monitoramento')
        # Aba de logs
        self.logs_tab = LogsWidget()
        self.tabs.addTab(self.logs_tab, 'Logs')
        # Aba de automação
        self.automacao_tab = AutomacaoWidget()
        self.tabs.addTab(self.automacao_tab, 'Automação')

        # Timer para automação de processamento do arquivo do cliente
        from PyQt5.QtCore import QTimer
        self.timer_entrada = QTimer(self)
        self.timer_entrada.timeout.connect(self.processar_entrada_automatica)
        self.iniciar_timer_entrada()

# Ajuste de estilo global para compactar
        self.setStyleSheet('''
                QLabel { font-size: 12px; }
                QLineEdit, QComboBox { font-size: 12px; padding: 1px; }
                QPushButton {
                    font-size: 12px;
                    padding: 2px 8px;
                    background: qlineargradient(x1:0, y1:0, x2:0, y2:1, stop:0 #2196F3, stop:1 #1565C0);
                    color: white;
                    border-radius: 4px;
                    min-height: 24px;
                    max-height: 28px;
                    min-width: 120px;
                    border: none;
                }
                QPushButton:pressed {
                    background: #0d47a1;
                }
                QCheckBox { font-size: 12px; }
                QTabWidget::pane { border: 1px solid #ccc; }
                QTextEdit { font-size: 12px; }
            ''')

    def iniciar_timer_entrada(self):
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
            intervalo = int(config.get('automacao_intervalo', 30))
        except Exception:
            intervalo = 30
        self.timer_entrada.start(intervalo * 60 * 1000)  # minutos para ms333333

    def processar_entrada_automatica(self):
        self.config_tab.processar_arquivo_entrada_automatico()



def main():
    app = QApplication(sys.argv)
    window = EquipamentosGUI()
    window.show()
    sys.exit(app.exec_())

if __name__ == "__main__":
    main()

# ---
# FLUXO HÍBRIDO DE INTEGRAÇÃO
# O campo 'Fonte de Dados' (tipo_integracao) define de onde buscar os dados principais (Arquivo, API, Banco de Dados).
# Independentemente da fonte, o sistema SEMPRE gera o arquivo texto para os equipamentos legados/PDVs.
# Os equipamentos PWA continuam sendo alimentados pela API configurada.
# Se a fonte for API, os dados vêm da API e são salvos no arquivo texto.
# Se a fonte for Banco de Dados, os dados vêm do banco e também são salvos no arquivo texto.
# Se a fonte for Arquivo, o arquivo é usado diretamente.
# Isso garante compatibilidade total e migração gradual.
# ---
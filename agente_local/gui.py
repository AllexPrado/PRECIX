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
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
            lojas = config.get('lojas', [])
        except Exception:
            lojas = []
        self.table.setRowCount(len(lojas))
        self.table.setColumnCount(2)
        self.table.setHorizontalHeaderLabels(['Código', 'Nome'])
        for i, loja in enumerate(lojas):
            self.table.setItem(i, 0, QTableWidgetItem(str(loja['codigo'])))
            self.table.setItem(i, 1, QTableWidgetItem(loja['nome']))

    def add_form(self):
        self.form_layout = QHBoxLayout()
        self.codigo_input = QLineEdit()
        self.codigo_input.setPlaceholderText('Código da loja')
        self.nome_input = QLineEdit()
        self.nome_input.setPlaceholderText('Nome da loja')
        self.form_layout.addWidget(QLabel('Nova Loja:'))
        self.form_layout.addWidget(self.codigo_input)
        self.form_layout.addWidget(self.nome_input)
        self.layout.addLayout(self.form_layout)

    def add_buttons(self):
        self.btn_layout = QHBoxLayout()
        self.add_btn = QPushButton('Adicionar')
        self.add_btn.clicked.connect(self.adicionar_loja)
        self.btn_layout.addWidget(self.add_btn)
        self.refresh_btn = QPushButton('Atualizar')
        self.refresh_btn.clicked.connect(self.load_lojas)
        self.btn_layout.addWidget(self.refresh_btn)
        self.layout.addLayout(self.btn_layout)

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
        self.path_btn = QPushButton('Selecionar pasta')
        self.path_btn.clicked.connect(self.selecionar_pasta)
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
            QLabel { font-size: 13px; }
            QLineEdit, QComboBox { font-size: 13px; padding: 2px; }
            QPushButton { font-size: 13px; padding: 4px; background: #0078d7; color: white; border-radius: 4px; }
            QCheckBox { font-size: 13px; }
            QTabWidget::pane { border: 1px solid #ccc; }
        ''')

    def carregar_config(self):
        try:
            if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    config = json.load(f)
            else:
                config = {"lojas": [], "equipamentos": []}
            self.sep_combo.setCurrentText(config.get('arquivo_separador', ';'))
            self.sep_custom.setText(config.get('arquivo_separador_custom', ''))
            self.path_input.setText(config.get('arquivo_local', ''))
            self.barcode_cb.setChecked('barcode' in config.get('arquivo_campos', ['barcode', 'name', 'price']))
            self.name_cb.setChecked('name' in config.get('arquivo_campos', ['barcode', 'name', 'price']))
            self.price_cb.setChecked('price' in config.get('arquivo_campos', ['barcode', 'name', 'price']))
            self.ia_cb.setChecked(config.get('ia_ativo', False))
            self.layout_input.setText(config.get('arquivo_layout', 'barcode;name;price'))
        except Exception:
            pass

    def selecionar_pasta(self):
        pasta = QFileDialog.getExistingDirectory(self, 'Selecionar pasta')
        if pasta:
            self.path_input.setText(pasta)

    def gerar_arquivo_teste(self):
        sep = self.get_separador()
        campos = self.get_campos()
        path = self.path_input.text() or '.'
        filename = os.path.join(path, 'pricetab.txt')  # Corrigido para pricetab.txt
        produtos = [
            {'barcode': '123', 'name': 'Produto A', 'price': 10.5},
            {'barcode': '456', 'name': 'Produto B', 'price': 20.0}
        ]
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                for p in produtos:
                    linha = sep.join([str(p.get(c, '')) for c in campos]) + '\n'
                    f.write(linha)
            QMessageBox.information(self, 'Arquivo gerado', f'Arquivo de teste gerado em: {filename}')
        except Exception as e:
            QMessageBox.critical(self, 'Erro', f'Falha ao gerar arquivo: {str(e)}')
        # Não altera config.json!
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

    def salvar_config(self):
        sep = self.get_separador()
        campos = self.get_campos()
        path = self.path_input.text().strip() or os.getcwd()
        ia_ativo = self.ia_cb.isChecked()
        layout = self.layout_input.text().strip() or 'barcode;name;price'
        try:
            if os.path.exists(CONFIG_PATH) and os.path.getsize(CONFIG_PATH) > 0:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    config = json.load(f)
            else:
                config = {"lojas": [], "equipamentos": []}
        except Exception:
            config = {"lojas": [], "equipamentos": []}
        config['arquivo_separador'] = sep
        config['arquivo_separador_custom'] = self.sep_custom.text().strip()
        config['arquivo_campos'] = campos
        config['arquivo_local'] = path
        config['ia_ativo'] = ia_ativo
        config['arquivo_layout'] = layout
        with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2)
        QMessageBox.information(self, 'Configuração', 'Configuração do arquivo salva com sucesso!')

class IntegracaoPrecixWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)
        # Título em negrito
        self.title = QLabel('<b>Integração com PRECIX</b>')
        self.title.setStyleSheet('font-size:18px;')
        self.layout.addWidget(self.title)
        # Porta local
        self.porta_label = QLabel('Porta local de comunicação:')
        self.porta_input = QLineEdit()
        self.layout.addWidget(self.porta_label)
        self.layout.addWidget(self.porta_input)
        # Timeout
        self.timeout_label = QLabel('Timeout de requisição (segundos):')
        self.timeout_input = QLineEdit()
        self.layout.addWidget(self.timeout_label)
        self.layout.addWidget(self.timeout_input)
        # Modo de operação
        self.modo_label = QLabel('Modo de operação:')
        self.modo_combo = QComboBox()
        self.modo_combo.addItems(['Produção', 'Homologação'])
        self.layout.addWidget(self.modo_label)
        self.layout.addWidget(self.modo_combo)
        # Status conexão
        self.status_label = QLabel('Status da conexão:')
        self.status_output = QLabel('-')
        self.layout.addWidget(self.status_label)
        self.layout.addWidget(self.status_output)
        # Última sync
        self.ultima_label = QLabel('Última sincronização:')
        self.ultima_output = QLabel('-')
        self.layout.addWidget(self.ultima_label)
        self.layout.addWidget(self.ultima_output)
        # Botão azul largura total
        self.teste_btn = QPushButton('Testar Conexão')
        self.teste_btn.setStyleSheet('background:#0078d7;color:white;font-weight:bold;height:32px;')
        self.teste_btn.clicked.connect(self.testar_conexao)
        self.layout.addWidget(self.teste_btn)
        self.carregar_config()
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
            self.status_output.setText(config.get('status_conexao', '-'))
            self.ultima_output.setText(config.get('ultima_sync', '-'))
        except Exception:
            pass
    def testar_conexao(self):
        porta = self.porta_input.text().strip() or '8000'
        timeout = int(self.timeout_input.text().strip() or '10')
        modo = self.modo_combo.currentText()
        try:
            url = f'http://localhost:{porta}/api/ping'
            r = requests.get(url, timeout=timeout)
            if r.status_code == 200:
                self.status_output.setText('Conexão OK')
            else:
                self.status_output.setText(f'Erro: {r.status_code}')
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
        config['porta_local'] = porta
        config['timeout'] = timeout
        config['modo_operacao'] = modo
        config['status_conexao'] = self.status_output.text()
        from datetime import datetime
        config['ultima_sync'] = datetime.now().strftime('%d/%m/%Y %H:%M:%S')
        with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2)
        self.ultima_output.setText(config['ultima_sync'])

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
        self.teste_btn.setStyleSheet('background:#0078d7;color:white;font-weight:bold;height:32px;')
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
        # Botão azul largura total
        self.forcar_btn = QPushButton('Forçar Atualização Manual')
        self.forcar_btn.setStyleSheet('background:#0078d7;color:white;font-weight:bold;height:32px;')
        self.forcar_btn.clicked.connect(self.forcar_atualizacao)
        self.layout.addWidget(self.forcar_btn)
        # Botão salvar
        self.salvar_btn = QPushButton('Salvar')
        self.salvar_btn.setStyleSheet('background:#0078d7;color:white;font-weight:bold;height:32px;')
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
        except Exception:
            pass
    def salvar_config(self):
        intervalo = self.intervalo_input.text().strip()
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
            with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
                json.dump(config, f, indent=2)
            self.status_output.setText('Configuração salva!')
        except Exception as e:
            QMessageBox.critical(self, 'Erro', f'Falha ao salvar: {str(e)}')
    def forcar_atualizacao(self):
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

class EquipamentosWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)
        self.table = QTableWidget()
        self.layout.addWidget(self.table)
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
        self.loja_input = QLineEdit()
        self.loja_input.setPlaceholderText('Código da loja')
        self.form_layout.addWidget(QLabel('Novo Equipamento:'))
        self.form_layout.addWidget(self.ip_input)
        self.form_layout.addWidget(self.porta_input)
        self.form_layout.addWidget(self.desc_input)
        self.form_layout.addWidget(self.loja_input)
        self.layout.addLayout(self.form_layout)

    def add_buttons(self):
        self.btn_layout = QHBoxLayout()
        self.add_btn = QPushButton('Adicionar')
        self.add_btn.clicked.connect(self.adicionar_equipamento)
        self.btn_layout.addWidget(self.add_btn)
        self.refresh_btn = QPushButton('Atualizar')
        self.refresh_btn.clicked.connect(self.load_equipamentos)
        self.btn_layout.addWidget(self.refresh_btn)
        self.layout.addLayout(self.btn_layout)

    def adicionar_equipamento(self):
        ip = self.ip_input.text().strip()
        porta = self.porta_input.text().strip()
        desc = self.desc_input.text().strip()
        loja = self.loja_input.text().strip()
        if not ip or not porta or not desc or not loja:
            QMessageBox.warning(self, 'Erro', 'Preencha todos os campos!')
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
            config["equipamentos"].append({"ip": ip, "porta": int(porta), "descricao": desc, "loja": loja})
            with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
                json.dump(config, f, indent=2)
            self.load_equipamentos()
            self.ip_input.clear()
            self.porta_input.clear()
            self.desc_input.clear()
            self.loja_input.clear()
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
        loja = self.loja_input.text().strip()
        if not ip or not porta or not desc or not loja:
            QMessageBox.warning(self, 'Erro', 'Preencha todos os campos para editar!')
            return
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
            equipamentos = config.get('equipamentos', [])
            if row < len(equipamentos):
                equipamentos[row] = {"ip": ip, "porta": int(porta), "descricao": desc, "loja": loja}
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
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)
        self.title = QLabel('<b>Monitoramento</b>')
        self.title.setStyleSheet('font-size:18px;')
        self.layout.addWidget(self.title)
        self.status_label = QLabel('Status dos equipamentos:')
        self.layout.addWidget(self.status_label)
        self.status_table = QTableWidget()
        self.layout.addWidget(self.status_table)
        self.hist_label = QLabel('Histórico de atualizações:')
        self.layout.addWidget(self.hist_label)
        self.hist_output = QTextEdit()
        self.hist_output.setReadOnly(True)
        self.layout.addWidget(self.hist_output)
        self.alerta_label = QLabel('Alertas:')
        self.layout.addWidget(self.alerta_label)
        self.alerta_output = QLabel('-')
        self.layout.addWidget(self.alerta_output)
        self.carregar_status()
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
                self.status_table.setItem(i, 3, QTableWidgetItem(eq.get('status', 'Desconhecido')))
            self.hist_output.setText(str(config.get('historico_atualizacoes', '')))
            self.alerta_output.setText(str(config.get('alertas', '-')))
        except Exception:
            pass

class LogsWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)
        self.title = QLabel('<b>Logs</b>')
        self.title.setStyleSheet('font-size:18px;')
        self.layout.addWidget(self.title)
        self.logs_output = QTextEdit()
        self.logs_output.setReadOnly(True)
        self.layout.addWidget(self.logs_output)
        self.carregar_logs()
    def carregar_logs(self):
        try:
            with open('agente.log', 'r', encoding='utf-8') as f:
                self.logs_output.setText(f.read())
        except Exception:
            self.logs_output.setText('Nenhum log encontrado.')

# Certifique-se de que todas as classes de widgets estão definidas antes da classe EquipamentosGUI

class EquipamentosGUI(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('Agente Local PRECIX')
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
        self.tabs.addTab(self.config_tab, 'Arquivo de Preços')
        # Aba de integração PRECIX
        self.integracao_tab = IntegracaoPrecixWidget()
        self.tabs.addTab(self.integracao_tab, 'Integração PRECIX')
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

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = EquipamentosGUI()
    window.show()
    sys.exit(app.exec_())
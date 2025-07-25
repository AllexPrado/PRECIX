"""
Interface gráfica (GUI) do Agente Local PRECIX
Permite cadastro, edição e remoção de equipamentos legados
"""

import sys
import json
import os
from PyQt5.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QHBoxLayout, QPushButton,
    QTableWidget, QTableWidgetItem, QLineEdit, QLabel, QMessageBox,
    QComboBox, QFileDialog, QCheckBox, QTabWidget, QTextEdit
)
from PyQt5.QtGui import QIcon, QPixmap
from PyQt5.QtCore import Qt

CONFIG_PATH = 'config.json'

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
            # Verifica se o arquivo existe e tem conteúdo válido
            if not os.path.exists(CONFIG_PATH) or os.path.getsize(CONFIG_PATH) == 0:
                config = {"lojas": []}
            else:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    try:
                        config = json.load(f)
                    except Exception:
                        config = {"lojas": []}
            if "lojas" not in config:
                config["lojas"] = []
            config["lojas"].append({"codigo": codigo, "nome": nome})
            with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
                json.dump(config, f, indent=2)
            self.load_lojas()
            self.codigo_input.clear()
            self.nome_input.clear()
            QMessageBox.information(self, 'Sucesso', 'Loja cadastrada!')
        except Exception as e:
            QMessageBox.critical(self, 'Erro', f'Falha ao cadastrar loja: {str(e)}')

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
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
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
        filename = os.path.join(path, 'pricetab_teste.txt')
        produtos = [
            {'barcode': '123', 'name': 'Produto A', 'price': 10.5},
            {'barcode': '456', 'name': 'Produto B', 'price': 20.0}
        ]
        with open(filename, 'w', encoding='utf-8') as f:
            for p in produtos:
                linha = sep.join([str(p.get(c, '')) for c in campos]) + '\n'
                f.write(linha)
        QMessageBox.information(self, 'Arquivo gerado', f'Arquivo de teste gerado em: {filename}')
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
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
        except Exception:
            config = {}
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
        self.title = QLabel('<h2>Integração com PRECIX</h2>')
        self.layout.addWidget(self.title)
        # Porta local
        self.porta_label = QLabel('Porta local de comunicação:')
        self.porta_input = QLineEdit()
        self.porta_input.setPlaceholderText('Ex: 8000')
        self.layout.addWidget(self.porta_label)
        self.layout.addWidget(self.porta_input)
        # Timeout
        self.timeout_label = QLabel('Timeout de requisição (segundos):')
        self.timeout_input = QLineEdit()
        self.timeout_input.setPlaceholderText('Ex: 10')
        self.layout.addWidget(self.timeout_label)
        self.layout.addWidget(self.timeout_input)
        # Modo de operação
        self.modo_label = QLabel('Modo de operação:')
        self.modo_combo = QComboBox()
        self.modo_combo.addItems(['Produção', 'Teste'])
        self.layout.addWidget(self.modo_label)
        self.layout.addWidget(self.modo_combo)
        # Status da conexão
        self.status_label = QLabel('Status da conexão:')
        self.status_output = QLabel('Desconhecido')
        self.layout.addWidget(self.status_label)
        self.layout.addWidget(self.status_output)
        # Última sincronização
        self.sync_label = QLabel('Última sincronização:')
        self.sync_output = QLabel('-')
        self.layout.addWidget(self.sync_label)
        self.layout.addWidget(self.sync_output)
        # Botão de teste de conexão
        self.teste_btn = QPushButton('Testar Conexão')
        self.teste_btn.clicked.connect(self.testar_conexao)
        self.layout.addWidget(self.teste_btn)
        # Carregar configurações
        self.carregar_config()
        # Estilo visual
        self.setStyleSheet('''
            QLabel { font-size: 13px; }
            QLineEdit, QComboBox { font-size: 13px; padding: 2px; }
            QPushButton { font-size: 13px; padding: 4px; background: #0078d7; color: white; border-radius: 4px; }
        ''')

    def carregar_config(self):
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
            self.porta_input.setText(str(config.get('porta_local', '8000')))
            self.timeout_input.setText(str(config.get('timeout', '10')))
            self.modo_combo.setCurrentText(config.get('modo_operacao', 'Produção'))
            self.status_output.setText(config.get('status_conexao', 'Desconhecido'))
            self.sync_output.setText(config.get('ultima_sync', '-'))
        except Exception:
            pass

    def testar_conexao(self):
        # Simulação de teste de conexão
        import requests
        porta = self.porta_input.text().strip() or '8000'
        timeout = int(self.timeout_input.text().strip() or '10')
        modo = self.modo_combo.currentText()
        try:
            # O endpoint real não é exibido, apenas testado internamente
            url = f'http://localhost:{porta}/api/ping'
            r = requests.get(url, timeout=timeout)
            if r.status_code == 200:
                self.status_output.setText('Conexão OK')
            else:
                self.status_output.setText(f'Erro: {r.status_code}')
        except Exception as e:
            self.status_output.setText(f'Falha: {str(e)[:60]}')
        # Atualiza última sincronização
        from datetime import datetime
        self.sync_output.setText(datetime.now().strftime('%d/%m/%Y %H:%M:%S'))
        # Salva status no config
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
        except Exception:
            config = {}
        config['porta_local'] = porta
        config['timeout'] = timeout
        config['modo_operacao'] = modo
        config['status_conexao'] = self.status_output.text()
        config['ultima_sync'] = self.sync_output.text()
        with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2)

class EnvioWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)
        self.title = QLabel('<h2>Envio de Arquivos</h2>')
        self.layout.addWidget(self.title)
        self.metodo_label = QLabel('Método de envio:')
        self.metodo_combo = QComboBox()
        self.metodo_combo.addItems(['FTP', 'TCP', 'Local'])
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
        self.teste_btn = QPushButton('Testar Envio')
        self.teste_btn.clicked.connect(self.testar_envio)
        self.layout.addWidget(self.teste_btn)
        self.status_output = QLabel('Status: -')
        self.layout.addWidget(self.status_output)
        self.carregar_config()
        self.setStyleSheet('''
            QLabel { font-size: 13px; }
            QLineEdit, QComboBox { font-size: 13px; padding: 2px; }
            QPushButton { font-size: 13px; padding: 4px; background: #0078d7; color: white; border-radius: 4px; }
        ''')

    def carregar_config(self):
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
            self.metodo_combo.setCurrentText(config.get('envio_metodo', 'FTP'))
            self.host_input.setText(config.get('envio_host', ''))
            self.porta_input.setText(str(config.get('envio_porta', '21')))
            self.usuario_input.setText(config.get('envio_usuario', ''))
            self.senha_input.setText(config.get('envio_senha', ''))
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
                import ftplib
                ftp = ftplib.FTP()
                ftp.connect(host, porta, timeout=5)
                ftp.login(usuario, senha)
                ftp.quit()
                self.status_output.setText('FTP OK')
            elif metodo == 'TCP':
                import socket
                s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                s.settimeout(5)
                s.connect((host, porta))
                s.close()
                self.status_output.setText('TCP OK')
            else:
                self.status_output.setText('Local: Nenhum teste necessário')
        except Exception as e:
            self.status_output.setText(f'Falha: {str(e)[:60]}')
        # Salva config
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
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

class MonitoramentoWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)
        self.title = QLabel('<h2>Monitoramento</h2>')
        self.layout.addWidget(self.title)
        self.status_label = QLabel('Status dos equipamentos:')
        self.layout.addWidget(self.status_label)
        self.status_table = QTableWidget()
        self.layout.addWidget(self.status_table)
        self.historico_label = QLabel('Histórico de atualizações:')
        self.layout.addWidget(self.historico_label)
        self.historico_output = QTextEdit()
        self.historico_output.setReadOnly(True)
        self.layout.addWidget(self.historico_output)
        self.alerta_label = QLabel('Alertas:')
        self.layout.addWidget(self.alerta_label)
        self.alerta_output = QLabel('-')
        self.layout.addWidget(self.alerta_output)
        self.carregar_status()
        self.setStyleSheet('''
            QLabel { font-size: 13px; }
            QTableWidget { font-size: 13px; }
            QTextEdit { font-size: 13px; }
        ''')

    def carregar_status(self):
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
            equipamentos = config.get('equipamentos', [])
            self.status_table.setRowCount(len(equipamentos))
            self.status_table.setColumnCount(4)
            self.status_table.setHorizontalHeaderLabels(['IP', 'Porta', 'Descrição', 'Status'])
            for i, eq in enumerate(equipamentos):
                self.status_table.setItem(i, 0, QTableWidgetItem(str(eq['ip'])))
                self.status_table.setItem(i, 1, QTableWidgetItem(str(eq['porta'])))
                self.status_table.setItem(i, 2, QTableWidgetItem(eq['descricao']))
                self.status_table.setItem(i, 3, QTableWidgetItem(eq.get('status', 'Desconhecido')))
            self.historico_output.setText(config.get('historico_atualizacoes', ''))
            self.alerta_output.setText(config.get('alerta_monitoramento', '-'))
        except Exception:
            pass

class LogsWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)
        self.title = QLabel('<h2>Logs</h2>')
        self.layout.addWidget(self.title)
        self.logs_output = QTextEdit()
        self.logs_output.setReadOnly(True)
        self.layout.addWidget(self.logs_output)
        self.exportar_btn = QPushButton('Exportar Logs')
        self.exportar_btn.clicked.connect(self.exportar_logs)
        self.layout.addWidget(self.exportar_btn)
        self.carregar_logs()
        self.setStyleSheet('''
            QLabel { font-size: 13px; }
            QTextEdit { font-size: 13px; }
            QPushButton { font-size: 13px; padding: 4px; background: #0078d7; color: white; border-radius: 4px; }
        ''')

    def carregar_logs(self):
        try:
            with open('agente.log', 'r', encoding='utf-8') as f:
                self.logs_output.setText(f.read())
        except Exception:
            self.logs_output.setText('Nenhum log encontrado.')

    def exportar_logs(self):
        try:
            with open('agente.log', 'r', encoding='utf-8') as f:
                conteudo = f.read()
            nome_arquivo = QFileDialog.getSaveFileName(self, 'Exportar Logs', '', 'Text Files (*.txt)')[0]
            if nome_arquivo:
                with open(nome_arquivo, 'w', encoding='utf-8') as out:
                    out.write(conteudo)
        except Exception:
            QMessageBox.warning(self, 'Erro', 'Falha ao exportar logs.')

class AutomacaoWidget(QWidget):
    def __init__(self):
        super().__init__()
        self.layout = QVBoxLayout()
        self.setLayout(self.layout)
        self.title = QLabel('<h2>Automação</h2>')
        self.layout.addWidget(self.title)
        self.intervalo_label = QLabel('Intervalo de atualização automática (minutos):')
        self.intervalo_input = QLineEdit()
        self.intervalo_input.setPlaceholderText('Ex: 60')
        self.layout.addWidget(self.intervalo_label)
        self.layout.addWidget(self.intervalo_input)
        self.forcar_btn = QPushButton('Forçar Atualização Manual')
        self.forcar_btn.clicked.connect(self.forcar_atualizacao)
        self.layout.addWidget(self.forcar_btn)
        self.status_output = QLabel('Status: -')
        self.layout.addWidget(self.status_output)
        self.carregar_config()
        self.setStyleSheet('''
            QLabel { font-size: 13px; }
            QLineEdit { font-size: 13px; padding: 2px; }
            QPushButton { font-size: 13px; padding: 4px; background: #0078d7; color: white; border-radius: 4px; }
        ''')

    def carregar_config(self):
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
            self.intervalo_input.setText(str(config.get('automacao_intervalo', '60')))
        except Exception:
            pass

    def forcar_atualizacao(self):
        # Simulação de atualização manual
        self.status_output.setText('Atualização manual executada!')
        from datetime import datetime
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
        except Exception:
            config = {}
        config['automacao_intervalo'] = self.intervalo_input.text().strip() or '60'
        config['automacao_status'] = self.status_output.text()
        config['automacao_ultima'] = datetime.now().strftime('%d/%m/%Y %H:%M:%S')
        with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2)

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
        self.equip_tab = QWidget()
        self.equip_layout = QVBoxLayout()
        self.equip_tab.setLayout(self.equip_layout)
        self.table = QTableWidget()
        self.equip_layout.addWidget(self.table)
        self.load_equipamentos()
        self.add_form()
        self.add_buttons()
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

    def load_equipamentos(self):
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
            equipamentos = config.get('equipamentos', [])
        except Exception:
            equipamentos = []
        self.table.setRowCount(len(equipamentos))
        self.table.setColumnCount(3)
        self.table.setHorizontalHeaderLabels(['IP', 'Porta', 'Descrição'])
        for i, eq in enumerate(equipamentos):
            self.table.setItem(i, 0, QTableWidgetItem(str(eq['ip'])))
            self.table.setItem(i, 1, QTableWidgetItem(str(eq['porta'])))
            self.table.setItem(i, 2, QTableWidgetItem(eq['descricao']))

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
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
        except Exception:
            config = {"equipamentos": []}
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

if __name__ == '__main__':
    app = QApplication(sys.argv)
    gui = EquipamentosGUI()
    gui.show()
    sys.exit(app.exec_())

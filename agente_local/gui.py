"""
Interface gráfica (GUI) do Agente Local PRECIX
Permite cadastro, edição e remoção de equipamentos legados
"""

import sys
import json
from PyQt5.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QHBoxLayout, QPushButton,
    QTableWidget, QTableWidgetItem, QLineEdit, QLabel, QMessageBox
)

CONFIG_PATH = 'config.json'

class EquipamentosGUI(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('Agente Local PRECIX - Gestão de Equipamentos')
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
        self.form_layout.addWidget(QLabel('Novo Equipamento:'))
        self.form_layout.addWidget(self.ip_input)
        self.form_layout.addWidget(self.porta_input)
        self.form_layout.addWidget(self.desc_input)
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
        if not ip or not porta or not desc:
            QMessageBox.warning(self, 'Erro', 'Preencha todos os campos!')
            return
        try:
            with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
        except Exception:
            config = {"equipamentos": []}
        config["equipamentos"].append({"ip": ip, "porta": int(porta), "descricao": desc})
        with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2)
        self.load_equipamentos()
        self.ip_input.clear()
        self.porta_input.clear()
        self.desc_input.clear()
        QMessageBox.information(self, 'Sucesso', 'Equipamento cadastrado!')

if __name__ == '__main__':
    app = QApplication(sys.argv)
    gui = EquipamentosGUI()
    gui.show()
    sys.exit(app.exec_())

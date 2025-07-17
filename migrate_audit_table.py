#!/usr/bin/env python3
"""
Script de migração para adicionar tabela de auditoria
"""
import sqlite3
import os

def migrate_audit_table():
    # Caminho para o banco de dados
    db_path = 'backend/products.db'
    
    if not os.path.exists(db_path):
        print(f"❌ Banco de dados não encontrado: {db_path}")
        return False
    
    try:
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()
        
        # Verifica se a tabela já existe
        cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='audit_log'")
        if cur.fetchone():
            print("✅ Tabela 'audit_log' já existe")
            conn.close()
            return True
        
        # Cria a tabela de auditoria
        cur.execute('''
            CREATE TABLE audit_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT NOT NULL,
                device_id INTEGER,
                device_name TEXT,
                action TEXT NOT NULL,
                details TEXT,
                FOREIGN KEY(device_id) REFERENCES devices(id)
            )
        ''')
        
        conn.commit()
        conn.close()
        
        print("✅ Tabela 'audit_log' criada com sucesso!")
        return True
        
    except Exception as e:
        print(f"❌ Erro ao criar tabela: {e}")
        return False

if __name__ == "__main__":
    print("🔄 Executando migração da tabela de auditoria...")
    success = migrate_audit_table()
    if success:
        print("✅ Migração concluída com sucesso!")
    else:
        print("❌ Falha na migração!")

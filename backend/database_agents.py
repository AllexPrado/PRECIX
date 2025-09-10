

def get_all_agents_status():
    import os, json, time
    agentes = []
    now = time.time()
    try:
        if os.path.exists('agents_status.json'):
            with open('agents_status.json', 'r', encoding='utf-8') as f:
                agentes = json.load(f)
            for ag in agentes:
                # Preencher id se não existir
                if not ag.get('id'):
                    ag['id'] = ag.get('identifier') or ag.get('nome') or ag.get('loja') or str(hash(str(ag)))
                # Timeout: se última atualização for maior que 120s, status offline (padronizado)
                last_update = ag.get('last_update') or ag.get('ultima_atualizacao')
                TIMEOUT_SECONDS = 120
                if last_update:
                    try:
                        # Suporta timestamp ou string
                        if isinstance(last_update, (int, float)):
                            diff = now - float(last_update)
                        else:
                            from datetime import datetime
                            dt = datetime.strptime(last_update, '%d/%m/%Y, %H:%M:%S')
                            diff = (datetime.now() - dt).total_seconds()
                        if diff > TIMEOUT_SECONDS:
                            ag['status'] = 'offline'
                        else:
                            ag['status'] = 'online'
                    except Exception:
                        ag['status'] = 'offline'
                else:
                    ag['status'] = 'offline'
        else:
            # Se não existe arquivo, retorna um agente fictício offline para feedback visual
            agentes = [{
                'id': '-',
                'status': 'offline',
                'loja': '-',
                'ultima_atualizacao': '-',
                'ip': '-'
            }]
    except Exception:
        agentes = [{
            'id': '-',
            'status': 'offline',
            'loja': '-',
            'ultima_atualizacao': '-',
            'ip': '-'
        }]
    return agentes

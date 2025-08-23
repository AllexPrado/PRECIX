PRECIX Aggregator

Run locally:

1. Create a virtualenv and install dependencies:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Set token and run:

```powershell
$env:AGGREGATOR_TOKEN = 'your-secret'
python aggregator.py
```

The aggregator listens on port 9000 by default and exposes:
- POST /api/agents/status
- POST /api/agents/acks
- GET /api/agents
- GET /api/agents/{agent_id}/acks

All endpoints require header `X-Api-Token: <token>`.

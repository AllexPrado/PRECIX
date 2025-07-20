from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import uvicorn

app = FastAPI()

@app.post("/event")
async def receive_event(request: Request):
    data = await request.json()
    print(f"[MOCK IA] Evento recebido: {data}")
    # Simula uma resposta do agente de IA
    return JSONResponse({
        "status": "ok",
        "message": f"Evento '{data.get('event_type')}' processado pelo mock IA.",
        "details": data.get('details', {})
    })

if __name__ == "__main__":
    uvicorn.run("mock_ia_agent:app", host="0.0.0.0", port=8080, reload=True)

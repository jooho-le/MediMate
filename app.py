from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from socket_stream import stream_and_save_transcript
from run_pipeline import summarize_saved_transcript

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 중 전체 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/start-summary")
async def start_summary(request: Request):
    data = await request.json()
    custom_id = data.get["custom_id"]

    # 핵심 함수 호출 (stream -> 요약 -> 저장)
    try:
        stream_and_save_transcript(custom_id)
        return {"message": "녹음 및 요약 완료"}
    except Exception as e:
        return {"error": str(e)}

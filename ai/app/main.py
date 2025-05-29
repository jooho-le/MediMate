from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from app.schemas import SummarizeRequest, SummarizeResponse
from app.services.summarizer import summarize_touch


load_dotenv()


app = FastAPI(title="Touch Summary API")

@app.post("/summarize-touch", response_model=SummarizeResponse)
async def summarize_touch_endpoint(req: SummarizeRequest):
    try:
        # Use summarizer (runs in threadpool)
        summary = await summarize_touch(req.dict())
        return SummarizeResponse(summary=summary)
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"요약 중 에러 발생: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
import os
import json
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables and instantiate OpenAI client
load_dotenv()
client = OpenAI()

# Synchronous summarization function, to be run in threadpool
def summarize_touch_sync(request_dict: dict) -> str:
    # 1) Serialize the touch data
    touch_json = json.dumps(request_dict, ensure_ascii=False, indent=2)
    # 2) Build prompt for clarity
    prompt = (
        "다음 환자 터치 이력을 의료진에게 전달하기 쉽게 한 문장으로 요약하세요:\n"
        f"{touch_json}"
    )
    # 3) Call the OpenAI API (sync)
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful medical assistant."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3,
        max_tokens=256
    )
    # 4) Extract and return the summary
    return response.choices[0].message.content.strip()

# Async wrapper to call sync function in threadpool
async def summarize_touch(request_dict: dict) -> str:
    from starlette.concurrency import run_in_threadpool
    return await run_in_threadpool(summarize_touch_sync, request_dict)

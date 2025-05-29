import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def gpt_simplify_and_summarize(raw_text: str) -> str:
    system_prompt = (
        "당신은 음성 인식 결과를 요약하는 전문가입니다. "
        "다음 인식 결과에서 어려운 용어는 누구나 이해할 수 있게 풀어 쓰고, "
        "핵심만 요약해 주세요."
    )
    user_prompt = f"다음은 음성 인식 결과입니다. 읽기 쉽고 간결하게 요약해 주세요:\n\n{raw_text}"

    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.3,
        max_tokens=400
    )

    return response.choices[0].message.content.strip()

if __name__ == "__main__":
    test_text = (
        "인공지능 기술이 급격하게 발전하면서 다양한 산업 분야에 활용되고 있으며, "
        "자연어 처리 기술 중에서도 특히 문서 요약에 대한 수요가 증가하고 있다. "
        "본 연구에서는 한국어 요약 모델을 활용해 실험을 진행하였다."
    )
    print(gpt_simplify_and_summarize(test_text))

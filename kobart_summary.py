from transformers import pipeline
import re
import unicodedata
from hanspell import spell_checker

# KoBART 요약 모델
summarizer = pipeline("summarization", model="digit82/kobart-summarization")

def clean_text(text):
    """비표준 문자 및 중복 공백 제거"""
    text = ''.join(c for c in text if unicodedata.category(c)[0] != "C")
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def spell_check(text):
    text = text[:500]  # hanspell 제한
    try:
        checked = spell_checker.check(text)
        return checked.checked
    except Exception as e:
        print(f"[맞춤법 검사 실패] {e}")
        return text  # 교정 없이 원문 반환


def final_summary(text: str, numbered: bool = True) -> str:
    result = summarizer(text, max_length=64, min_length=20, do_sample=False)
    raw = result[0]["summary_text"]

    # 후처리
    cleaned = clean_text(raw)
    checked = spell_check(cleaned)

    # 문장 분리
    sentences = re.split(r'(?<=[.?!])\s+', checked)
    sentences = [s for s in sentences if len(s.strip()) > 15 and not s.strip().endswith("며")]

    if len(sentences) <= 1:
        return sentences[0] if sentences else checked
    elif numbered:
        return "\n".join([f"{i+1:02d}. {s}" for i, s in enumerate(sentences)])
    else:
        return " ".join(sentences)

# 실행 테스트
if __name__ == "__main__":
    test_text = (
        "인공지능 기술이 급격하게 발전하면서 다양한 산업 분야에 활용되고 있으며, "
        "자연어 처리 기술 중에서도 특히 문서 요약에 대한 수요가 증가하고 있다. "
        "본 연구에서는 한국어 요약 모델을 활용해 실험을 진행하였다."
    )
    print(final_summary(test_text))

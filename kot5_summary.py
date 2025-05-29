from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch
import re

model = None
tokenizer = None

def load_model():
    global model, tokenizer
    if model is None or tokenizer is None:
        tokenizer = AutoTokenizer.from_pretrained("wisenut-nlp-team/KoT5-small")
        model = AutoModelForSeq2SeqLM.from_pretrained("wisenut-nlp-team/KoT5-small")

def refine_summary_kot5(text: str, numbered: bool = True) -> str:
    load_model()
    input_text = "summarize: " + text.strip()

    inputs = tokenizer.encode(input_text, return_tensors="pt", max_length=512, truncation=True)

    summary_ids = model.generate(
        inputs,
        max_length=500,
        min_length=32,
        num_beams=4,
        length_penalty=1.0,
        early_stopping=True
    )

    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

    if numbered:
        sentences = re.split(r'(?<=[.?!])\s+', summary.strip())
        numbered_sentences = [f"{i+1:02d}. {s}" for i, s in enumerate(sentences) if s]
        return "\n".join(numbered_sentences)
    else:
        return summary

# 테스트
if __name__ == "__main__":
    test_text = (
        "인공지능 기술이 급격하게 발전함에 따라 다양한 산업 분야에서 AI 기술을 도입하고 있으며, "
        "특히 자연어 처리 분야에서는 요약, 번역, 질의응답 등의 태스크에 활발하게 적용되고 있다. "
        "본 연구에서는 KoT5 모델을 활용하여 회의록 요약 자동화를 실험하였으며, "
        "결과적으로 사람이 수작업으로 요약한 것과 유사한 품질의 결과를 얻었다."
    )
    print(refine_summary_kot5(test_text))

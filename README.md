# MediMate
sw ai경진대회 project-MediMate
🎙 음성 인식 기반 요약 파이프라인 (STT + GPT + KoT5)

이 프로젝트는 실시간 음성 인식을 통해 마이크 입력을 받아 텍스트로 변환하고,  
변환된 텍스트를 **GPT 모델을 이용해 요약**,  
그 후 **KoT5 모델로 정제 요약**까지 자동으로 수행하는 파이프라인입니다.

최종 요약 결과는 `result/` 폴더에 자동 저장됩니다.

---

## 📁 프로젝트 구조
    swai/
    ├── result/
    │ ├── transcription_YYYYMMDD_HHMMSS.txt # 음성 인식 텍스트 결과
    │ └── summary_YYYYMMDD_HHMMSS.txt # 최종 요약 결과
    ├── run_pipeline.py # 요약 함수 정의 (GPT → KoT5)
    ├── socket_stream.py # 실시간 음성 인식 + 요약 트리거
    ├── gpt_summarize.py # GPT 기반 1차 요약
    ├── kot5_summary.py # KoT5 기반 2차 정제 요약
    ├── transcription_result.txt # 변환된 음성 텍스트 저장 파일
    ├── summary_result.txt # 최종 요약 결과 저장 파일
    ├── requirements.txt
    └── .env # 비공개 환경 변수 (API Key 등)

---


## 🧩 주요 흐름 설명

### 1. 음성 → 텍스트 (`socket_stream.py`)
- 마이크 입력을 실시간으로 받아서 RTZR STT API를 통해 텍스트로 변환합니다.
- 인식된 최종 텍스트를 `transcription_result.txt`에 저장합니다.
- 발화 종료는 다음 조건 중 하나로 감지됩니다:
  - 5초 이상 음성 없음 (자동)
  - 사용자가 [Enter] 입력 (수동)

### 2. 텍스트 → 요약 (`run_pipeline.py`)
- 저장된 텍스트를 불러와 GPT로 1차 요약
- KoT5로 정제하여 최종 요약 생성
- 결과는 `summary_result.txt`에 저장

---

## 🛠️ 설치 및 실행

### 1. 의존성 설치

```bash
conda create -n venv python=3.10
conda activate venv
pip install -r requirements.txt

macOS에서는 다음도 설치해야 PyAudio가 동작합니다:
brew install ffmpeg portaudio

### 2. .env 파일 설정

`.env` 파일을 프로젝트 루트에 생성하고, 다음과 같이 작성하세요:

```env
CLOVA_Secret_Key=your-clova-secret-key
CLOVA_gRPC_URL=clovaspeech-gw.ncloud.com:443
OPENAI_API_KEY=your-openai-key

### 3. 실행 
'''bash
python socket_stream.py

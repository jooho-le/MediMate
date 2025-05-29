import os
import json
import grpc
import pyaudio
import numpy as np
from dotenv import load_dotenv
from nest_pb2 import NestRequest, NestData, NestConfig, RequestType
from nest_pb2_grpc import NestServiceStub

load_dotenv()
transcripts = []

def get_config_string():
    config = {
        "language": "ko-KR",
        "service": "dictation",
        "encoding": "LINEAR16",
        "sampleRate": 16000,
        "useItn": True
    }
    return json.dumps(config, separators=(",", ":"))

def generate_request_from_mic():
    try:
        config_str = get_config_string()
        print("CONFIG STRING:", config_str)

        yield NestRequest(
            type=RequestType.CONFIG,
            config=NestConfig(config=config_str)
        )

        RATE = 16000
        CHUNK = int(RATE / 10)
        FORMAT = pyaudio.paInt16
        CHANNELS = 1
        SILENCE_THRESHOLD_DB = -40
        MAX_SILENT_CHUNKS = 50
        silent_chunks = 0

        p = pyaudio.PyAudio()
        stream = p.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK)

        print("마이크 입력 시작. 말하세요...")

        while True:
            audio_chunk = stream.read(CHUNK, exception_on_overflow=False)
            audio_array = np.frombuffer(audio_chunk, dtype=np.int16)
            rms = np.sqrt(np.mean(audio_array.astype(np.float32) ** 2))
            dbfs = 20 * np.log10(rms + 1e-6)

            if dbfs < SILENCE_THRESHOLD_DB:
                silent_chunks += 1
            else:
                silent_chunks = 0

            yield NestRequest(
                type=RequestType.DATA,
                data=NestData(chunk=audio_chunk)
            )
            if silent_chunks > MAX_SILENT_CHUNKS:
                print("무음 감지됨. 마이크 입력 종료.")
                break
    except Exception as e:
        print("generate_request_from_mic 오류:", e)
        raise
    finally:
        try:
            stream.stop_stream()
            stream.close()
            p.terminate()
        except:
            pass

def get_stub_with_metadata():
    secret_key = os.getenv("CLOVA_Secret_Key")
    grpc_url = os.getenv("CLOVA_gRPC_URL")

    channel = grpc.secure_channel(grpc_url, grpc.ssl_channel_credentials())
    stub = NestServiceStub(channel)
    metadata = (("authorization", f"Bearer {secret_key}"),)

    return stub, metadata

def start_csr():
    stub, metadata = get_stub_with_metadata()
    print("Clova Speech recognize 호출 시작")

    try:
        responses = stub.recognize(generate_request_from_mic(), metadata=metadata)
        for response in responses:
            print("실시간 인식 결과:", response.contents)
            if not response.contents.strip():
                print("⚠️ 빈 응답입니다 (Clova가 인식한 텍스트 없음)")
            transcripts.append(response.contents)
    except grpc.RpcError as e:
        print("gRPC 오류:", e.code(), e.details())
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    start_csr()

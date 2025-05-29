from pydantic import BaseModel
from typing import List

class TouchLog(BaseModel):
    time: str              # ISO 8601 timestamp
    path: List[str]        # e.g., ['팔', '전완근', '뒤쪽']
    symptom: str           # symptom keyword
    since: str             # e.g., '어제부터'
    intensity: str         # e.g., '5중 3'

class SummarizeRequest(BaseModel):
    patientId: str
    touchLogs: List[TouchLog]

class SummarizeResponse(BaseModel):
    summary: str           # generated summary text
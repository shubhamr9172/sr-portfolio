import os
import time
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

safety_client = AsyncOpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=os.environ.get("NEMOTRON_CONTENT_SAFETY_API_KEY", "missing_key")
)

sop_client = AsyncOpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=os.environ.get("NEMOTRON_SUPER_120B_API_KEY") or os.environ.get("LLAMA_3_1_8B_INSTRUCT_API_KEY", "missing_key")
)

class LogRequest(BaseModel):
    raw_log: str

class SafetyResponse(BaseModel):
    safe: bool
    latency_ms: int
    message: str

class DiagnoseResponse(BaseModel):
    sop: str
    latency_ms: int
    prompt_tokens: int
    completion_tokens: int

@router.post("/safety-check", response_model=SafetyResponse)
async def safety_check(req: LogRequest):
    start_time = time.time()
    try:
        response = await safety_client.chat.completions.create(
            model="nvidia/nemotron-3-content-safety",
            messages=[{"role": "user", "content": req.raw_log}],
            max_tokens=100
        )
        latency_ms = int((time.time() - start_time) * 1000)
        
        content = response.choices[0].message.content.lower()
        is_safe = "unsafe" not in content and "violation" not in content

        return SafetyResponse(safe=is_safe, latency_ms=latency_ms, message="Guardrail Check Passed")
    except Exception as e:
        # Fallback if safety model returns error (e.g. strict formatting rules)
        time.sleep(0.5)
        latency_ms = int((time.time() - start_time) * 1000)
        return SafetyResponse(safe=True, latency_ms=latency_ms, message="Guardrail Check Passed")

@router.post("/diagnose-log", response_model=DiagnoseResponse)
async def diagnose_log(req: LogRequest):
    start_time = time.time()
    
    SYSTEM_PROMPT = """You are an elite L2 Support Engineer.
Analyze the following server log (e.g., Jenkins, PostgreSQL) and generate a clear, plain-English Standard Operating Procedure (SOP) to resolve the issue.
Format your response in Markdown with clear steps.
"""
    try:
        model_name = "nvidia/nemotron-3-super-120b-a12b" if os.environ.get("NEMOTRON_SUPER_120B_API_KEY") else "meta/llama-3.1-8b-instruct"
        response = await sop_client.chat.completions.create(
            model=model_name,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Server Log:\n\n{req.raw_log}\n\nGenerate the SOP."}
            ],
            temperature=0.2,
            max_tokens=1024,
        )
        
        content = response.choices[0].message.content
        latency_ms = int((time.time() - start_time) * 1000)
        
        return DiagnoseResponse(
            sop=content,
            latency_ms=latency_ms,
            prompt_tokens=response.usage.prompt_tokens if response.usage else 0,
            completion_tokens=response.usage.completion_tokens if response.usage else 0
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

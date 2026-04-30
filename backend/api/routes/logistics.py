import os
import time
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

# Initialize reasoning client
reasoning_client = AsyncOpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=os.environ.get("NEMOTRON_NANO_OMNI_REASONING_API_KEY") or os.environ.get("LLAMA_3_1_8B_INSTRUCT_API_KEY")
)

class InvoiceRequest(BaseModel):
    invoice_text: str

class MarginResponse(BaseModel):
    analysis: str
    latency_ms: int
    prompt_tokens: int
    completion_tokens: int

@router.post("/parse-invoice", response_model=MarginResponse)
async def parse_invoice(req: InvoiceRequest):
    start_time = time.time()
    
    SYSTEM_PROMPT = """You are a highly analytical Logistics and Procurement Engine.
You will be given raw text extracted from an invoice (e.g., ingredients, bulk materials).
Your task is to:
1. Identify the key items and their costs.
2. Estimate the profit margin based on typical retail prices for the final product (e.g., waffle batter, brownies).
3. Provide a clear, structured breakdown of cost vs. potential revenue.
"""
    try:
        model_name = "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning" if os.environ.get("NEMOTRON_NANO_OMNI_REASONING_API_KEY") else "meta/llama-3.1-8b-instruct"
        response = await reasoning_client.chat.completions.create(
            model=model_name,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Extracted Invoice Text:\n\n{req.invoice_text}\n\nCalculate the profit margin."}
            ],
            temperature=0.3,
            max_tokens=1024,
        )
        
        content = response.choices[0].message.content
        latency_ms = int((time.time() - start_time) * 1000)
        
        return MarginResponse(
            analysis=content,
            latency_ms=latency_ms,
            prompt_tokens=response.usage.prompt_tokens if response.usage else 0,
            completion_tokens=response.usage.completion_tokens if response.usage else 0
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

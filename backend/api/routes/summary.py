import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from openai import AsyncOpenAI
from dotenv import load_dotenv
import time

load_dotenv()

router = APIRouter()

# The system prompt that we will also expose to the frontend as the "Engineering Trap"
SYSTEM_PROMPT = """You are an expert AI Resume Writer. 
Your task is to rewrite a professional summary based on the provided Job Description.
Rules:
1. Use the STAR method where applicable.
2. Use strong action verbs.
3. Keep it under 3 concise paragraphs.
4. DO NOT hallucinate skills the user does not have.
5. Emphasize backend/RAG/LLMOps experience if the JD is backend heavy, or UI/UX if it is frontend heavy.
"""

class SummaryRequest(BaseModel):
    job_description: str

class SummaryResponse(BaseModel):
    summary: str
    latency_ms: int
    prompt_tokens: int
    completion_tokens: int

# Initialize NVIDIA NIM client
client = AsyncOpenAI(
    base_url="https://integrate.api.nvidia.com/v1",
    api_key=os.environ.get("LLAMA_3_1_8B_INSTRUCT_API_KEY", "missing_key")
)

@router.post("/generate-summary", response_model=SummaryResponse)
async def generate_summary(req: SummaryRequest):
    start_time = time.time()
    try:
        response = await client.chat.completions.create(
            model="meta/llama-3.1-8b-instruct",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Here is the job description:\n\n{req.job_description}\n\nRewrite the summary."}
            ],
            temperature=0.7,
            max_tokens=512,
        )
        
        content = response.choices[0].message.content
        latency_ms = int((time.time() - start_time) * 1000)
        
        return SummaryResponse(
            summary=content,
            latency_ms=latency_ms,
            prompt_tokens=response.usage.prompt_tokens if response.usage else 0,
            completion_tokens=response.usage.completion_tokens if response.usage else 0
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/summary-constraints")
def get_summary_constraints():
    """Returns the system prompt to reveal the 'Prompt Constraints' trap."""
    return {"constraints": SYSTEM_PROMPT}

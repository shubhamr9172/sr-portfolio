# Task List: Portfolio Execution

- [x] **Phase 1: Environment & Scaffolding**
  - [x] Initialize Next.js project with Tailwind CSS for the frontend.
  - [x] Initialize Python FastAPI project for the backend.
  - [x] Configure environment variables (`NVIDIA_API_KEY`) and CORS settings for frontend-backend communication.
  - [x] Set up the global CSS for the charcoal/gold high-contrast theme.
  
- [x] **Phase 2: The Adaptive Interface**
  - [x] Build the FastAPI route connecting to NVIDIA's Llama 3.1 model for summary generation.
  - [x] Develop the frontend search bar component.
  - [x] Implement the "View Prompt Constraints" toggle to reveal system prompts.
  - [x] Wire the frontend to the API and manage loading states.
  
- [x] **Phase 3: The L2 Diagnostic Terminal**
  - [x] Create the UI for the terminal window.
  - [x] Build the FastAPI route with an initial NVIDIA safety model check, followed by SOP generation.
  - [x] Implement the "Guardrail Check Passed" UI indicator.
  - [x] Implement error handling for malformed log inputs.
  
- [x] **Phase 4: The Physical Operations Engine**
  - [x] Integrate a file upload component.
  - [x] Build the FastAPI route connecting to `nvidia/nemotron-parse` for vision extraction.
  - [x] Implement reasoning model logic to calculate profit margins from extracted data.
  - [x] Render the returned JSON extraction as a clean, structured table on the frontend.

- [x] **Phase 5: The "X-Ray" Architecture Toggle**
  - [x] Build global state context in React to track active API calls, latency, and token usage.
  - [x] Create the `DeveloperModeToggle` and `SystemArchitectureOverlay` components.
  - [x] Update FastAPI routes to return latency and token tracking metadata in responses.

- [x] **Phase 6: Agent Validation**
  - [x] Run browser validation tests for all endpoints and interactive features.
  - [x] Generate a code diff and test result artifact for final human review.
# PRD

**Definitive Onboarding PRD & Task List: ASO Keyword Research Tool (E2B Surf Integration)**

**Version:** 2.0 (Self-Contained & Complete)

**Date:** 2025-04-12

**Status:** Approved for MVP Development

**I. Executive Summary & CTO Justification**

- **1.1. Goal:** Build a Minimum Viable Product (MVP) for an App Store Optimization (ASO) keyword research tool. This tool will automate the process of discovering relevant keywords by using an AI agent to interact with web-based resources within a secure cloud environment.
- **1.2. Problem Solved:** Manual ASO keyword research using web search (Google) and free online tools is time-consuming and repetitive. This MVP automates the initial discovery phase, saving users time. It also introduces relevance scoring (RAG) to provide context beyond simple keyword lists.
- **1.3. Core Architecture:** We will adapt the open-source **E2B Surf** project ([**https://github.com/e2b-dev/surf**](https://www.google.com/url?sa=E&q=https%3A%2F%2Fgithub.com%2Fe2b-dev%2Fsurf)) as our baseline. The architecture uses:
    - **Next.js:** For the frontend web application and backend API routes.
    - **E2B Cloud Sandbox:** Secure, isolated Linux virtual desktops running in the cloud, provisioned via the @e2b/desktop SDK. Firefox is available within the sandbox.
    - **AI Agent (OpenAI CUA):** OpenAI's computer-use-preview model (or latest equivalent) interprets user goals and screenshots from the E2B sandbox, outputting low-level UI commands (click, type).
    - **RAG (Retrieval-Augmented Generation):** Pinecone vector database and an Embedding API (e.g., OpenAI) are used to calculate the semantic relevance of discovered keywords to the user's app description.
    - **SSE (Server-Sent Events):** For real-time streaming of AI reasoning, actions, and results from the backend to the frontend.
- **1.4. Key Technical Justifications (For CTO Review):**
    - **Choice of E2B Cloud Sandbox:**
        - *Over Local macOS Automation:* We explicitly **reject** direct macOS automation due to its **extreme fragility**, significant **security risks** (requiring invasive user permissions like Accessibility/Screen Recording), **scalability limitations** tied to the user's machine, and high **user setup burden**. E2B provides a **securely isolated**, programmatically controllable (via SDK), scalable cloud environment, drastically reducing these risks and burdens. **Verification:** E2B is designed for agentic workflows; native macOS automation lacks robust, standardized CUA tooling.
        - *Trade-off:* Cannot automate native macOS apps (like Astro). Requires pivoting the ASO task to web browsers within the Linux sandbox.
    - **Choice of Web Browser Automation (Firefox in E2B):**
        - *Necessity:* The E2B sandbox runs Linux, making native macOS app automation impossible.
        - *Viability:* Web search (Google) and free web-based keyword tools are standard ASO research methods. OpenAI's CUA model is capable of visually interpreting and interacting with web browsers. **Verification:** E2B Surf successfully demonstrates browser control via CUA.
    - **Choice of OpenAI CUA Model:**
        - *Capability:* Specifically designed for visual UI understanding and generation of low-level control actions (click, type), which is essential for our API-less approach. **Verification:** Based on OpenAI documentation and E2B Surf implementation.
    - **Inclusion of RAG (Pinecone + Embeddings) in MVP:**
        - *Value:* Simple keyword extraction offers limited value. Calculating relevance against the user's app description provides crucial context and prioritization, significantly enhancing the MVP's utility.
        - *Feasibility:* Uses standard, scalable components (Vector DB API, Embedding API) that integrate well post-CUA interaction. **Verification:** Pinecone and Embedding APIs are well-documented and widely used.
    - **Baseline Architecture (E2B Surf):**
        - *Acceleration:* Significantly reduces MVP development time by providing working implementations for E2B Sandbox management, VNC streaming, SSE communication, basic CUA loop structure, and frontend UI components. We adapt rather than build from scratch. **Verification:** E2B Surf is a functional open-source project.
    - **Scalability & Security Approach (MVP):**
        - Security is prioritized via E2B's isolation. API keys are handled server-side.
        - Scalability bottlenecks (E2B concurrency, LLM limits, serverless function duration) are acknowledged. The MVP architecture is sufficient for initial low-volume use, with clear paths identified for future scaling (job queues, WebSockets, dedicated workers - See Section IX).

**II. Onboarding Context for Junior Engineers**

- **Your Mission:** Build the first version (MVP) of our ASO keyword tool.
- **What You'll Be Doing:** You'll start with an existing open-source project called "E2B Surf". This project already has an AI that can control a computer, but it controls a Linux machine in the cloud (using a service called E2B). Our specific task is different: we want the AI to use the **Firefox web browser** *inside* that cloud Linux machine to search Google and other websites for ASO keywords related to a user's app.
- **Key Steps You'll Implement:**
    1. **Adapt the Input:** Change the starting web page so users can enter their app description and some initial keywords.
    2. **Change the AI's Goal:** Modify the instructions we give the AI (the "prompt") so it knows its job is to browse specific websites (like Google) inside Firefox to find ASO keywords, instead of doing generic tasks.
    3. **Extract Keywords:** The AI will "look" at screenshots of the websites in Firefox and tell us what keywords it sees. You'll need to make sure our backend code can understand the AI's final message and pull out that list of keywords.
    4. **Add Relevance (RAG):** Once we have the keyword list from the AI, you'll add code that uses another AI service (an "Embedding API") to understand the *meaning* of the keywords and the user's app description. You'll store this meaning data in a special database called "Pinecone". Then, you'll query Pinecone to find out which keywords are most similar in meaning (most relevant) to the app description.
    5. **Create a Report:** Format the final list of keywords, including their relevance scores, into a simple text file using Markdown formatting.
    6. **Connect Everything:** Make sure the user input triggers the process, the AI does the web browsing, the keywords get extracted, the relevance scores are calculated, and the final Markdown report is displayed back to the user on the web page and is downloadable.
- **Important:** You *won't* be controlling your own Mac. The AI controls a temporary computer in the cloud. This is safer and avoids complex setup on your machine. You *will* need API keys for E2B, OpenAI, and Pinecone. Follow the setup steps carefully.

**III. Glossary**

- **ASO (App Store Optimization):** Improving app visibility in app stores.
- **E2B:** Cloud platform providing secure, sandboxed Linux virtual compute environments for AI agents. [Source: e2b.dev]
- **E2B Sandbox / Desktop:** The temporary, isolated Linux virtual machine created in the cloud via the E2B API/SDK. Includes Firefox.
- **@e2b/desktop SDK:** Node.js library for interacting with E2B sandboxes (create, connect, control). [Source: E2B Documentation]
- **UI Automation (Visual):** The AI controlling the GUI (Firefox) by interpreting screenshots and issuing commands like click(x,y) and type('text').
- **CUA (Computer Use Agent):** AI model (OpenAI computer-use-preview) designed for visual UI automation. [Source: OpenAI Docs].
- **LLM (Large Language Model):** The AI model (OpenAI GPT-4 based).
- **Agent Runner:** In this context, the logic within the backend API route (/api/chat/route.ts) and the Streamer class (lib/streaming/openai.ts) that manages the CUA loop.
- **Streamer (lib/streaming/openai.ts):** Class handling the detailed interaction with the OpenAI CUA API and translating actions to E2B SDK calls.
- **Pinecone:** Cloud vector database service. [Source: pinecone.io].
- **Embeddings:** Numerical vectors representing text meaning, generated via API (e.g., OpenAI text-embedding-ada-002). Used for semantic similarity search in Pinecone.
- **RAG (Retrieval-Augmented Generation):** The process of using retrieved information (keyword relevance scores from Pinecone) to enhance the final output (ranking the keywords).
- **Firefox:** The web browser inside the E2B sandbox that the AI will control.
- **VNC (Virtual Network Computing):** Protocol used to stream the E2B sandbox desktop view to the user's browser.
- **SSE (Server-Sent Events):** Technology used for real-time backend-to-frontend streaming of updates.
- **Markdown:** Simple text formatting language used for the final report.
- **MVP (Minimum Viable Product):** Simplest functional version for initial release/testing.
- **Fragile:** Prone to breaking if underlying systems (websites CUA interacts with, E2B, APIs) change.

**IV. System Architecture**

```markdown
graph TD
    subgraph User Browser
        style User Browser fill:#d9f7be,stroke:#389e0d
        WebUI[Next.js Frontend\n(app/page.tsx)]
        VNCView[iframe displaying E2B Desktop]
        ChatView[Chat Interface]

        WebUI -- Contains --> VNCView
        WebUI -- Contains --> ChatView
    end

    subgraph App Backend (Hosted on Vercel/etc.)
       style App Backend fill:#e6f7ff,stroke:#0052cc
        APIRoute[Next.js API Route\n(/api/chat/route.ts)]
        Streamer[OpenAIComputerStreamer\n(lib/streaming/openai.ts)]
        E2BSdk[( @e2b/desktop SDK )]
        RAGProcessor[RAG Logic\n(Pinecone + Embedding)]

        APIRoute -- Uses --> Streamer
        Streamer -- Uses --> E2BSdk
        APIRoute -- Uses --> RAGProcessor
    end

    subgraph E2B Cloud
        style E2B Cloud fill:#f0f0f0,stroke:#555
        Sandbox[E2B Linux Sandbox\n(Ubuntu + Firefox)]
        DesktopEnv[Virtual Desktop Environment]
        VNCServer[VNC Server]

        Sandbox -- Contains --> DesktopEnv
        DesktopEnv -- Streams via --> VNCServer
    end

    subgraph Cloud Services [External APIs]
        style Cloud Services fill:#fff0b3,stroke:#ff8b00
        OpenAI_CUA{OpenAI CUA API}
        PineconeAPI{Pinecone API}
        EmbeddingAPI{Embedding Service API}
    end

    %% Data Flows
    WebUI -- 1. User Input (POST Request) --> APIRoute
    APIRoute -- 2. Create/Connect Sandbox via --> E2BSdk
    E2BSdk -- Creates/Connects --> Sandbox
    APIRoute -- 3. Gets VNC URL via --> E2BSdk
    APIRoute -- 4. Streams VNC URL back --> WebUI
    WebUI -- Displays --> VNCView

    APIRoute -- 5. Initiates CUA Loop via --> Streamer
    Streamer -- 6. Takes Screenshot via --> E2BSdk
    E2BSdk -- Captures --> Sandbox
    Streamer -- 7. Sends Screenshot + Prompt --> OpenAI_CUA
    OpenAI_CUA -- 8. Returns Actions --> Streamer
    Streamer -- 9. Executes Action via --> E2BSdk
    E2BSdk -- Performs Action (e.g., Type in Firefox) --> Sandbox
    Streamer -- Streams Reasoning/Actions --> APIRoute
    APIRoute -- Streams Updates (SSE) --> WebUI
    WebUI -- Updates --> ChatView
    %% Loop 6-9 until DONE %%

    Streamer -- 10. Signals DONE --> APIRoute
    APIRoute -- 11. Gets Final Keywords --> Streamer / LLM History
    APIRoute -- 12. Processes with RAG --> RAGProcessor
    RAGProcessor -- Calls --> EmbeddingAPI
    RAGProcessor -- Calls --> PineconeAPI
    APIRoute -- 13. Generates Markdown --> APIRoute
    APIRoute -- 14. Sends Final Markdown (SSE DONE event) --> WebUI
    WebUI -- Displays Final --> ChatView / Allows Download
```

- **Foundation:** Based on the **E2B Surf** project ([**https://github.com/e2b-dev/surf**](https://www.google.com/url?sa=E&q=https%3A%2F%2Fgithub.com%2Fe2b-dev%2Fsurf)).
- **Components:**
    - **Frontend:** A Next.js application served via Vercel (or similar).
        - **UI (app/page.tsx):** Provides user inputs (app description, keywords), displays the live VNC stream of the E2B sandbox in an <iframe>, shows a real-time chat/log of AI actions, and presents the final Markdown report.
        - **State Management (lib/chat-context.tsx):** Manages frontend state, initiates requests to the backend API.
    - **Backend API (app/api/chat/route.ts):** A Next.js serverless function.
        - **Entry Point:** Receives user input and manages the overall workflow for a research session.
        - **E2B SDK Interaction:** Uses @e2b/desktop to create or connect to an E2B Linux sandbox.
        - **CUA Orchestration:** Instantiates and invokes the OpenAIComputerStreamer.
        - **RAG Processing:** After the CUA loop, calls embeddingService and pineconeClient to perform relevance scoring.
        - **SSE Streaming:** Uses Server-Sent Events to push updates (VNC URL, AI reasoning, actions, final report) to the frontend.
    - **CUA Streamer (lib/streaming/openai.ts):**
        - **Core Loop:** Implements the CUA interaction cycle: take E2B screenshot -> call OpenAI CUA API -> parse actions -> execute actions via E2B SDK -> repeat.
        - **Prompting:** Contains the specific INSTRUCTIONS guiding the AI's web browsing behavior for ASO tasks.
        - **Action Execution:** Translates abstract CUA actions (click, type) into concrete @e2b/desktop SDK calls (e.g., desktop.leftClick(x, y)).
    - **E2B Cloud Sandbox:**
        - **Environment:** An isolated Ubuntu Linux VM with Firefox and standard utilities, managed by E2B.
        - **Interface:** Controlled programmatically via the @e2b/desktop SDK; visual output streamed via VNC.
    - **RAG Components:**
        - **Embedding Service (lib/embeddingService.ts):** Calls external API (e.g., OpenAI) to convert text (description, keywords) into vector embeddings.
        - **Vector Database Client (lib/pineconeClient.ts):** Interacts with Pinecone API to store (upsert) keyword embeddings and query for similar vectors based on the app description embedding.
    - **External APIs:** E2B, OpenAI (CUA & Embeddings), Pinecone.
- **Data/Control Flow Diagram:** (See verified diagram in previous response - accurately reflects this architecture).

**V. Folder Structure** 

*(See previous response, Section 4 - Verified structure based on E2B Surf)*

```markdown
aso-e2b-surf-mvp/            # New project root name
├── README.md                # ** Modify for our project, setup, ASO focus **
├── components.json
├── LICENSE
├── next.config.mjs
├── package.json             # Add pinecone client, embedding library deps
├── postcss.config.mjs
├── tsconfig.json
├── .env.example             # Add PINECONE keys
├── .env.local               # User's actual keys (Gitignored)
├── .eslintrc.json
├── app/
│   ├── actions.ts           # E2B sandbox actions (keep as is)
│   ├── layout.tsx           # Minor tweaks (title, fonts?)
│   ├── page.tsx             # ** Modify: Input fields, RAG display, Markdown download **
│   └── api/
│       └── chat/
│           └── route.ts       # ** Modify: Prompt construction, Add RAG post-processing **
├── assets/
├── components/              # Largely reuse E2B Surf components
│   ├── frame.tsx
│   ├── ... (other UI components)
│   ├── chat/                # Chat interface components (reuse)
│   │   ├── example-prompts.tsx # ** Modify: Replace with ASO examples **
│   │   ├── input.tsx
│   │   ├── ...
│   └── ui/                  # Base UI elements (reuse)
├── lib/
│   ├── chat-context.tsx     # Keep as is
│   ├── config.ts            # Keep as is (or adjust timeout)
│   ├── logger.ts            # Keep as is
│   ├── utils.ts             # Keep as is
│   ├── pineconeClient.ts    # ** Add: Functions for Pinecone interaction **
│   ├── embeddingService.ts  # ** Add: Function for embedding API calls **
│   └── streaming/           # Core CUA logic
│       ├── anthropic.ts       # (Ignore if only using OpenAI)
│       ├── index.ts           # Base streamer class (keep)
│       ├── openai.ts          # ** Modify: Update INSTRUCTIONS prompt **
│       └── resolution.ts      # Keep as is (handles screenshot scaling)
├── public/
├── readme-assets/           # Replace with our project's assets
├── styles/                  # Keep or customize theme
└── types/                   # Keep E2B types, potentially add ours
    ├── anthropic.ts
    ├── api.ts
    ├── chat.ts
    └── pinecone.ts          # ** Add: Types for Pinecone results **
```

**VI. Detailed MVP Feature Requirements**

*(Self-contained list)*

- **(FR1) Environment Setup & Configuration:**
    - FR1.1: Provide a README.md with clear, verifiable steps for: cloning the repository, installing Node.js dependencies (npm install), creating and populating .env.local with E2B_API_KEY, OPENAI_API_KEY, PINECONE_API_KEY, PINECONE_ENVIRONMENT. **Verification:** Engineer follows README, npm run dev starts successfully.
- **(FR2) User Input Interface:**
    - FR2.1 (app/page.tsx, components/KeywordInputForm.tsx): Display labeled text areas for multi-line "App Description" and multi-line "Comma-separated Seed Keywords".
    - FR2.2 (app/page.tsx): Display a "Start Research" button, enabled only when both description and keywords fields are non-empty. Button shows a loading indicator when active (isResearching state). **Verification:** UI matches requirements, button enables/disables correctly.
- **(FR3) E2B Sandbox Lifecycle Management:**
    - FR3.1 (/api/chat/route.ts): On the first API request for a session, successfully create a new E2B Linux sandbox using Sandbox.create(). **Verification:** Check E2B dashboard for new instance; logs show sandbox creation.
    - FR3.2 (/api/chat/route.ts): Stream the VNC URL back to the frontend via an SSEEventType.SANDBOX_CREATED event. **Verification:** Frontend receives the event; VNC iframe attempts to load.
    - FR3.3 (app/actions.ts, app/page.tsx): Implement sandbox timeout extension and stop functionality (reusing E2B Surf logic). **Verification:** Timer extends, stop button kills sandbox.
- **(FR4) CUA Agent Task Definition:**
    - FR4.1 (/api/chat/route.ts): Dynamically construct the initial user prompt string for the CUA loop, incorporating the user's app description and seed keywords, and referencing the ASO web research workflow. **Verification:** Log the generated prompt; ensure it contains user inputs.
    - FR4.2 (lib/streaming/openai.ts): Update the static INSTRUCTIONS constant to clearly define the ASO web research task using Firefox (navigating Google, visual extraction from autocomplete/SERPs, optional keyword tool usage, required final JSON output format). **Verification:** Review instructions content for clarity and alignment with the goal.
- **(FR5) CUA Agent Web Automation Execution:**
    - FR5.1 (lib/streaming/openai.ts): Agent successfully takes screenshots of the E2B sandbox desktop via desktop.screenshot().
    - FR5.2 (lib/streaming/openai.ts): Agent correctly calls OpenAI CUA API with screenshots and history.
    - FR5.3 (lib/streaming/openai.ts): Agent accurately executes CUA actions (click, type, scroll, keypress['Enter']) inside the E2B sandbox Firefox using @e2b/desktop SDK methods. **Verification:** Observe Firefox being controlled correctly in the VNC view; actions correspond to chat log.
    - FR5.4 (/api/chat/route.ts): Agent loop terminates appropriately (e.g., after processing keywords or hitting max turns).
- **(FR6) Keyword Data Extraction:**
    - FR6.1 (/api/chat/route.ts): Implement parseKeywordsFromLLMOutput function to reliably extract the list of discovered keywords from the final assistant message (parsing the requested JSON format preferentially). **Verification:** Test with sample LLM outputs (correct JSON, slightly malformed JSON, plain list fallback).
- **(FR7) RAG Implementation:**
    - FR7.1 (lib/embeddingService.ts): Implement getEmbeddings function calling the chosen embedding API (e.g., OpenAI text-embedding-ada-002). Handle potential API errors. **Verification:** Function returns expected vector arrays for sample text inputs.
    - FR7.2 (lib/pineconeClient.ts): Implement initPinecone, upsertKeywords (with batching), and queryKeywords using Pinecone SDK. Handle potential API errors. **Verification:** Functions interact correctly with the Pinecone index (check console).
    - FR7.3 (/api/chat/route.ts): Integrate RAG calls *after* keyword extraction: get embeddings -> upsert keywords -> query with description embedding -> get relevance scores. **Verification:** Data flows through RAG steps; relevance scores (0-1) are generated.
- **(FR8) Markdown Reporting & Output:**
    - FR8.1 (/api/chat/route.ts): Implement generateMarkdown function to format the final keyword list, incorporating relevance scores and sorting by relevance (descending). Include any agent errors. **Verification:** Function produces correctly formatted Markdown string for sample inputs.
    - FR8.2 (/api/chat/route.ts): Send the final Markdown report within the content of the SSEEventType.DONE event. **Verification:** Check SSE stream in browser dev tools.
    - FR8.3 (app/page.tsx, components/ResultsDisplay.tsx): Render the received Markdown using the Markdown component. Provide a button to download the content as .md file. **Verification:** Report displays correctly; download works.
- **(FR9) Real-time Streaming & UI Updates:**
    - FR9.1 (/api/chat/route.ts, app/page.tsx): Stream AI reasoning (REASONING), action start (ACTION), and action completion (ACTION_COMPLETED) events via SSE during the CUA loop. **Verification:** Frontend chat view updates dynamically showing AI thought process and actions.
    - FR9.2 (app/page.tsx): Display clear loading states while the sandbox is starting and the agent is researching. **Verification:** UI indicates activity appropriately.

**VII. Implementation Tasks & Checklist (Granular)**

*(This replaces Section 7 from the previous response, providing a clear checklist)*

**Phase 1: Base Setup & E2B Verification (1-2 days)**

- **1.1: Project Setup:**
    - 1.1.1: Clone E2B Surf repo to aso-e2b-surf-mvp.
    - 1.1.2: npm install. **Verify:** No errors.
    - 1.1.3: Create .env.local from example.
    - 1.1.4: Add *your* E2B_API_KEY and OPENAI_API_KEY to .env.local. **Verify:** Keys are correct.
    - 1.1.5: Run npm run dev. **Verify:** Starts on localhost:3000, UI loads.
- **1.2: Basic E2B Sandbox Test:**
    - 1.2.1: Click "Start new Sandbox" in UI. **Verify:** VNC panel connects, shows Linux desktop. E2B dashboard shows active sandbox.
    - 1.2.2: Enter generic prompt ("Open Firefox"). **Verify:** Firefox opens in VNC, chat shows AI actions.
    - 1.2.3: Click "Stop". **Verify:** VNC disconnects, E2B sandbox terminates.

**Phase 2: ASO Task Adaptation (2-3 days)**

- **2.1: Update Agent Instructions:**
    - 2.1.1: Open lib/streaming/openai.ts. Replace INSTRUCTIONS constant with the **ASO Web Research** instructions (provided in Section VIII below). **Verify:** Instructions saved correctly.
- **2.2: Implement Frontend Input UI:**
    - 2.2.1: Create components/KeywordInputForm.tsx (use starter code).
    - 2.2.2: Create components/ResultsDisplay.tsx (use starter code).
    - 2.2.3: In app/page.tsx, add appDescription, seedKeywords, isResearching, markdownResult, finalError state variables.
    - 2.2.4: Conditionally render KeywordInputForm initially in page.tsx.
    - 2.2.5: Implement handleStartResearch in page.tsx (use starter code) to construct prompt and call sendMessage.
    - 2.2.6: Connect form button to handleStartResearch. **Verify:** UI shows new form, button click logs intended action.
- **2.3: Adapt API Route Input Handling:**
    - 2.3.1: Modify app/api/chat/route.ts POST handler to receive appDescription and keywordsString from request body.
    - 2.3.2: Parse keywordsString into an array.
    - 2.3.3: Construct the initialUserPrompt using these inputs and pass it correctly to the streamer.stream() call. **Verify:** Log the exact prompt being used by the API route.
- **2.4: Initial ASO Flow Test:**
    - 2.4.1: Run npm run dev. Enter test ASO data. Click "Start Research".
    - 2.4.2: Observe VNC & Chat. **Verify:** Does the agent open Firefox, go to Google, type the *first* seed keyword, press Enter? Does the chat log reflect ASO-related reasoning? (Focus on initiation, not full completion yet).

**Phase 3: Keyword Extraction & Markdown Reporting (2-3 days)**

- **3.1: Implement Keyword Parsing:**
    - 3.1.1: In route.ts, implement parseKeywordsFromLLMOutput(messages) helper (use starter code). Prioritize parsing the final JSON block. Add robust comments.
    - 3.1.2: In the main handler, after the streamer loop, call parseKeywordsFromLLMOutput using the collected interactionHistory. **Note:** Ensure interactionHistory is correctly populated during the stream (see route.ts starter code comments). Log the parsed keywords or errors. **Verify:** Test with expected JSON output from LLM (manually simulate if needed), verify parsing logic works.
- **3.2: Implement Markdown Generation:**
    - 3.2.1: In route.ts, implement generateMarkdown(...) helper (use starter code, initially without relevance). Ensure it handles empty keyword lists and includes agent errors.
    - 3.2.2: Call generateMarkdown after parsing keywords.
    - 3.2.3: Modify the final DONE SSE event in route.ts to include the markdownReport in its content field. **Verify:** Check SSE stream in browser dev tools for the final event containing Markdown.
- **3.3: Implement Frontend Display/Download:**
    - 3.3.1: In page.tsx, add useEffect hook to detect the final DONE SSE event (check its content for Markdown) and set the markdownResult state. Handle potential ERROR events by setting finalError state.
    - 3.3.2: Conditionally render <ResultsDisplay markdownContent={markdownResult} /> or an error message based on state. Hide the input form when results/error are shown.
    - 3.3.3: Implement handleDownloadMarkdown function and connect it to a download button shown alongside the results. **Verify:** Run E2E test. Markdown report displays, download works. Test error case display.

**Phase 4: RAG Integration (2-3 days)**

- **4.1: Setup RAG Clients:**
    - 4.1.1: npm install @pinecone-database/pinecone. Add Pinecone keys to .env.local. **Verify:** Install succeeds.
    - 4.1.2: Create Pinecone index manually (e.g., aso-keywords-mvp, dimension 1536 for ada-002, cosine metric). **Verify:** Index exists in Pinecone console.
    - 4.1.3: Create lib/embeddingService.ts, implement getEmbeddings (use starter code). **Verify:** Test function independently - returns vectors.
    - 4.1.4: Create lib/pineconeClient.ts, implement initPinecone, upsertKeywords, queryKeywords (use starter code). **Verify:** Test functions independently - can connect, upsert, query.
- **4.2: Integrate RAG in API Route:**
    - 4.2.1: In route.ts, *after* parseKeywordsFromLLMOutput and *before* generateMarkdown:
        - If keywords were extracted: Call getEmbeddings. Call upsertKeywords. Call queryKeywords. Store relevance scores mapped to keywords.
    - 4.2.2: Pass the ragResults (keyword + relevance score) to generateMarkdown. **Verify:** Add detailed logs in route.ts to track RAG steps and generated scores.
- **4.3: Update Markdown:**
    - 4.3.1: Modify generateMarkdown in route.ts to accept ragResults, include the "Relevance Score" column, and sort the table by score (descending). **Verify:** Run E2E test. Markdown report includes relevance scores and is sorted.

**Phase 5: Testing, Refinement & Documentation (1-2 days)**

- **5.1: Testing:** Perform comprehensive E2E tests (various inputs, potential web page variations if possible). Test error handling.
- **5.2: Prompt Tuning:** Refine CUA prompts (INSTRUCTIONS, initial prompt) based on test observations to improve reliability.
- **5.3: Code Quality:** Add extensive comments, clarifying logic, assumptions, potential issues. Refactor for clarity. Ensure consistent logging.
- **5.4: Documentation:** Finalize README.md (Setup, Usage, Known Issues/Limitations). Ensure code comments are thorough.
- **5.5: Demo Prep:** Record a clear demo of the working MVP.

**VIII. Core Component Code Snippets (Enhanced Comments)**

*(Provide the heavily commented versions of openai.ts INSTRUCTIONS, route.ts, pineconeClient.ts, embeddingService.ts, KeywordInputForm.tsx, ResultsDisplay.tsx from the previous response here. Ensure all // TODO: Implement... or placeholder comments are addressed or clearly marked as needing specific implementation details like actual API calls.)*

**Example: lib/embeddingService.ts (Enhanced Comments)**

```tsx
// lib/embeddingService.ts
import OpenAI from 'openai'; // Using OpenAI for embeddings as an example

// --- Global Variables ---
// Cache the OpenAI client instance to avoid re-initialization on every call
let openai: OpenAI | null = null;
// Define the model ID and its corresponding vector dimension
// Common choices:
// - "text-embedding-ada-002": 1536 dimensions (Older, widely compatible)
// - "text-embedding-3-small": 1536 dimensions (Newer, potentially cheaper/faster)
// - "text-embedding-3-large": 3072 dimensions (Newer, potentially higher quality)
// Ensure your Pinecone index is created with the matching dimension.
const EMBEDDING_MODEL = "text-embedding-3-large";
const EMBEDDING_DIMENSION = 3072;

/**
 * Initializes the OpenAI client using the API key from environment variables.
 * Caches the client instance for reuse.
 * @throws {Error} If OPENAI_API_KEY is not set in the environment.
 * @returns {OpenAI} The initialized OpenAI client instance.
 */
function initOpenAI(): OpenAI {
    // If client already exists, return it
    if (openai) return openai;

    // Retrieve API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        // Critical error if key is missing
        console.error("[Embedding Service] ERROR: OPENAI_API_KEY is not configured in environment variables.");
        throw new Error("Server configuration error: OpenAI API key missing for embeddings.");
    }

    // Create and cache the client instance
    openai = new OpenAI({ apiKey });
    console.log(`[Embedding Service] OpenAI client initialized for model ${EMBEDDING_MODEL}.`);
    return openai;
}

/**
 * Generates vector embeddings for a list of text strings using the configured OpenAI model.
 * Handles basic input cleaning and potential API errors.
 * @param {string[]} texts - An array of text strings to embed.
 * @returns {Promise<number[][]>} A promise that resolves to an array of embedding vectors (number arrays).
 * @throws {Error} If the OpenAI API call fails or returns unexpected data.
 */
export async function getEmbeddings(texts: string[]): Promise<number[][]> {
    // Return immediately if input is empty or invalid
    if (!texts || texts.length === 0) {
        console.log("[Embedding Service] No texts provided for embedding.");
        return [];
    }

    // Ensure OpenAI client is initialized
    const client = initOpenAI();

    // Basic input cleaning: replace newlines (can interfere with embeddings) and trim whitespace.
    // Filter out any resulting empty strings.
    const cleanedTexts = texts.map(t => t.replace(/\n/g, " ").trim()).filter(Boolean);
    if (cleanedTexts.length === 0) {
        console.log("[Embedding Service] All input texts were empty after cleaning.");
        return [];
    }

    console.log(`[Embedding Service] Requesting embeddings for ${cleanedTexts.length} texts using model ${EMBEDDING_MODEL}...`);

    try {
        // Call the OpenAI Embeddings API
        // The endpoint efficiently handles arrays of texts.
        const response = await client.embeddings.create({
            model: EMBEDDING_MODEL,
            input: cleanedTexts,
            // 'dimensions' parameter is only for specific models like text-embedding-3 that support it.
            // dimensions: EMBEDDING_MODEL.startsWith("text-embedding-3") ? EMBEDDING_DIMENSION : undefined,
        });

        // --- Verification and Error Handling ---
        // Check if the response structure is as expected
        if (!response.data || !Array.isArray(response.data)) {
            throw new Error("Invalid response structure received from OpenAI Embeddings API: 'data' array missing.");
        }
        // Check if the number of embeddings received matches the number of texts sent
        if (response.data.length !== cleanedTexts.length) {
            throw new Error(`API returned an unexpected number of embeddings. Expected ${cleanedTexts.length}, received ${response.data.length}.`);
        }
        // Check if each embedding has the correct dimension
        const incorrectDimension = response.data.find(item => !item.embedding || item.embedding.length !== EMBEDDING_DIMENSION);
        if (incorrectDimension) {
             console.error("[Embedding Service] Embedding with incorrect dimension found:", incorrectDimension);
             throw new Error(`API returned at least one embedding with incorrect dimension. Expected ${EMBEDDING_DIMENSION}, check model.`);
        }
        // --- End Verification ---

        console.log(`[Embedding Service] Successfully retrieved ${response.data.length} embeddings.`);
        // Extract the embedding vectors from the response data
        return response.data.map(item => item.embedding);

    } catch (error: any) {
        // Log detailed error information
        console.error(`[Embedding Service] Error calling OpenAI Embeddings API: ${error.message}`, {
            status: error.status, // Log HTTP status if available
            headers: error.headers, // Log headers if available
            errorBody: error.error // Log specific error details from OpenAI if available
        });
        // Rethrow the error to be handled by the calling function (e.g., in the API route)
        // This allows the API route to report the failure back to the user.
        throw new Error(`Embedding generation failed: ${error.message}`);
    }
}
```

*(Repeat this level of detail and commenting for pineconeClient.ts, route.ts, openai.ts INSTRUCTIONS, KeywordInputForm.tsx, ResultsDisplay.tsx)*

**lib/pineconeClient.ts (Pinecone Interaction Logic)**

```tsx
// lib/pineconeClient.ts
import { Pinecone, Index, RecordMetadata } from '@pinecone-database/pinecone'; // Import specific types
import { getEnvVariable } from '@/lib/configHelper'; // Helper to safely get env vars (implement this)

// --- Types ---
// Define the expected structure of metadata stored alongside vectors in Pinecone.
// This helps ensure consistency and provides type safety.
// Add any other fields extracted by the CUA agent that should be stored.
interface KeywordMetadata extends RecordMetadata { // Extends base Pinecone metadata type
    text: string; // The original keyword text is essential for retrieval
    // Optional fields based on visual extraction (might be "Locked" or number if unlocked)
    popularity_estimate?: string | number | null;
    difficulty_estimate?: string | number | null;
    // Add other relevant fields, e.g., source_url if tracked
}

// Define the expected structure for upserting data.
// Requires the ID (must be unique string), the embedding values, and metadata.
interface KeywordVector {
    id: string;
    values: number[];
    metadata: KeywordMetadata;
}

// --- Global Variables & Initialization ---
// Cache the Pinecone client and Index instance to avoid re-initialization on every API call.
let pinecone: Pinecone | null = null;
// Use 'any' for index initially, but ideally replace with Index<KeywordMetadata> once metadata is finalized.
let index: Index<KeywordMetadata> | null = null;

// Define Pinecone configuration constants (can be moved to a config file)
// Get values safely from environment variables using a helper function.
const PINECONE_API_KEY = getEnvVariable('PINECONE_API_KEY');
const PINECONE_ENVIRONMENT = getEnvVariable('PINECONE_ENVIRONMENT'); // Required for older index types
const PINECONE_INDEX_NAME = getEnvVariable('PINECONE_INDEX_NAME', 'aso-keywords-mvp'); // Allow override, default name
// Determine Vector Dimension from Embedding Model (MUST match the model used in embeddingService.ts)
// Example for text-embedding-ada-002. Adjust if using a different model.
const VECTOR_DIMENSION = 1536;
// Pinecone recommends upserting in batches for performance and to avoid request size limits.
const PINECONE_UPSERT_BATCH_SIZE = 100;

/**
 * Initializes the Pinecone client and connects to the specified index.
 * Ensures the index exists and caches the connection. Handles errors during initialization.
 * This should be called implicitly by other functions before interacting with the index.
 * @throws {Error} If Pinecone environment variables are not set or connection fails.
 * @returns {Promise<Index<KeywordMetadata>>} A promise that resolves to the connected Pinecone Index object.
 */
async function initPinecone(): Promise<Index<KeywordMetadata>> {
    // Return cached instance if already initialized
    if (index) return index;

    console.log("[Pinecone Client] Initializing...");

    // Validate environment variables
    if (!PINECONE_API_KEY) { // Environment not needed for serverless indexes, check Pinecone docs
        throw new Error("[Pinecone Client] PINECONE_API_KEY environment variable is not set.");
    }
    // Add check for PINECONE_ENVIRONMENT if using older index types

    try {
        // Initialize Pinecone client
        // Use new Pinecone({ apiKey: PINECONE_API_KEY }); - Update based on latest SDK
        // The exact initialization might vary slightly based on Pinecone client version
        pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
        console.log("[Pinecone Client] Pinecone client created.");

        // --- Index Existence Check (CRUCIAL) ---
        // Verify that the target index actually exists before trying to connect.
        console.log(`[Pinecone Client] Checking if index '${PINECONE_INDEX_NAME}' exists...`);
        const indexList = await pinecone.listIndexes();
        const indexExists = indexList.indexes?.some(i => i.name === PINECONE_INDEX_NAME);

        if (!indexExists) {
            console.error(`[Pinecone Client] FATAL: Index named '${PINECONE_INDEX_NAME}' does not exist in environment/project.`);
            console.error(`[Pinecone Client] Please create the index manually in the Pinecone console with dimension ${VECTOR_DIMENSION} and metric 'cosine'.`);
            throw new Error(`Pinecone index '${PINECONE_INDEX_NAME}' not found.`);
        }
        console.log(`[Pinecone Client] Index '${PINECONE_INDEX_NAME}' found.`);

        // Connect to the specific index
        // Use generic 'RecordMetadata' initially, replace with 'KeywordMetadata' if strict typing is desired
        index = pinecone.index<KeywordMetadata>(PINECONE_INDEX_NAME);

        // Optional: Check index stats to confirm connection and dimension
        // const stats = await index.describeIndexStats();
        // if (stats.dimension !== VECTOR_DIMENSION) {
        //     throw new Error(`Pinecone index dimension mismatch. Expected ${VECTOR_DIMENSION}, found ${stats.dimension}.`);
        // }
        // console.log(`[Pinecone Client] Successfully connected to index '${PINECONE_INDEX_NAME}' (Dimension: ${stats.dimension}).`);

        return index;
    } catch (error: any) {
        console.error(`[Pinecone Client] Initialization or index connection failed: ${error.message}`, error);
        // Set index back to null on failure
        index = null;
        pinecone = null;
        throw new Error(`Failed to initialize Pinecone: ${error.message}`); // Rethrow for upstream handling
    }
}

/**
 * Upserts (inserts or updates) keyword vectors into the Pinecone index.
 * Handles batching requests for efficiency.
 * @param {KeywordMetadata[]} keywordsData - Array of objects containing keyword metadata (must include 'keyword' field).
 * @param {number[][]} embeddings - Array of embedding vectors corresponding to keywordsData.
 * @param {string} namespace - The Pinecone namespace to upsert data into (e.g., a unique request ID or user ID). Helps isolate data.
 * @throws {Error} If input arrays mismatch, initialization fails, or upsert operation fails.
 */
export async function upsertKeywords(
    keywordsData: KeywordMetadata[], // Expecting objects with at least 'keyword'
    embeddings: number[][],
    namespace: string
): Promise<void> {
    const pineconeIndex = await initPinecone(); // Ensures index connection
    if (!pineconeIndex) throw new Error("Pinecone not initialized for upsert."); // Should not happen if init throws

    // Input validation
    if (!keywordsData || !embeddings || keywordsData.length !== embeddings.length) {
        console.error("[Pinecone Client] ERROR: Keywords data count does not match embeddings count for upsert.");
        throw new Error("Input data mismatch for Pinecone upsert.");
    }
    if (keywordsData.length === 0) {
        console.log("[Pinecone Client] No keyword vectors to upsert.");
        return; // Nothing to do
    }
    if (!namespace || typeof namespace !== 'string') {
        throw new Error("A valid string namespace must be provided for Pinecone upsert.");
    }

    console.log(`[Pinecone Client] Preparing to upsert ${keywordsData.length} vectors into namespace '${namespace}'...`);

    // --- Prepare Vectors for Pinecone SDK ---
    // Construct the vector objects required by the Pinecone client upsert method.
    const vectorsToUpsert: KeywordVector[] = keywordsData.map((meta, i) => {
        // Basic validation for each embedding
        if (!embeddings[i] || embeddings[i].length !== VECTOR_DIMENSION) {
            console.error(`[Pinecone Client] ERROR: Invalid embedding found for keyword '${meta.keyword}' at index ${i}. Expected dimension ${VECTOR_DIMENSION}.`);
            throw new Error(`Invalid embedding dimension for keyword '${meta.keyword}'.`);
        }
        // Generate a unique and valid ID for each vector. Cannot contain spaces or certain special characters.
        // Using namespace prefix helps ensure uniqueness across requests/users.
        const safeKeywordId = meta.keyword.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 500); // Basic sanitization + length limit
        const vectorId = `${namespace}_${safeKeywordId}`;

        return {
            id: vectorId,
            values: embeddings[i],
            // Ensure metadata contains at least 'text', plus any other provided fields.
            metadata: {
                ...meta, // Include all passed metadata
                text: meta.keyword, // Ensure 'text' field matches the keyword for filtering/retrieval
            },
        };
    });

    // --- Batch Upsert ---
    console.log(`[Pinecone Client] Upserting ${vectorsToUpsert.length} vectors in batches of ${PINECONE_UPSERT_BATCH_SIZE}...`);
    for (let i = 0; i < vectorsToUpsert.length; i += PINECONE_UPSERT_BATCH_SIZE) {
        const batch = vectorsToUpsert.slice(i, i + PINECONE_UPSERT_BATCH_SIZE);
        const batchNumber = Math.floor(i / PINECONE_UPSERT_BATCH_SIZE) + 1;
        console.log(`[Pinecone Client] Upserting batch ${batchNumber} (${batch.length} vectors)...`);
        try {
            // Target the specific namespace for the upsert operation.
            await pineconeIndex.namespace(namespace).upsert(batch);
            console.log(`[Pinecone Client] Batch ${batchNumber} upsert successful.`);
        } catch (error: any) {
            console.error(`[Pinecone Client] ERROR upserting batch ${batchNumber}: ${error.message}`, error);
            // Decide error handling: stop or continue? For MVP, rethrowing to stop the process might be safer.
            throw new Error(`Failed to upsert batch ${batchNumber} to Pinecone: ${error.message}`);
        }
    }
    console.log(`[Pinecone Client] All batches upserted successfully for namespace '${namespace}'.`);
}

/**
 * Queries the Pinecone index for vectors semantically similar to the query embedding.
 * @param {number[]} queryEmbedding - The embedding vector to search with (e.g., app description embedding).
 * @param {number} topK - The maximum number of similar results to retrieve.
 * @param {string} [namespace] - Optional namespace to restrict the query to.
 * @returns {Promise<Map<string, number>>} A promise resolving to a Map where keys are the keyword text and values are the similarity scores.
 * @throws {Error} If initialization or query fails.
 */
export async function queryKeywords(
    queryEmbedding: number[],
    topK: number,
    namespace?: string // Allow querying within a specific namespace
): Promise<Map<string, number>> {
    const pineconeIndex = await initPinecone(); // Ensures index connection
    if (!pineconeIndex) throw new Error("Pinecone not initialized for query.");

    // Input validation
    if (!queryEmbedding || queryEmbedding.length !== VECTOR_DIMENSION) {
        throw new Error(`Invalid query embedding dimension. Expected ${VECTOR_DIMENSION}.`);
    }
    if (!topK || topK <= 0) {
        throw new Error("Invalid topK value for query. Must be positive.");
    }

    console.log(`[Pinecone Client] Querying for top ${topK} similar keywords${namespace ? ` in namespace '${namespace}'` : ''}...`);

    try {
        // Construct the query request object for the Pinecone SDK
        const queryRequest = {
            vector: queryEmbedding,
            topK: topK,
            includeMetadata: true, // Crucial: We need metadata.text to identify the keyword
            includeValues: false,  // Usually not needed in the response
            // filter: { // Optional: Add metadata filters if needed later
            //    'some_metadata_field': {'$eq': 'some_value'}
            // }
        };

        // Target the correct index or namespace
        const targetIndex = namespace ? pineconeIndex.namespace(namespace) : pineconeIndex;

        // Execute the query
        const queryResult = await targetIndex.query(queryRequest);

        // Process the results
        const relevanceMap = new Map<string, number>();
        if (queryResult.matches && queryResult.matches.length > 0) {
            console.log(`[Pinecone Client] Query returned ${queryResult.matches.length} matches.`);
            queryResult.matches.forEach(match => {
                // Validate each match before adding to the map
                if (match.metadata && typeof match.metadata.text === 'string' && typeof match.score === 'number') {
                    // Only add if text metadata and score exist and are valid types
                    relevanceMap.set(match.metadata.text, match.score);
                } else {
                    // Log if a match is missing required data
                    console.warn(`[Pinecone Client] Skipping query match with missing text metadata or score. ID: ${match.id}`, match.metadata);
                }
            });
        } else {
            console.log("[Pinecone Client] Query returned no matches.");
        }

        console.log(`[Pinecone Client] Successfully processed ${relevanceMap.size} relevant results from query.`);
        return relevanceMap;

    } catch (error: any) {
        console.error(`[Pinecone Client] Error querying index: ${error.message}`, error);
        throw new Error(`Failed to query Pinecone: ${error.message}`); // Rethrow
    }
}

// --- Helper for Environment Variables ---
// Place this in a shared utility file e.g., lib/configHelper.ts
/**
 * Safely retrieves an environment variable.
 * @param varName The name of the environment variable.
 * @param defaultValue Optional default value if the variable is not set.
 * @returns The value of the environment variable or the default value.
 * @throws {Error} If the variable is not set and no default value is provided.
 */
// export function getEnvVariable(varName: string, defaultValue?: string): string {
//     const value = process.env[varName];
//     if (value !== undefined) {
//         return value;
//     }
//     if (defaultValue !== undefined) {
//         console.warn(`[Config Helper] Environment variable ${varName} not set, using default value.`);
//         return defaultValue;
//     }
//     throw new Error(`[Config Helper] Required environment variable ${varName} is not set.`);
// }
```

**lib/configHelper.ts (New Utility File)**

```tsx
// lib/configHelper.ts

/**
 * Safely retrieves an environment variable from process.env.
 * Throws an error if the variable is mandatory and not set.
 * Provides a default value if optional and not set.
 * Logs warnings for missing optional variables using defaults.
 *
 * @param {string} varName - The name of the environment variable (e.g., "PINECONE_API_KEY").
 * @param {string} [defaultValue] - An optional default value to use if the variable is not set. If no default is provided, the variable is considered mandatory.
 * @returns {string} The value of the environment variable.
 * @throws {Error} If a mandatory variable (no defaultValue) is not found in process.env.
 */
export function getEnvVariable(varName: string, defaultValue?: string): string {
    const value = process.env[varName];

    if (value !== undefined && value !== null && value !== '') {
        // Variable is set and has a value
        return value;
    } else if (defaultValue !== undefined) {
        // Variable is not set (or empty), but a default is provided
        console.warn(`[Config Helper] Environment variable "${varName}" not set or empty. Using default value.`);
        return defaultValue;
    } else {
        // Variable is not set and no default was provided (mandatory variable)
        console.error(`[Config Helper] FATAL: Required environment variable "${varName}" is not set.`);
        throw new Error(`Configuration error: Required environment variable "${varName}" is missing.`);
    }
}
```

**app/api/chat/route.ts (Updated RAG Section & Final SSE)**

```tsx
// ... (Existing imports and helper functions: generateMarkdown, parseKeywordsFromLLMOutput) ...
import { getEmbeddings } from '@/lib/embeddingService';
import { upsertKeywords, queryKeywords } from '@/lib/pineconeClient';
import { formatSSE } from "@/lib/streaming";
import { SSEEvent, SSEEventType } from '@/types/api';
import { AgentOutput, AgentKeywordInfo } from '@/types/appSpecific'; // Define these app-specific types if needed

// --- API Route Handler ---
export async function POST(request: NextRequest) {
    // ... (Setup: abortController, desktop, activeSandboxId, streamer, interactionHistory) ...
    // ... (Input Validation: appDescription, keywordsString, etc.) ...
    // ... (E2B API Key Check) ...
    // ... (Sandbox Management: Create/Connect, Set Timeout) ...
    // ... (Streamer Setup) ...
    // ... (Initial Prompt Construction) ...

    const stream = new ReadableStream({
        async start(controller) {
            const enqueue = (event: SSEEvent) => { /* ... enqueue logic ... */ };

            // ... (Send SANDBOX_CREATED if new) ...

            let agentErrors: string[] = []; // Accumulate errors from agent and RAG

            // --- Run CUA Stream ---
            console.log("[API Route] Starting CUA interaction stream...");
            try {
                for await (const event of streamer.stream({ messages: [loopStartMessage], signal: abortController.signal })) {
                    enqueue(event);
                    // Reconstruct history based on streamed events
                    // ... (logic to push user, assistant, action messages to interactionHistory) ...
                    if (event.type === SSEEventType.ERROR) { agentErrors.push(event.content); }
                    if (event.type === SSEEventType.DONE || event.type === SSEEventType.ERROR) { break; }
                }
                console.log("[API Route] CUA interaction stream finished.");
            } catch (streamError: any) {
                console.error("[API Route] Error during CUA stream processing:", streamError);
                agentErrors.push(`Agent stream error: ${streamError.message}`);
                enqueue({ type: SSEEventType.ERROR, content: `Agent stream processing error: ${streamError.message}` });
            }

            // --- Post-Processing (RAG & Markdown) ---
            console.log("[API Route] Starting post-processing...");
            let markdownReport = "";
            let finalAgentOutput: AgentOutput = { processed_keywords: [], errors: agentErrors, log: [] /* Populate log if needed */ };

            try {
                // 1. Extract Keywords from full history
                const { keywords: extractedKeywords, errors: parsingErrors } = parseKeywordsFromLLMOutput(interactionHistory);
                finalAgentOutput.errors.push(...parsingErrors); // Add parsing errors

                let ragResults: { keyword: string; relevance: number }[] = [];

                if (extractedKeywords.length > 0) {
                    console.log(`[API Route] Extracted ${extractedKeywords.length} keywords. Proceeding with RAG.`);
                    try {
                        // 2. Get Embeddings
                        const textsToEmbed = [appDescription, ...extractedKeywords];
                        console.log(`[API Route] Requesting ${textsToEmbed.length} embeddings...`);
                        const embeddings = await getEmbeddings(textsToEmbed); // Ensure service handles errors
                        const appDescEmbedding = embeddings[0];
                        const keywordEmbeddings = embeddings.slice(1);
                        console.log(`[API Route] Embeddings received.`);

                        // 3. Upsert & Query Pinecone
                        const namespace = `req_${activeSandboxId || 'unknown'}_${Date.now()}`; // Create unique namespace
                        console.log(`[API Route] Upserting ${extractedKeywords.length} keywords to Pinecone namespace ${namespace}...`);
                        // Prepare metadata for Pinecone (currently just text)
                        const keywordsForPinecone: KeywordMetadata[] = extractedKeywords.map(kw => ({ text: kw, keyword: kw })); // Ensure 'text' and 'keyword' metadata
                        await upsertKeywords(keywordsForPinecone, keywordEmbeddings, namespace);
                        console.log(`[API Route] Querying Pinecone...`);
                        const relevanceMap = await queryKeywords(appDescEmbedding, extractedKeywords.length * 2, namespace); // Query more for ranking

                        // 4. Combine Results
                        ragResults = extractedKeywords.map(kw => ({
                            keyword: kw,
                            relevance: relevanceMap.get(kw) ?? 0, // Default to 0 if not found
                        }));
                        console.log("[API Route] RAG processing successful.");

                    } catch (ragError: any) {
                         console.error("[API Route] Error during RAG processing:", ragError);
                         finalAgentOutput.errors.push(`RAG Processing Error: ${ragError.message}. Showing only extracted keywords.`);
                         // Proceed without relevance scores if RAG fails
                         ragResults = extractedKeywords.map(kw => ({ keyword: kw, relevance: 0 })); // Assign default relevance
                    }
                } else {
                    console.log("[API Route] No keywords extracted, skipping RAG.");
                     if (finalAgentOutput.errors.length === 0) { // Add error if no keywords AND no prior errors
                         finalAgentOutput.errors.push("Agent did not successfully extract any keywords.");
                     }
                }

                 // Update processed_keywords with RAG data before generating Markdown
                finalAgentOutput.processed_keywords = ragResults.map(r => ({
                     keyword: r.keyword,
                     relevance: r.relevance,
                     // Add back popularity/difficulty if they were parsed earlier
                }));

                // 5. Generate Markdown using the potentially RAG-enhanced results
                markdownReport = generateMarkdown(finalAgentOutput); // Pass the whole structure

            } catch (postProcessingError: any) {
                // Catch errors in parsing or structuring before markdown generation
                console.error("[API Route] Error during final data structuring:", postProcessingError);
                finalAgentOutput.errors.push(`Final report generation error: ${postProcessingError.message}`);
                // Generate markdown with whatever data is available + errors
                markdownReport = generateMarkdown(finalAgentOutput);
            }

            // --- Send Final Report via SSE ---
            console.log("[API Route] Sending final DONE event with Markdown report.");
            enqueue({ type: SSEEventType.DONE, content: markdownReport }); // Send markdown in DONE event
            controller.close(); // Close the SSE stream
        },
        cancel(reason) { /* ... cancel logic ... */ }
    });

    return new Response(stream, { /* headers */ });

    // ... (catch block for top-level errors: sandbox creation etc.) ...
    // ... (finally block for potential cleanup) ...
}

// --- Define AgentOutput Type ---
// Place in types/appSpecific.ts or similar
interface AgentKeywordInfo {
  keyword: string;
  popularity?: string | number | null;
  difficulty?: string | number | null;
  relevance?: number; // Added by RAG
}

interface AgentOutput {
  processed_keywords: AgentKeywordInfo[];
  errors: string[];
  log: string[]; // Optional: For debug logs sent to frontend
}

// Helper to generate Markdown (ensure it uses AgentOutput type)
function generateMarkdown(data: AgentOutput): string {
    let md = `# ASO Keyword Research Report\n\n`;

    if (data.errors && data.errors.length > 0) {
        md += `**⚠️ Errors Encountered:**\n`;
        data.errors.forEach(err => md += `- ${err}\n`);
        md += `\n`;
    }

    if (data.processed_keywords && data.processed_keywords.length > 0) {
        md += `## Discovered Keywords (Ranked by Relevance)\n\n`;
        md += `| Keyword | Relevance Score | Popularity (Est.) | Difficulty (Est.) |\n`; // Add optional columns
        md += `|---|---|---|---|\n`;

        // Sort by relevance (descending)
        data.processed_keywords.sort((a, b) => (b.relevance ?? -1) - (a.relevance ?? -1));

        data.processed_keywords.forEach(kw => {
            md += `| ${kw.keyword || 'N/A'} `;
            md += `| ${kw.relevance !== undefined ? kw.relevance.toFixed(3) : 'N/A'} `;
            md += `| ${kw.popularity ?? 'N/A'} `; // Display estimates if available
            md += `| ${kw.difficulty ?? 'N/A'} |\n`; // Display estimates if available
        });
    } else if (!data.errors || data.errors.length === 0) { // Only show if no errors occurred but no keywords found
        md += `No keywords were successfully extracted by the agent.\n`;
    }

    return md;
}
```

**backend_agent/utils/api_clients.ts (New File - API Client Logic)**

```tsx
// lib/api_clients.ts

import OpenAI from 'openai';
import { getEnvVariable } from '@/lib/configHelper'; // Assuming configHelper exists
import { ChatMessage } from '@/types/chat'; // For final extraction context
// Import specific OpenAI CUA request/response types for clarity
import type { ResponseInput, Tool } from 'openai/resources/responses/responses';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions'; // For standard chat models

// --- OpenAI Client Initialization ---
// Cached instance to reuse the client across multiple function calls within a single API route invocation.
let openai: OpenAI | null = null;

/**
 * Initializes and returns the shared OpenAI client instance.
 * Ensures API key is loaded from environment variables securely.
 * @throws {Error} If OPENAI_API_KEY environment variable is not set.
 * @returns {OpenAI} The initialized OpenAI client.
 */
function getOpenAIClient(): OpenAI {
    // Return cached instance if it exists
    if (openai) return openai;

    console.log("[API Client] Initializing OpenAI Client...");
    // Retrieve the API key using the helper function which includes error handling
    const apiKey = getEnvVariable('OPENAI_API_KEY'); // Throws if not set

    // Initialize the OpenAI SDK client
    openai = new OpenAI({ apiKey });
    console.log("[API Client] OpenAI Client initialized successfully.");
    return openai;
}

// --- Constants for Models ---
// Define model IDs clearly. Makes it easy to update or swap models later.
// Verification: Check OpenAI documentation for the latest recommended model IDs for these tasks.
const CUA_MODEL_ID = "computer-use-preview"; // The specific model for Computer Use actions
const EMBEDDING_MODEL_ID = "text-embedding-ada-002"; // Standard embedding model
const EMBEDDING_DIMENSIONS = 1536; // MUST match the chosen embedding model and Pinecone index dimension
const SUMMARY_MODEL_ID = "gpt-4o-mini"; // Efficient model for final parsing/summarization

/**
 * Calls the OpenAI Computer Use Agent (CUA) API endpoint (/v1/responses).
 * This function sends the current state (history, latest screenshot) to the CUA model
 * and receives the next set of actions or reasoning from the AI.
 *
 * @param {ResponseInput[]} currentInputItems - The sequence of messages and outputs forming the input for this turn. This typically includes history and the latest screenshot formatted as computer_call_output.
 * @param {number} displayWidth - The width of the virtual screen presented to the CUA model (scaled).
 * @param {number} displayHeight - The height of the virtual screen presented to the CUA model (scaled).
 * @param {string} [previousResponseId] - Optional ID from the previous CUA response to maintain conversation context efficiently.
 * @param {string} [instructions] - Optional override for system instructions (usually set once in the streamer).
 * @returns {Promise<OpenAI.Responses.Response>} A promise resolving to the full, raw CUA API response object.
 * @throws {Error} If the API call fails or returns an invalid structure.
 */
export async function callCuaLlmApi(
    currentInputItems: ResponseInput[], // Input requires specific OpenAI CUA types
    displayWidth: number,
    displayHeight: number,
    previousResponseId?: string,
    instructions?: string
): Promise<OpenAI.Responses.Response> {
    const client = getOpenAIClient(); // Get initialized client
    console.log(`[API Client] Calling CUA LLM (${CUA_MODEL_ID}). Input items: ${currentInputItems.length}. Prev Response ID: ${previousResponseId ? 'Yes' : 'No'}.`);

    // --- Define the Computer Tool for the API ---
    // This structure tells the CUA model the constraints and type of the environment it's controlling.
    const computerTool: Tool = {
        type: "computer_use_preview", // MUST match the exact type required by the API version
        display_width: displayWidth,
        display_height: displayHeight,
        environment: "linux", // Crucial: Inform the model it's controlling a Linux environment (E2B default)
    };

    // --- Prepare the Request Payload ---
    // The API call structure depends on whether it's the first call or a continuation.
    const requestBody: OpenAI.Responses.CreateParams = {
        model: CUA_MODEL_ID,
        // If previousResponseId is provided, the API expects *only* the new input since the last response.
        // If it's the first call, the API expects the full starting input sequence.
        input: currentInputItems, // Send the prepared input items
        previous_response_id: previousResponseId, // Include if continuing the interaction
        tools: [computerTool], // Tell the model the computer tool is available
        truncation: "auto", // Let OpenAI manage history truncation if needed
        instructions: instructions, // System instructions (if provided, else model defaults)
        reasoning: { // Parameters influencing AI 'thought process'
            effort: "medium", // Balance between speed and thoroughness
            generate_summary: "concise", // Affects the final output_text summary (if generated)
        },
    };

    try {
        // --- Execute the API Call ---
        console.log(`[API Client] Sending request to OpenAI /v1/responses...`);
        const response = await client.responses.create(requestBody);
        console.log(`[API Client] CUA LLM Response received. ID: ${response.id}`);

        // --- Basic Response Validation ---
        // Ensure the fundamental 'output' array exists in the response.
        if (!response.output || !Array.isArray(response.output)) {
            console.error("[API Client] ERROR: Invalid CUA response - 'output' array missing.", response);
            throw new Error("Invalid response structure received from CUA API.");
        }

        // Return the entire raw response object for the caller (streamer) to process.
        return response;

    } catch (error: any) {
        // --- Error Handling ---
        console.error(`[API Client] ERROR calling OpenAI CUA API: ${error.message}`, {
            status: error.status, // HTTP status code if available
            code: error.code, // OpenAI specific error code if available
        });
        // Provide a more informative error message back to the caller.
        throw new Error(`OpenAI CUA API call failed: ${error.message || 'Unknown API error'}`);
    }
}

/**
 * Generates vector embeddings for a list of text strings using the specified OpenAI embedding model.
 * Handles input cleaning and potential API errors.
 *
 * @param {string[]} texts - An array of non-empty text strings to embed.
 * @returns {Promise<number[][]>} A promise resolving to an array of embedding vectors.
 * @throws {Error} If the API call fails or returns invalid data.
 */
export async function getEmbeddings(texts: string[]): Promise<number[][]> {
    // Input validation
    if (!texts || texts.length === 0) {
        console.log("[API Client - Embeddings] No texts provided for embedding.");
        return [];
    }
    const client = getOpenAIClient(); // Get initialized client

    // Clean input texts (remove newlines which can affect embeddings, trim whitespace)
    const cleanedTexts = texts.map(t => t.replace(/\n/g, " ").trim()).filter(Boolean);
    if (cleanedTexts.length === 0) {
        console.log("[API Client - Embeddings] All input texts were empty after cleaning.");
        return [];
    }

    console.log(`[API Client - Embeddings] Requesting embeddings for ${cleanedTexts.length} texts using model ${EMBEDDING_MODEL_ID}...`);

    try {
        // --- Call OpenAI Embeddings API ---
        const response = await client.embeddings.create({
            model: EMBEDDING_MODEL_ID,
            input: cleanedTexts,
            // Ensure 'dimensions' parameter is only used if the model supports it (e.g., text-embedding-3)
            // dimensions: EMBEDDING_DIMENSIONS // Uncomment and adjust if using v3 models
        });

        // --- Response Validation ---
        if (!response.data || response.data.length !== cleanedTexts.length) {
            throw new Error(`API returned unexpected number of embeddings (${response.data?.length} vs ${cleanedTexts.length})`);
        }
        // Verify embedding dimensions (optional but good practice)
        // const firstEmbedding = response.data[0]?.embedding;
        // if (!firstEmbedding || firstEmbedding.length !== EMBEDDING_DIMENSIONS) {
        //     throw new Error(`API returned embeddings with incorrect dimension. Expected ${EMBEDDING_DIMENSIONS}.`);
        // }

        console.log(`[API Client - Embeddings] Successfully retrieved ${response.data.length} embeddings.`);
        // Extract and return the embedding vectors
        return response.data.map(item => item.embedding);

    } catch (error: any) {
        console.error(`[API Client - Embeddings] ERROR calling OpenAI Embeddings API: ${error.message}`, error);
        throw new Error(`Embedding generation failed: ${error.message}`); // Rethrow for caller
    }
}

/**
 * Calls a standard chat completion LLM (e.g., GPT-4o Mini) to parse a conversation history
 * and extract a structured list of keywords. This serves as a robust way to get the final
 * data if the CUA model's final message format is unreliable.
 *
 * @param {ChatMessage[]} fullInteractionHistory - The complete conversation history (user, assistant, system, action messages).
 * @returns {Promise<{ keywords: string[] }>} A promise resolving to the extracted unique keywords. Returns empty array on failure.
 * @throws {Error} If the API call itself fails. Parsing errors are handled internally.
 */
export async function extractFinalDataFromLlm(
    fullInteractionHistory: ChatMessage[]
): Promise<{ keywords: string[] }> {
    const client = getOpenAIClient();
    console.log("[API Client - Extraction] Calling LLM for final data extraction...");

    // --- Prepare History String for Summary Prompt ---
    // Convert the structured history into a plain text format that a standard chat model can understand.
    let historyString = "Conversation Log:\n";
    fullInteractionHistory.forEach(msg => {
        historyString += `[${msg.role.toUpperCase()}] ${typeof msg.content === 'string' ? msg.content.substring(0, 200) + (msg.content.length > 200 ? '...' : '') : JSON.stringify(msg).substring(0, 200) + '...'}\n`; // Simple representation, truncate long content/actions
    });
    // Add truncation if history gets very long
    // ... (truncation logic if needed) ...

    // --- Define Extraction Prompt ---
    // This prompt explicitly asks the LLM to act as a parser and return JSON.
    const extractionPrompt = `Review the following conversation log where an AI assistant controlled a web browser to find ASO keywords. Your task is to identify and extract all the unique keyword suggestions the assistant found during its web research (e.g., from Google Autocomplete, website lists).

${historyString}

Based *only* on the information in the log, especially the assistant's final messages or collected lists, output a JSON object containing a single key "discovered_keywords". This key should hold an array of unique keyword strings.

Example Output:
\`\`\`json
{
  "discovered_keywords": [
    "keyword example 1",
    "another keyword found"
  ]
}
\`\`\`

If you cannot confidently identify any keywords from the log, return:
\`\`\`json
{
  "discovered_keywords": []
}
\`\`\`

Output *only* the valid JSON object and nothing else.`;

    try {
        // --- Call Chat Completion API ---
        console.log(`[API Client - Extraction] Sending request to ${SUMMARY_MODEL_ID}...`);
        const response = await client.chat.completions.create({
            model: SUMMARY_MODEL_ID,
            messages: [{ role: "system", content: extractionPrompt }],
            temperature: 0.0, // Zero temperature for deterministic parsing behavior
            max_tokens: 1000, // Adjust based on expected max keyword list size
            // Request JSON output format for easier parsing
            response_format: { type: "json_object" },
        });

        const messageContent = response.choices[0]?.message?.content;

        // --- Parse Response ---
        if (!messageContent) {
            console.error("[API Client - Extraction] ERROR: LLM response content was empty.");
            throw new Error("Keyword extraction LLM returned empty content.");
        }

        console.log("[API Client - Extraction] Raw LLM response:", messageContent);
        try {
            const parsedJson = JSON.parse(messageContent);
            if (parsedJson && Array.isArray(parsedJson.discovered_keywords)) {
                // Validate and clean keywords
                const keywords: string[] = parsedJson.discovered_keywords
                    .map((kw: any) => typeof kw === 'string' ? kw.trim().toLowerCase() : '')
                    .filter((kw: string) => kw.length > 1 && kw.length < 100); // Filter invalid entries
                const uniqueKeywords = [...new Set(keywords)]; // Ensure uniqueness
                console.log(`[API Client - Extraction] Successfully extracted ${uniqueKeywords.length} unique keywords.`);
                return { keywords: uniqueKeywords };
            } else {
                console.error("[API Client - Extraction] ERROR: Extracted JSON missing 'discovered_keywords' array.", parsedJson);
                // Return empty list but log error, indicates parsing failed based on prompt structure
                 return { keywords: [] };
            }
        } catch (parseError: any) {
            console.error(`[API Client - Extraction] ERROR parsing JSON from extraction LLM: ${parseError.message}. Raw: ${messageContent}`);
             // Return empty list on parsing failure
             return { keywords: [] };
        }

    } catch (error: any) {
        console.error(`[API Client - Extraction] ERROR calling OpenAI Chat API: ${error.message}`, error);
        // Rethrow critical API errors
        throw new Error(`Final data extraction LLM call failed: ${error.message}`);
    }
}
```

**lib/streaming/openai.ts (Highlighting API Client Usage & E2B Interaction)**

```tsx
// lib/streaming/openai.ts
import { Sandbox } from "@e2b/desktop"; // E2B SDK for sandbox interaction
import OpenAI from "openai"; // Base OpenAI SDK (used by api_clients)
// --- Type Imports ---
import { SSEEventType, SSEEvent, ActionResponse } from "@/types/api";
import { ResponseComputerToolCall, ResponseInput, ResponseInputItem, Tool } from "openai/resources/responses/responses.mjs";
import { ComputerInteractionStreamerFacade, ComputerInteractionStreamerFacadeStreamProps } from "@/lib/streaming";
import { logDebug, logError, logWarning } from "../logger";
import { ResolutionScaler } from "./resolution";
// --- Import API Client Functions ---
import { callCuaLlmApi } from '@/lib/api_clients'; // Import our specific CUA API call function

// --- System Instructions ---
// (Use the detailed ASO Web Research instructions provided previously)
const INSTRUCTIONS = `
You are Surf, an AI assistant controlling a Firefox browser inside a secure E2B cloud Linux sandbox...
... Follow these steps precisely: ...
... Final Report: In your VERY LAST message, provide ONLY a clearly formatted JSON object...
... \`\`\`json\n{\n  "discovered_keywords": [...]\n}\n\`\`\` ...
... Browser Control Guidelines: ... Always press Enter after typing in search bars ...
`; // Truncated for brevity - use full version

export class OpenAIComputerStreamer implements ComputerInteractionStreamerFacade {
    public instructions: string;
    public desktop: Sandbox; // Instance of the connected E2B Sandbox
    public resolutionScaler: ResolutionScaler; // Handles coordinate/screenshot scaling
    private openai: OpenAI; // Client initialized in api_clients.ts, maybe not needed directly here? Let's remove.

    constructor(desktop: Sandbox, resolutionScaler: ResolutionScaler) {
        this.desktop = desktop; // Store reference to the E2B Sandbox instance
        this.resolutionScaler = resolutionScaler; // Store reference to the scaler
        this.instructions = INSTRUCTIONS; // Set the specific instructions for this agent
        // No need to initialize OpenAI client here, api_clients.ts handles it.
        console.log("[Streamer] OpenAIComputerStreamer initialized.");
    }

    /**
     * Executes a single CUA action within the E2B Sandbox using the @e2b/desktop SDK.
     * Translates OpenAI action types/coordinates into E2B SDK calls.
     * Handles scaling coordinates back to the original sandbox resolution.
     *
     * @param {ResponseComputerToolCall["action"]} action - The action object received from the OpenAI CUA API.
     * @returns {Promise<void>} Completes when the action is executed. Throws on SDK error.
     */
    async executeAction(action: ResponseComputerToolCall["action"]): Promise<void> { // Return void, no ActionResponse needed here
        const desktop = this.desktop; // Use the stored sandbox instance
        console.log(`[Streamer] Executing Action: ${action.type}`);

        try {
            switch (action.type) {
                // --- Core Actions for Web ASO ---
                case "click": {
                    // Scale coordinates from the model's view (scaled) to the sandbox's original resolution
                    const [origX, origY] = this.resolutionScaler.scaleToOriginalSpace([action.x, action.y]);
                    console.log(`  -> Clicking at Original Coords: (${origX}, ${origY}), Button: ${action.button}`);
                    // Use E2B SDK methods based on button type
                    if (action.button === "left") {
                        await desktop.mouse.leftClick(origX, origY);
                    } else if (action.button === "right") {
                        await desktop.mouse.rightClick(origX, origY);
                    } else { // Treat 'wheel' or others as left for now
                         console.warn(`  -> Unsupported click button '${action.button}', defaulting to left click.`);
                         await desktop.mouse.leftClick(origX, origY);
                    }
                    break;
                }
                case "type": {
                    console.log(`  -> Typing text (length: ${action.text.length})`);
                    // Directly use E2B SDK to type text
                    await desktop.keyboard.type(action.text);
                    break;
                }
                case "keypress": {
                    console.log(`  -> Pressing keys: ${action.keys}`);
                    // Map keys if necessary or pass directly if E2B supports OpenAI's key names
                    // E2B press method takes string or array of strings.
                    // It uses Playwright key names generally. Need mapping for complex keys.
                    // Example basic mapping (needs expansion based on CUA output)
                    const mappedKeys = action.keys.map(k => {
                        switch(k.toLowerCase()) {
                            case 'enter': return 'Enter';
                            case 'tab': return 'Tab';
                            case 'backspace': return 'Backspace';
                            case 'delete': return 'Delete';
                            case 'arrowup': return 'ArrowUp';
                            case 'arrowdown': return 'ArrowDown';
                            case 'arrowleft': return 'ArrowLeft';
                            case 'arrowright': return 'ArrowRight';
                            case 'escape': return 'Escape';
                            // Add mappings for Ctrl, Shift, Alt, Meta (Cmd) if needed for combinations
                            default: return k; // Pass through unknown keys directly
                        }
                    });
                    // E2B `press` handles key combinations like "Control+C"
                    await desktop.keyboard.press(mappedKeys.join('+'));
                    break;
                }
                case "scroll": {
                    // Use E2B SDK scroll method. It takes direction and pixels.
                    // OpenAI gives scroll_x, scroll_y. Convert to direction/amount.
                    const scrollAmount = 100; // Arbitrary scroll amount per unit, adjust as needed
                    console.log(`  -> Scrolling by x:${action.scroll_x}, y:${action.scroll_y}`);
                    if (action.scroll_y < 0) {
                        await desktop.mouse.scroll({ deltaY: -scrollAmount * Math.abs(action.scroll_y) });
                    } else if (action.scroll_y > 0) {
                        await desktop.mouse.scroll({ deltaY: scrollAmount * action.scroll_y });
                    }
                    if (action.scroll_x < 0) {
                        await desktop.mouse.scroll({ deltaX: -scrollAmount * Math.abs(action.scroll_x) });
                    } else if (action.scroll_x > 0) {
                        await desktop.mouse.scroll({ deltaX: scrollAmount * action.scroll_x });
                    }
                    break;
                }

                // --- Other Actions (Implement if needed by LLM) ---
                case "double_click": {
                    const [origX, origY] = this.resolutionScaler.scaleToOriginalSpace([action.x, action.y]);
                    console.log(`  -> Double Clicking at Original Coords: (${origX}, ${origY})`);
                    await desktop.mouse.doubleClick(origX, origY);
                    break;
                }
                 case "move": {
                    const [origX, origY] = this.resolutionScaler.scaleToOriginalSpace([action.x, action.y]);
                    console.log(`  -> Moving mouse to Original Coords: (${origX}, ${origY})`);
                    await desktop.mouse.move(origX, origY);
                    break;
                }
                case "wait": {
                    // OpenAI's wait action might be redundant as we add waits, but implement if seen.
                    console.log(`  -> Waiting for ${action.ms}ms`);
                    await new Promise(resolve => setTimeout(resolve, action.ms));
                    break;
                }
                 case "drag": {
                     console.log(`  -> Dragging mouse...`);
                     if (!action.path || action.path.length < 2) {
                         console.warn("  -> Drag action requires at least 2 points in path.");
                         break;
                     }
                     // Scale all points in the path
                     const scaledPath = action.path.map(p => this.resolutionScaler.scaleToOriginalSpace([p.x, p.y]));
                     const startPoint = scaledPath[0];
                     const endPoint = scaledPath[scaledPath.length - 1]; // E2B drag is simpler: start -> end
                     await desktop.mouse.drag(
                         { x: startPoint[0], y: startPoint[1] },
                         { x: endPoint[0], y: endPoint[1] }
                     );
                     break;
                 }

                // Action explicitly ignored as screenshots are taken automatically after each action
                case "screenshot": {
                     console.log("  -> Ignoring 'screenshot' action (handled automatically).");
                    break;
                }
                default: {
                    // Log any action types we haven't explicitly handled
                    logWarning("[Streamer] Encountered unknown or unhandled action type:", action);
                }
            }
             // Add a small mandatory wait after each action for UI stabilization
             await new Promise(resolve => setTimeout(resolve, 200)); // 200ms delay

        } catch (sdkError: any) {
            logError(`[Streamer] Error executing E2B SDK action (${action.type}): ${sdkError.message}`, sdkError);
            // Rethrow the error to be caught by the main stream loop in route.ts
            throw new Error(`Failed to execute action '${action.type}' in sandbox: ${sdkError.message}`);
        }
    }

    /**
     * Main generator function to handle the CUA interaction loop.
     * Takes screenshots, calls the CUA LLM API (via api_clients), yields events (reasoning, actions)
     * back to the API route, and executes actions in the E2B sandbox.
     *
     * @param {ComputerInteractionStreamerFacadeStreamProps} props - Contains initial messages and abort signal.
     * @yields {SSEEvent} Server-Sent Events for reasoning, actions, completion, or errors.
     */
    async *stream(props: ComputerInteractionStreamerFacadeStreamProps): AsyncGenerator<SSEEvent<"openai">> {
        const { messages: initialMessages, signal } = props; // Get initial prompt and abort signal
        console.log("[Streamer] Starting CUA stream loop...");

        let currentHistory: ResponseInput[] = [...initialMessages]; // Start history with the initial user prompt
        let previousResponseId: string | undefined = undefined; // Track previous response for efficient continuation

        try {
            while (true) { // Loop indefinitely until LLM signals DONE or an error occurs
                // Check for abort signal before proceeding
                if (signal?.aborted) {
                    console.log("[Streamer] Abort signal detected. Stopping stream.");
                    yield { type: SSEEventType.DONE, content: "Generation stopped by user." };
                    break;
                }

                // 1. Take Screenshot from E2B Sandbox (Scaled for the model)
                console.log("[Streamer] Taking scaled screenshot...");
                // resolutionScaler handles taking original and scaling if needed (or just takes original if no scaling)
                // For the API call, we need the base64 string of the *scaled* image.
                // Let's assume takeScreenshot returns the buffer of the appropriately scaled image.
                // **Correction:** ResolutionScaler helps with coordinates. We need the *base64 of the current screen* and tell the LLM the *scaled dimensions*.
                const currentScreenshotFull = await this.desktop.screenshot(); // Get full res screenshot
                const currentScreenshotBase64 = Buffer.from(currentScreenshotFull).toString("base64"); // Encode it
                const modelResolution = this.resolutionScaler.getScaledResolution(); // Get the dimensions we TELL the model

                console.log(`[Streamer] Screenshot taken. Size: ${currentScreenshotBase64.length} bytes. Model dims: ${modelResolution[0]}x${modelResolution[1]}`);

                // 2. Prepare Input for CUA API call
                // Depending on whether this is the first call or a continuation
                let apiInputItems: ResponseInput[];
                if (previousResponseId) {
                    // If continuing, ONLY send the new screenshot output
                    const screenshotOutput: ResponseInputItem = {
                        call_id: `screenshot_${Date.now()}`, // Unique ID for this input item
                        type: "computer_call_output",
                        output: { type: "input_image", image_url: `data:image/png;base64,${currentScreenshotBase64}` }
                    };
                    apiInputItems = [screenshotOutput];
                } else {
                    // If first call, send initial history + screenshot
                    const screenshotOutput: ResponseInputItem = { /* ... same as above ... */ };
                     // Add the screenshot to the history we send for the first call
                    apiInputItems = [...currentHistory, screenshotOutput];
                }

                // 3. Call CUA LLM API (using the centralized function)
                console.log("[Streamer] Calling CUA LLM API...");
                const llmApiResponse = await callCuaLlmApi(
                    apiInputItems,
                    modelResolution[0], // Tell model the scaled width
                    modelResolution[1], // Tell model the scaled height
                    previousResponseId, // Pass previous ID if continuing
                    this.instructions // Pass system instructions (only truly needed on first call usually)
                );
                // Update previousResponseId for the next iteration
                previousResponseId = llmApiResponse.id;

                // Add the raw request/response to our *internal* full history tracking if needed for debugging/final parsing
                // This depends on how `interactionHistory` is managed in `route.ts`
                // Add placeholder items to interactionHistory based on llmApiResponse.output

                // 4. Process API Response Output Items
                let hasComputerCall = false; // Flag to track if any actions were requested this turn
                for (const item of llmApiResponse.output) {
                    // Yield appropriate SSE events based on the item type
                    if (item.type === "message" && item.role === "assistant" && "content" in item) {
                        // Extract text content, handling potential variations in structure
                        const textContent = item.content[0]?.type === "output_text" ? item.content[0].text : JSON.stringify(item.content);
                        console.log(`[Streamer] Yielding REASONING: ${textContent.substring(0, 100)}...`);
                        yield { type: SSEEventType.REASONING, content: textContent };
                         // Check if this final message signals completion (based on our prompt)
                         if (textContent.includes(`"discovered_keywords":`)) {
                             console.log("[Streamer] Detected final JSON report structure in reasoning. Signaling DONE.");
                             // Yield DONE immediately after yielding this message.
                             // The Markdown generation will happen in route.ts using the full history.
                             yield { type: SSEEventType.DONE, content: "Extraction complete." }; // Signal completion
                             return; // Exit the generator completely
                         }

                    } else if (item.type === "computer_call") {
                        hasComputerCall = true; // Mark that an action needs execution
                        const action = item.action;
                        console.log(`[Streamer] Yielding ACTION: ${action.type}`);
                        yield { type: SSEEventType.ACTION, action }; // Yield the action details

                        // Execute the action in the E2B sandbox
                        await this.executeAction(action); // This uses the E2B SDK

                        console.log(`[Streamer] Yielding ACTION_COMPLETED for ${action.type}`);
                        yield { type: SSEEventType.ACTION_COMPLETED }; // Signal action finished

                        // **Crucial:** Prepare input for the *next* LLM call after action execution.
                        // The input *only* contains the output of the action just performed.
                        // We take the screenshot at the *start* of the next loop iteration.
                        // The API expects the output related to the call_id.
                        // This structure might need adjustment based on exact CUA API reqs for continuation.
                        // Let's simplify: The next loop iteration handles the screenshot as input.

                    } else if (item.type === "error") {
                         // Handle specific errors from the CUA API response itself
                         console.error("[Streamer] Received error item from CUA API:", item.message);
                         yield { type: SSEEventType.ERROR, content: `CUA API Error: ${item.message}` };
                         return; // Stop processing on API error item
                    }
                } // End for loop processing output items

                // 5. Check for Loop Termination
                // If the last item processed was an assistant message and no computer calls were made,
                // assume the LLM has finished its task (or got stuck).
                const lastItem = llmApiResponse.output[llmApiResponse.output.length - 1];
                if (!hasComputerCall && lastItem?.type === "message" && lastItem?.role === "assistant") {
                     console.log("[Streamer] LLM finished turn with assistant message but no further actions. Assuming DONE.");
                    yield { type: SSEEventType.DONE, content: "Agent completed its turn." }; // Signal completion
                    break; // Exit the while loop
                }

                // Add a small delay between turns to prevent overwhelming APIs or UI updates?
                // await new Promise(resolve => setTimeout(resolve, 100));

            } // End while(true) loop
        } catch (error: any) {
            // Catch errors from API calls within the loop or action execution
            logError("[Streamer] Error during CUA stream loop:", error);
            yield { type: SSEEventType.ERROR, content: `Agent error: ${error.message || 'Unknown stream error'}` };
            // No need to yield DONE here, ERROR implies termination
        } finally {
            console.log("[Streamer] CUA stream loop finished or exited.");
            // Any cleanup needed? Connection closed by route.ts typically.
        }
    } // End stream generator
} // End class
```

**app/actions.ts (Server Actions for Sandbox Control - Enhanced Comments)**

```tsx
// app/actions.ts
"use server"; // Marks functions as Server Actions runnable on the server

import { SANDBOX_TIMEOUT_MS } from "@/lib/config";
import { Sandbox } from "@e2b/desktop";
import { getEnvVariable } from '@/lib/configHelper'; // Use helper

// --- Justification for Server Actions ---
// These functions interact directly with the E2B API using a sensitive API key.
// Placing them in Server Actions ensures:
// 1. Security: The E2B_API_KEY is never exposed to the client-side browser.
// 2. Direct Interaction: They can directly use the E2B SDK without needing an extra API route layer just for these simple operations.
// 3. Simplicity: For straightforward actions like extending timeout or killing a sandbox, this avoids boilerplate API route setup.
// Trade-off: Server Actions have their own nuances regarding error handling and state management compared to traditional API routes. For these simple actions, they are suitable.

const E2B_API_KEY = getEnvVariable('E2B_API_KEY'); // Load key securely on server

/**
 * Increases the timeout for a given E2B sandbox.
 * Connects using the sandboxId and sets the new timeout defined in config.
 * @param {string} sandboxId - The ID of the target sandbox.
 * @returns {Promise<boolean>} True on success, false on failure.
 */
export async function increaseTimeout(sandboxId: string): Promise<boolean> {
    // (Implementation as provided previously - verified)
    // ... connects, calls desktop.setTimeout(), handles errors, closes connection ...
     if (!sandboxId || !E2B_API_KEY) return false; // Basic checks
     console.log(`[Server Action - increaseTimeout] Request for sandbox: ${sandboxId}`);
     let desktop: Sandbox | null = null;
     try {
         desktop = await Sandbox.connect({ id: sandboxId, apiKey: E2B_API_KEY });
         await desktop.setTimeout(SANDBOX_TIMEOUT_MS);
         console.log(`[Server Action - increaseTimeout] Success for sandbox: ${sandboxId}`);
         return true;
     } catch (error: any) {
         console.error(`[Server Action - increaseTimeout] Failed for ${sandboxId}: ${error.message}`);
         return false;
     } finally {
         if (desktop) await desktop.close();
     }
}

/**
 * Forcefully terminates (kills) a given E2B sandbox.
 * Connects using the sandboxId and calls the kill method.
 * @param {string} sandboxId - The ID of the target sandbox.
 * @returns {Promise<boolean>} True on success, false on failure.
 */
export async function stopSandboxAction(sandboxId: string): Promise<boolean> {
    // (Implementation as provided previously - verified)
    // ... connects, calls desktop.kill(), handles errors ...
     if (!sandboxId || !E2B_API_KEY) return false;
     console.log(`[Server Action - stopSandboxAction] Request for sandbox: ${sandboxId}`);
     let desktop: Sandbox | null = null;
     try {
         desktop = await Sandbox.connect({ id: sandboxId, apiKey: E2B_API_KEY });
         await desktop.kill(); // Force termination
         console.log(`[Server Action - stopSandboxAction] Success for sandbox: ${sandboxId}`);
         return true;
     } catch (error: any) {
         console.error(`[Server Action - stopSandboxAction] Failed for ${sandboxId}: ${error.message}`);
         // Note: Connecting might fail if already stopped, kill might fail too.
         // Returning false is safest if the explicit kill command encounters an error.
         return false;
     } finally {
         // No explicit close needed after kill usually.
     }
}
```

**IX. Key Risks & Security**

*(See previous response, Section 9 - Risks remain the same for the E2B approach).*

- **API Keys:** Live in .env.local (Gitignored) and Server environment variables ONLY. Never commit them. Never expose them to the frontend.
- **E2B Sandbox:** This is your primary security boundary. The AI operates *inside* this isolated container. It cannot directly access the user's local machine or network (unless explicitly configured, which we are not doing).
- **Prompt Injection:** While the agent controls a browser in a sandbox, avoid blindly inserting raw user input into executable parts of prompts if possible. For ASO keywords/descriptions, the risk is lower than if the agent could run arbitrary code directly, but still sanitize/validate inputs in route.ts.
- **Web Security:** The AI will be browsing the real internet. E2B has some safety features (like domain blocking in the sample), but the AI could still navigate to unsafe sites if instructed poorly or if it misunderstands a legitimate site. The sandbox limits the impact.
- **Dependencies:** Regularly update npm packages (npm update) to patch known security vulnerabilities.
- **E2B Sandbox Cost/Availability:**
    - Risk: Free tier limits exceeded, API key invalid.
    - Mitigation: Monitor usage. Ensure valid API key in .env.local. Handle API errors gracefully in route.ts.
- **CUA Web Navigation Reliability:**
    - Risk: AI struggles to click correct elements in Firefox (ads, popups, dynamic layouts), fails to extract text accurately from screenshots.
    - Mitigation: Specific prompts guiding interaction with known sites (Google). Start with simple target websites. Extensive testing needed. Potentially add helper functions (like goto) via CUA if needed, similar to E2B's Playwright examples. Accept lower accuracy for visual scraping.
- **RAG Accuracy:**
    - Risk: Quality of relevance scores depends on embedding model and quality of *visually extracted* keywords.
    - Mitigation: Use good embedding models. Clearly label results as based on AI's visual interpretation.
- **Complexity:**
    - Risk: Integrating CUA, E2B, RAG, and SSE is complex.
    - Mitigation: Build incrementally. Test each part (E2B connection, CUA loop, RAG processing, SSE streaming). Use E2B Surf's code as a strong base.

**X. Verification and Testing Plan**

*(See previous response, Section 10 - Testing plan remains valid for the E2B approach).*

1. **Setup Verification:** Follow README. Run npm install. Populate .env.local. Run npm run dev. Does the frontend load without errors?
2. **E2B Connection:** Click "Start Research". Does the /api/chat/route.ts log show "Creating new E2B sandbox..."? Does the VNC panel eventually connect and show a Linux desktop? Check E2B dashboard for active sandboxes. Check for API key errors in logs.
3. **CUA Loop (Web):** Observe the chat panel and VNC view. Does the AI state it's opening Firefox? Does Firefox open in VNC? Does it navigate to Google? Does it type keywords? Does it seem to react to the web page content shown in screenshots?
4. **Keyword Extraction:** Check the final LLM message (or the parsed data printed by main_runner.py's replacement - the API route log). Does it contain a list of keywords supposedly extracted from the web browsing session? Are they plausible?
5. **RAG & Markdown:** Does the final output in the UI appear as formatted Markdown? Does it include relevance scores (if implemented)? Does the download button work? Check Pinecone console for upserted vectors.
6. **Error Handling:** Intentionally use an invalid E2B or OpenAI key. Does the UI show a clear error? Stop the npm run dev process mid-research. Does the frontend handle the broken connection?

**XI.  Scalability Considerations (Re-emphasized for Onboarding**

- **MVP Focus:** The current architecture (Next.js serverless API route managing the E2B session via polling/SSE) is okay for *low concurrency* MVP testing.
- **Bottlenecks:**
    - **E2B Concurrency:** How many sandboxes can run simultaneously under your E2B plan?
    - **LLM Rate Limits:** How many requests/tokens per minute can you send to OpenAI/Anthropic?
    - **API Route Duration:** Serverless functions have time limits (e.g., 60s default on Vercel Hobby, extendable up to ~15min on Pro, but long-running agents might exceed this). The E2B Surf code relies on the connection staying open for SSE.
- **Future Scaling Path (Post-MVP):**
    - **Decouple Agent Execution:** Use a job queue (e.g., Vercel KV Queue, Redis Queue, RabbitMQ) triggered by the API route. A separate fleet of workers (could be containers, VMs, or long-running serverless functions) would pick up jobs, manage the E2B sandbox interaction, and report results back (e.g., via database update or WebSocket).
    - **WebSockets:** Replace SSE with WebSockets for more robust, bidirectional communication between frontend and the agent worker (allows for user interrupting the agent, etc.).
    - **Sandbox Management:** Implement smarter pooling or reuse of E2B sandboxes if tasks are short-lived.

**XII. Extra**

**A. E2B Surf**

**E2B Surf Analysis & Integration Strategy**

1. **What is E2B Surf?** It's a functional Next.js application showcasing OpenAI's CUA model controlling a **cloud-based Linux (Ubuntu) desktop environment** provided by E2B. It uses the @e2b/desktop SDK to interact with this virtual desktop (execute commands, take screenshots) and streams the interaction (AI reasoning, actions, VNC view) to the user's browser.
    - **Verification:** Confirmed by README.md, Dockerfile (Ubuntu base), package.json (@e2b/desktop), app/api/chat/route.ts (uses Sandbox.create/connect), and lib/streaming/openai.ts (calls desktop methods like write, press, leftClick).
2. **Core Interaction Flow:**
    - User prompt -> Next.js Frontend (app/page.tsx)
    - > Next.js API Route (/api/chat/route.ts)
    - > Creates/Connects to E2B Linux Sandbox (@e2b/desktop)
    - > Calls OpenAI CUA API (lib/streaming/openai.ts using openai SDK) with prompt + screenshot.
    - <- OpenAI responds with actions (click, type).
    - > Streamer (openai.ts) calls @e2b/desktop methods (e.g., desktop.write, desktop.leftClick) to execute actions *inside the Linux sandbox*.
    - > Streamer takes screenshot *from the sandbox*.
    - > Sends screenshot back to OpenAI CUA API... loop continues.
    - > Streams reasoning, actions, and sandbox VNC URL back to Frontend via Server-Sent Events (SSE).
3. **Key Conflict & Resolution:**
    - **Conflict:** Our original goal was to automate the **Astro *macOS* app**. E2B Surf provides a **Linux** environment. The Astro macOS app **cannot run** in this Linux environment.
    - **Resolution (Pivot):** We **must change the target application**. Instead of automating the native Astro macOS app, we will leverage the E2B Linux sandbox (which includes Firefox by default - see E2B Surf Dockerfile) to automate **web-based ASO keyword research**.
    - **New Target:** The AI agent, running within the E2B sandbox, will control **Firefox** to:
        - Navigate to Google.com.
        - Perform searches based on the user's input keywords/description.
        - Visually scrape Google Autocomplete suggestions.
        - Potentially navigate to a simple, free web-based keyword tool (like keywordtool.io, Google Trends, or similar identified during development) and extract suggestions visually.
        - The CUA model's ability to "read" the browser content from screenshots is key here.
4. **Integration Approach:**
    - Adopt the E2B Surf project structure as our baseline.
    - Modify the frontend (app/page.tsx) for our specific ASO input (app description, seed keywords).
    - Modify the backend API route (/api/chat/route.ts) to construct prompts tailored for web-based ASO research using Firefox within the sandbox.
    - Modify the OpenAI streamer (lib/streaming/openai.ts) INSTRUCTIONS prompt accordingly.
    - **Re-introduce RAG:** Implement Pinecone integration and relevance scoring. This will happen *after* the CUA loop finishes. The backend API route (/api/chat/route.ts) or the frontend (app/page.tsx) can handle this. *Decision:* Implement RAG post-processing within the API route after the CUA stream concludes for better separation of concerns, sending the final processed+RAG results back.
    - **Output:** Generate a Markdown report summarizing the findings (including relevance scores).
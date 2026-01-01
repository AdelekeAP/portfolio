# EchoMind - Project Portfolio

## 1. Full Description

**EchoMind** is a full-stack voice-powered document Q&A system that enables users to interact with their documents using natural voice conversation. The application combines speech recognition, vector embeddings, and large language models (LLMs) to create an intelligent assistant that can understand, search, and answer questions about uploaded documents.

Built with a focus on healthcare professionals, EchoMind allows users to upload medical documents (PDFs, DOCX, PPTX), ask questions using their voice, and receive spoken responses with source citations. The system uses Retrieval-Augmented Generation (RAG) to provide accurate, context-aware answers by finding the most relevant document sections before generating responses.

The application features a beautiful, animated voice orb interface that provides visual feedback during voice interactions, making the experience intuitive and engaging. Users can manage multiple documents, track conversation history, and switch between different query modes including file-based search, medical records access, and external database queries.

---

## 2. Problem Solved

### The Challenge
Healthcare professionals and knowledge workers often need quick access to information buried within large documents. Traditional methods require:
- Manually searching through lengthy PDFs
- Remembering which document contains specific information
- Typing out queries while multitasking
- Reading through pages of text to find answers

### The Solution
EchoMind addresses these pain points by:

1. **Eliminating Manual Search**: Users simply ask questions in natural language, and the system finds relevant information automatically using semantic search

2. **Enabling Hands-Free Interaction**: Voice input and output allows users to query documents while their hands are occupied with other tasks

3. **Providing Contextual Answers**: Instead of returning raw document sections, the LLM synthesizes information into clear, conversational responses

4. **Maintaining Source Transparency**: Every answer includes citations showing exactly which documents and sections were used, ensuring trustworthiness

5. **Supporting Multiple Document Types**: Whether it's PDFs, Word documents, or PowerPoint presentations, the system handles them seamlessly

---

## 3. Features

### Core Features

- **Voice-First Interaction**
  - Record voice questions using browser microphone
  - Real-time transcription using OpenAI Whisper
  - Natural text-to-speech responses with selectable voices
  - Auto-silence detection (20 seconds) for hands-free operation

- **Intelligent Document Search (RAG)**
  - Semantic search using OpenAI embeddings (1536 dimensions)
  - ChromaDB vector database for fast similarity matching
  - Source attribution showing which documents were referenced
  - Smart text chunking with overlap for context preservation

- **Multi-Format File Support**
  - PDF document extraction
  - Microsoft Word (.docx) support
  - PowerPoint (.pptx) presentation support
  - Drag-and-drop upload interface
  - Files up to 50MB supported

- **Beautiful Voice Orb UI**
  - 5 animated states: idle, session, listening, speaking, processing
  - Ripple effects and pulsing animations
  - Visual feedback during voice interactions
  - Responsive design for all screen sizes

- **User Authentication**
  - Secure JWT-based authentication
  - Individual and Organization account types
  - Role-based access control (owner, admin, member)
  - Password strength validation

- **Chat Interface**
  - Persistent message history
  - Three query modes: File, Medical, Database
  - Real-time processing indicators
  - Source citations in responses

- **File Management**
  - Upload progress tracking
  - File list view with deletion
  - Per-user document isolation
  - Automatic text extraction and indexing

---

## 4. Technologies Used

### Backend Stack
| Technology | Purpose |
|------------|---------|
| **Python 3.11** | Primary backend language |
| **FastAPI** | REST API framework |
| **SQLAlchemy** | ORM for PostgreSQL |
| **PostgreSQL** | Primary database |
| **ChromaDB** | Vector database for embeddings |
| **OpenAI API** | Whisper (STT), TTS, Embeddings |
| **Together AI** | Llama 3.1 8B LLM |
| **PyPDF2** | PDF text extraction |
| **python-docx** | Word document processing |
| **python-pptx** | PowerPoint processing |
| **LangChain** | Text chunking and processing |
| **bcrypt** | Password hashing |
| **python-jose** | JWT authentication |
| **Fernet** | Encryption for secrets |

### Frontend Stack
| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **Vite** | Build tool and dev server |
| **Tailwind CSS** | Utility-first styling |
| **React Router** | Client-side routing |
| **Axios** | HTTP client |
| **Web Speech API** | Browser voice preview |
| **MediaRecorder API** | Audio recording |

### External Services
| Service | Usage |
|---------|-------|
| **OpenAI** | Embeddings, TTS, Whisper STT |
| **Together AI** | Llama 3.1 8B LLM inference |
| **Render** | Backend hosting |
| **Vercel** | Frontend hosting |
| **PostgreSQL** | Managed database (Render) |

---

## 5. What I Learned

### Technical Skills

1. **Retrieval-Augmented Generation (RAG)**
   - Implementing vector embeddings for semantic search
   - Chunking strategies with overlap for context preservation
   - Balancing retrieval precision with LLM context windows

2. **Voice Interface Development**
   - Integrating browser MediaRecorder API for audio capture
   - Working with OpenAI Whisper for accurate speech-to-text
   - Implementing text-to-speech with multiple voice options
   - Handling audio streaming and playback in the browser

3. **Full-Stack Architecture**
   - Designing REST APIs with FastAPI
   - Managing state between React frontend and Python backend
   - Implementing JWT authentication with refresh tokens
   - Handling file uploads and processing pipelines

4. **Database Design**
   - Working with both relational (PostgreSQL) and vector (ChromaDB) databases
   - Designing schemas for multi-tenant applications
   - Implementing role-based access control

5. **LLM Integration**
   - Prompt engineering for query refinement
   - Two-pass systems for error correction
   - Handling API rate limits and retries
   - Optimizing token usage and response quality

### Soft Skills

1. **Problem Decomposition**: Breaking down the complex voice-to-answer pipeline into manageable services

2. **User Experience Design**: Creating an intuitive voice interface with clear visual feedback

3. **Security Mindset**: Implementing proper authentication, encryption, and input validation

4. **Deployment & DevOps**: Configuring cloud deployment with Render and Vercel

---

## 6. Screenshots

*Add your screenshots below:*

### Login Page
<!-- Screenshot: Login page with email/password form -->
[Add screenshot here]

### Chat Interface
<!-- Screenshot: Main chat view with voice orb and message history -->
[Add screenshot here]

### Voice Orb - Listening State
<!-- Screenshot: Voice orb with ripple animation during recording -->
[Add screenshot here]

### Voice Orb - Speaking State
<!-- Screenshot: Voice orb pulsing while playing response -->
[Add screenshot here]

### File Upload
<!-- Screenshot: Drag-and-drop file upload interface -->
[Add screenshot here]

### File Manager
<!-- Screenshot: List of uploaded documents -->
[Add screenshot here]

### Chat with Sources
<!-- Screenshot: AI response showing source citations -->
[Add screenshot here]

### Mobile View
<!-- Screenshot: Responsive mobile interface -->
[Add screenshot here]

---

## Live Demo

- **Frontend**: https://echo-mind-p83r.vercel.app
- **Backend API**: https://echo-mind-backend-2gp5.onrender.com

---

## Repository

[Add your GitHub repository link here]

---

## Contact

[Add your contact information here]

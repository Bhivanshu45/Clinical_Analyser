# 🧪 Clinical Lab Results Analyzer

A full-stack GenAI application that analyzes laboratory test results, classifies severity, generates AI-powered educational explanations, and presents the results in a clean interface.

| Service | URL |
| --- | --- |
| Live frontend | [clinical-analyser-phi.vercel.app](https://clinical-analyser-phi.vercel.app/) |
| Live backend API | [clinical-analyser.onrender.com](https://clinical-analyser.onrender.com/) |

## 🚀 Features

- Manual laboratory result input and CSV upload
- Normal, warning, and critical classification
- Classify → Route → Explain agent workflow
- Severity-based result ordering
- AI-generated educational explanations using Groq
- Suggested next steps and educational disclaimer
- Color-coded severity badges
- MCP tools for laboratory data and reference lookups
- Error and loading state handling

## 🛠️ Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | React 19, Vite, JavaScript |
| Styling | Tailwind CSS |
| API client | Axios |
| Icons | Lucide React |
| Backend | Python, FastAPI |
| Validation | Pydantic |
| AI | Groq API |
| Agent flow | Custom Python agent |
| MCP | FastMCP |
| Data | Kaggle laboratory dataset |
| Deployment | Vercel (frontend) and Render (backend) |

## 🏗️ Architecture

```text
React Frontend
      ↓
FastAPI API
      ↓
Lab Agent
      ├── Classify
      ├── Route
      └── Explain → Groq LLM
      ↓
Structured JSON Response
      ↓
Results UI
```

## 🔄 Application Flow

1. Enter laboratory results manually or upload a CSV file.
2. React prepares the data and sends it to FastAPI.
3. The agent compares results with the provided reference ranges.
4. Results are classified and ordered by severity.
5. Groq generates an educational explanation for each processed result.
6. The backend returns results, recommendations, and a disclaimer.
7. React displays the analysis with color-coded badges.

### Severity order

```text
Critical → Warning → Normal
```

| Status | UI |
| --- | --- |
| 🚨 Critical | Red |
| ⚠️ Warning | Amber |
| ✓ Normal | Green |

## 🔌 API

**Base URL:** `https://clinical-analyser.onrender.com/`

### Analyze laboratory results

```http
POST /api/analysis/
Content-Type: application/json
```

Returns a summary, processed results, classifications, AI explanations, recommendations, and an educational disclaimer.

### Health check

```http
GET /health
```

Example response:

```json
{
  "status": "healthy"
}
```

## 🧠 Agent Flow

```text
Input Results
     ↓
Classify
Compare with reference range
     ↓
Route
Order by severity
     ↓
Explain
Generate explanation using Groq
     ↓
Structured Response
```

Classification uses deterministic reference-range logic, while the LLM generates concise, human-readable explanations.

## 🔗 MCP Tools

The FastMCP server includes:

- `search_lab_test(test_name)` — search the dataset for a laboratory test
- `get_abnormal_lab_results()` — retrieve warning and critical results
- `get_reference_range(test_name)` — look up reference information

These tools support laboratory data searches and reference lookups using the dataset.

## 📁 Project Structure

```text
Clinical_Lab_Analyser/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── agents/
│   │   ├── core/
│   │   ├── data/
│   │   ├── mcp/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── .env
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

### Key frontend components

| Component | Responsibility |
| --- | --- |
| `LabInput.jsx` | Manual input and CSV upload |
| `ResultsDisplay.jsx` | Analysis results and recommendations |
| `SeverityBadge.jsx` | Color-coded status badges |
| `labApi.js` | Backend API communication |
| `App.jsx` | State, loading, errors, and integration |

## 📊 CSV Upload

CSV files are selected in the frontend and converted into the JSON structure expected by the backend.

Required fields:

```text
test_name,result,unit,min_reference,max_reference
```

The application supports normal, warning, and critical scenarios.

## 🤖 AI Integration

Configure Groq with environment variables in `backend/.env`:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=your_selected_groq_model
```

For each processed result, the LLM receives the test name, value, unit, reference range, and classification. It generates a short educational explanation without making a diagnosis.

## 📦 Local Setup

### Backend

```powershell
cd backend
python -m venv myenv
myenv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API documentation: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## 🌐 Deployment

- Frontend: [clinical-analyser-phi.vercel.app](https://clinical-analyser-phi.vercel.app/)
- Backend: [clinical-analyser.onrender.com](https://clinical-analyser.onrender.com/)
- Health check: [clinical-analyser.onrender.com/health](https://clinical-analyser.onrender.com/health)

## ⚠️ Disclaimer

This project is for educational and demonstration purposes only. It does not provide medical diagnosis or replace professional medical advice. Laboratory results should be interpreted in the appropriate clinical context by a qualified healthcare professional.
# 🧩 Pipeline Builder

This project is a **visual pipeline builder** that allows users to create and connect workflows using a drag-and-drop interface. Nodes can be added from a toolbar, configured directly on the canvas, and linked together to define how data flows through the system.

The frontend is built with **React** and **React Flow**, with **Zustand** used to manage the pipeline state across the application. A lightweight **FastAPI** backend handles pipeline validation by counting nodes and edges and checking whether the pipeline forms a valid **Directed Acyclic Graph (DAG)**.

The focus of the project is on building a clean, interactive editor with clear data flow, reusable node components, and smooth frontend–backend integration.

---

## ✨ Features

- Drag and drop nodes from a toolbar
- Connect nodes visually using handles
- Dynamic input handles based on `{{variables}}`
- Backend validation for:
  - number of nodes
  - number of edges
  - DAG correctness
- Clean popup feedback instead of browser alerts

---

## 🧱 Architecture

This project follows a **client–server architecture**, where the frontend and backend have clearly separated roles.

### Frontend (Client)

- The frontend is built using **React** and **React Flow**
- It is responsible for everything the user sees and interacts with
- Users can drag nodes from the toolbar, drop them on the canvas, and connect them
- All pipeline data (nodes, edges, and updates) is managed using **Zustand**
- Zustand acts as a single place where the entire pipeline state is stored
- React Flow is used only for UI rendering and interactions, not for storing state
- When the user clicks the submit button, the frontend sends the current pipeline data to the backend

### Backend (Server)

- The backend is built using **FastAPI**
- It receives the pipeline data from the frontend
- It validates the pipeline by:
  - checking node and edge references
  - counting the total number of nodes and edges
  - verifying whether the pipeline forms a valid **Directed Acyclic Graph (DAG)**
- After validation, the backend sends the result back to the frontend

### Communication Between Frontend and Backend

- The frontend and backend communicate using simple **HTTP requests**
- The frontend sends data using a POST request
- The backend processes the data and responds with validation results
- These results are shown to the user using a custom popup in the UI

### Why This Architecture Was Used

- Keeps UI logic and validation logic separate
- Makes the code easier to understand and maintain

---

## 📦 Clone the Repository

```bash
git clone https://github.com/Sriram-Harshit/Pipeline-Builder.git
cd Pipeline-Builder
```

---

## 🚀 Project Run Commands

- Use two terminals one for backend and one for frontend

| Step                     | Backend                                                                                  | Frontend                |
| ------------------------ | ---------------------------------------------------------------------------------------- | ----------------------- |
| **Folder**               | `backend/`                                                                               | `frontend/`             |
| **Go to folder**         | `cd backend`                                                                             | `cd frontend`           |
| **Create environment**   | `python -m venv venv` _(one time)_                                                       | —                       |
| **Activate environment** | `source venv/Scripts/activate` _(Windows)_<br>`source venv/bin/activate` _(Linux/macOS)_ | —                       |
| **Install dependencies** | `pip install -r requirements.txt`                                                        | `npm install`           |
| **Start server**         | `uvicorn main:app --reload`                                                              | `npm start`             |
| **Runs on**              | `http://localhost:8000`                                                                  | `http://localhost:3000` |

---

## 🔁 API

**POST** `/pipelines/parse`

Request:

```json
{
  "nodes": [],
  "edges": []
}
```

Response:

```json
{
  "num_nodes": 0,
  "num_edges": 0,
  "is_dag": true,
  "message": "Pipeline parsed successfully"
}
```

---

## 🧠 Notes

- Empty pipelines are allowed
- Pipelines without edges show a warning
- Cycles are detected and can be rejected

---

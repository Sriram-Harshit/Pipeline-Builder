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

## 📦 Clone the Repository

```bash
git clone https://github.com/Sriram-Harshit/Pipeline-Builder.git
cd Pipeline-Builder
```

---

## 🚀 How to Run the Backend

### 1. Go to backend folder

```bash
cd backend
```

### 2. Create virtual environment (only once)

```bash
python -m venv venv
```

### 3. Activate virtual environment

**Windows (Git Bash):**

```bash
source venv/Scripts/activate
```

**Linux / macOS:**

```bash
source venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Start the backend server

```bash
uvicorn main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

---

## 🎨 How to Run the Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

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

# 🚀 VectorShift Pipeline Builder

A modern **node-based pipeline builder** built with **React (React Flow)** and **FastAPI**, enabling users to visually construct workflows and validate them as a **Directed Acyclic Graph (DAG)** in real time.

---

## ✨ Features

### 🧩 Node Abstraction

* Built a reusable **BaseNode component**
* Eliminates code duplication across nodes
* Easily extendable — added custom nodes:

  * Math Node
  * Filter Node
  * API Node
  * Logger Node
  * Delay Node

---

### 🎨 Modern UI

* Clean **dark theme UI**
* Rounded cards, shadows, smooth hover effects
* Structured and intuitive layout

---

### 🧠 Smart Text Node

* Auto-resizing input field
* Dynamic variable detection using `{{variable}}`
* Automatically creates input handles for detected variables

---

### 🔗 Interactive Pipeline Builder

* Drag-and-drop node creation
* Visual edge connections between nodes
* Real-time graph construction

---

### ⚡ Backend Integration

* Built with **FastAPI**
* Endpoint: `/pipelines/parse`
* Computes:

  * Number of nodes
  * Number of edges
  * Whether the graph is a **DAG**

---

### 🔍 DAG Validation

* Implemented using **DFS cycle detection**
* Detects cycles and validates pipeline correctness

---

## 🛠 Tech Stack

**Frontend:**

* React
* React Flow
* Zustand (state management)

**Backend:**

* Python
* FastAPI

---

## ▶️ How to Run

### 🔹 Frontend

```bash
cd frontend
npm install
npm start
```

### 🔹 Backend

```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

---

## 🧪 Usage

1. Add nodes from the toolbar
2. Connect nodes visually
3. Use the Text node with variables like:

   ```
   Hello {{name}} {{age}}
   ```
4. Click **Submit Pipeline**
5. View:

   * Node count
   * Edge count
   * DAG validation result

---

## 📸 Preview

*Add a screenshot here (optional but recommended)*

---

## 🧠 Key Highlights

* Designed a **scalable node abstraction system**
* Implemented **dynamic UI behavior** based on user input
* Integrated frontend with backend for **real-time validation**
* Built efficient **graph cycle detection logic**

---

## 📌 Notes

* `node_modules`, build files, and environment files are excluded from the repository
* Project runs locally as per assessment requirements

---

## 👤 Author

**Pavni Srivastava**
Data Science & Engineering Student
---

## 🚀 Future Improvements

* Deploy frontend and backend (Vercel + Railway)
* Add real-time pipeline execution
* Improve UX with animations and notifications

---

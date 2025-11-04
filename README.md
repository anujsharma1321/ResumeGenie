# 🧠 ResumeGenie — AI Resume Reviewer

**ResumeGenie** is an intelligent **AI-powered Resume Reviewer** that helps users **analyze, improve, and optimize their resumes** for professional impact.  
It uses **React + Tailwind CSS** on the frontend and **Node.js + Express + MongoDB** on the backend.

---

## 🚀 Features

- 🤖 **AI-powered resume review** (Gemini / OpenAI integration)
- 🧾 **Instant feedback** on grammar, structure, and professional tone
- 💡 **Suggestions for improvements** in skills, experience, and formatting
- 🎨 **Modern, responsive UI** with Tailwind CSS
- ⚡ **RESTful API** built with Express.js
- 🗄️ **MongoDB** for user and review data
- 🔐 **Environment variable-based configuration**
- 🌍 **Easily deployable** on Vercel, Render, or Railway

---

## 🧱 Tech Stack

### 🖥️ Frontend
- React  
- Tailwind CSS  
- Axios (for API requests)  
- React Router  

### ⚙️ Backend
- Node.js  
- Express.js  
- MongoDB (via Mongoose)  
- dotenv (for environment variables)  
- nodemon (for development)  
- CORS, JWT, bcrypt, body-parser  

---

## 📁 Folder Structure

```
ResumeGenie/
├── server/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── utils/
│   └── uploads/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── Authenticate/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.jsx
│   ├── public/
│   └── tailwind.config.js
│
├── screenshots/
│
├── .env.example
├── .gitignore
└── README.md
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/anujsharma1321/ResumeGenie.git
cd ResumeGenie
```

---

### 2️⃣ Backend Setup
```bash
cd server
npm install
```

Create a `.env` file inside `/server` (use `.env.example` as reference):

```bash
# === Server Configuration ===
PORT=5000
NODE_ENV=development
MONGO_URI=

# === Gmail Configuration ===
GMAIL_USER=
GMAIL_PASSWORD=

# === API Keys ===
GEMINI_API_KEY=
OPENAI_API_KEY=   # optional if using OpenAI

# === Frontend Environment Variables ===
REACT_APP_API_URL=http://localhost:5173/
```

Start the backend server:
```bash
nodemon server
```

🟢 **Backend will run at:** [http://localhost:5000]

---

### 3️⃣ Frontend Setup
```bash
cd ../client
npm install
npm run dev
```

🟢 **Frontend will run at:** [http://localhost:5173]

---

## 🧰 Scripts

### Backend
```bash
cd server
nodemon server      # Start backend in development
```

### Frontend
```bash
cd client
npm run dev        # Start React app
```

---

## 🔐 Environment Variables

All environment variables should be stored in a `.env` file.  
Use `.env.example` as a template.

Example:
```bash
PORT=5000
MONGO_URI=
GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key
REACT_APP_API_URL=http://localhost:5173/
```

---

## 🧠 How AI Resume Review Works

The **AI Resume Review System** analyzes uploaded resumes or text input and provides:
- **Feedback on clarity, grammar, and tone**
- **Scoring on readability and professionalism**
- **Suggestions for stronger phrasing or skill emphasis**
- **Keyword optimization tips** based on job descriptions  

Example prompt:
> No prompt required

The AI then returns detailed improvement suggestions and an overall quality score.



## 📸 Screenshots

Screenshots added in ResumeGenie/screenshots 

---


## 👨‍💻 Author

**Anuj Sharma**  
💼 [GitHub](https://github.com/anujsharma1321) • 🔗 [LinkedIn](https://www.linkedin.com/in/anuj-sharma-951439237/)

---

> 💡 **Tip:** Always keep your `.env` private and confirm `.gitignore` excludes `node_modules`, `.env`, and build artifacts before pushing to GitHub.

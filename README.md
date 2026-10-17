# AI Interview Prep Platform

A full-stack AI-powered interview preparation platform built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend), using **Google Gemini** for AI features.

---

## 🏗️ Project Structure

```
ai-interview-prep-platform/
├── Frontend/          # React + Vite SPA
└── Backend/           # Express REST API
```

---

## ⚙️ Environment Setup

### Backend (`Backend/.env`)

Copy `Backend/.env.example` → `Backend/.env` and fill in your values:

```env
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<db>
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_long_random_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Frontend (`Frontend/.env`)

Copy `Frontend/.env.example` → `Frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

---

## 🚀 Running Locally

### 1. Install dependencies

```bash
# Backend
cd Backend && npm install

# Frontend
cd ../Frontend && npm install
```

### 2. Start Backend (port 3000)

```bash
cd Backend
npm run dev
```

### 3. Start Frontend (port 5173)

```bash
cd Frontend
npm run dev
```

Open http://localhost:5173

---

## 🌐 Deploying to Vercel

Both Frontend and Backend are deployed as **separate Vercel projects**.

### Backend Deployment

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import `Backend/` folder
3. Set **Root Directory** to `Backend`
4. Set **Framework Preset** to `Other`
5. Add environment variables in Vercel Project Settings:
   - `MONGO_URI`
   - `GEMINI_API_KEY`
   - `JWT_SECRET`
   - `NODE_ENV` = `production`
   - `FRONTEND_URL` = your frontend Vercel URL (e.g. `https://your-app.vercel.app`)

The `Backend/vercel.json` handles routing automatically.

### Frontend Deployment

1. Go to [vercel.com](https://vercel.com) → **New Project** → Import `Frontend/` folder
2. Set **Root Directory** to `Frontend`
3. Set **Framework Preset** to `Vite`
4. Add environment variables in Vercel Project Settings:
   - `VITE_API_URL` = your backend Vercel URL (e.g. `https://your-backend.vercel.app`)

The `Frontend/vercel.json` handles SPA routing (prevents 404 on page refresh).

---

## 🔑 Required API Keys

| Key | Where to get it |
|-----|----------------|
| `MONGO_URI` | [MongoDB Atlas](https://cloud.mongodb.com) — free tier available |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com) — free tier available |
| `JWT_SECRET` | Generate locally (see above) |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, React Router v7, Axios, SCSS |
| Backend | Node.js, Express 5, Mongoose, JWT, bcryptjs |
| AI | Google Gemini 2.5 Flash via `@google/genai` |
| Database | MongoDB (Atlas) |
| PDF | Puppeteer Core + @sparticuz/chromium |
| Deployment | Vercel |

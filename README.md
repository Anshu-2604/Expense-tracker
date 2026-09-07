# MERN Auth & Expense Tracker

A full-stack web application built with the MERN stack, featuring secure user authentication and an expense-tracking dashboard.

## ✨ Features

- 🔐 **Authentication** — Signup/Login with JWT, bcrypt password hashing, and HTTP-only cookies
- 🛡️ **Protected Routes** — Middleware-based route protection on both frontend and backend
- 💰 **Expense Tracker** — Add, view, and clear expenses with a live dashboard and running total
- 🎨 **Custom UI** — white-black-blue themed design with a terminal-inspired aesthetic

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- React Router
- CSS (custom themed components)

**Backend**
- Node.js + Express
- MongoDB with Mongoose
- JWT for auth tokens
- bcrypt for password hashing

## 📁 Folder Structure

```
project-root/
├── client/          # React frontend (Vite)
│   ├── src/
│   └── package.json
├── server/          # Express backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── package.json
└── README.md
```

## ⚙️ Setup & Installation

### 1. Clone the repo
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 3. Environment Variables
Create a `.env` file inside `server/` with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
```

### 4. Run locally
```bash
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm run dev
```

Frontend runs on `http://localhost:5173` and backend on `http://localhost:5000` by default.

## 🚀 Deployment

- **Database:** MongoDB Atlas
- **Backend:** Render / Railway
- **Frontend:** Vercel

> Note: In production, cookies are set with `secure: true` and `sameSite: 'none'` since frontend and backend are hosted on different domains.

## 📌 Roadmap

- [ ] AI integration
- [ ] Custom domain setup

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

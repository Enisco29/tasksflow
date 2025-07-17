# TasksFlow

TasksFlow is a full-stack task management app with user authentication, task creation, editing, prioritization, and completion tracking. It features a modern React frontend and a secure Express/MongoDB backend.

## Features

- User registration and login
- Create, edit, delete, and complete tasks
- Set task priorities and due dates
- Dashboard with filtering and sorting
- Responsive, modern UI

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Axios, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

## Getting Started

### Backend

1. `cd backend`
2. `npm install`
3. Create a `.env` file with your MongoDB URI and JWT secret
4. `npm start`

### Frontend

1. `cd frontend`
2. `npm install`
3. Create a `.env` file with `VITE_BACKEND_URL=http://localhost:4000`
4. `npm run dev`

### Deployment

- **Vercel-live-URL** https://tasksflow-psi.vercel.app

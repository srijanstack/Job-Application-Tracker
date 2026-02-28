# Job Application Tracker – Backend

Backend API for a Job Application Tracker built with **Node.js, Express, TypeScript, Prisma, and PostgreSQL**.  
Provides authentication, job application management, and secure REST APIs, fully containerized with Docker.

---

## 🚀 Features

- User authentication (JWT + HTTP-only cookies)
- CRUD operations for job applications
- Secure REST API with middleware-based authorization
- Prisma ORM for database access
- TypeScript for type safety
- Dockerized for easy deployment
- Environment-based configuration

---

## 🛠 Tech Stack

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker
- JWT Authentication

---

## 📁 Project Structure
```
job-application-tracker-server/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── prisma/
│   └── server.ts
├── prisma/
│   └── schema.prisma
├── Dockerfile
├── tsconfig.json
├── package.json
└── .env
```
---

## ⚙️ Environment Variables



Create a .env file in the root directory:
```
PORT=5000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
JWT_SECRET=your_jwt_secret
```

---
## 📦 Installation (Local Development)

```

git clone https://github.com/your-username/job-application-tracker.git
cd job-application-tracker
cd server
npm install

npx prisma migrate dev

npm run dev

```

---
## 🐳 Docker Usage

```
docker build -t job-app-backend .
docker run -p 5000:5000 --env-file .env job-app-backend
```





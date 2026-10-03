# 🛒 E-Commerce API

![CI](https://github.com/Amratef0/ecommerce-api/actions/workflows/ci.yml/badge.svg)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/Docs-Swagger-85EA2D?logo=swagger&logoColor=black)
![License](https://img.shields.io/badge/License-ISC-blue)

A full-featured RESTful API for an e-commerce platform, built with **Express.js**, **MongoDB**, and **Mongoose**. It supports JWT authentication, product management with image uploads, order management, email notifications, request validation, and full Swagger documentation.

---

## 📌 Table of Contents

- [Tech Stack](#-tech-stack)
- [Core Features](#-core-features)
- [Quick Start (Docker)](#-quick-start-docker)
- [Environment Variables](#-environment-variables)
- [Running without Docker](#-running-without-docker)
- [API Documentation](#-api-documentation)
- [Authentication](#-authentication)
- [CI/CD](#-cicd)
- [Project Structure](#-project-structure)

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| [Express.js](https://expressjs.com/) v5 | Web framework |
| [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) | Database & ODM |
| [JWT](https://jwt.io/) | Authentication |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password hashing |
| [Multer](https://github.com/expressjs/multer) | File / image uploads |
| [Nodemailer](https://nodemailer.com/) | Email notifications |
| [express-validator](https://express-validator.github.io/) | Request validation |
| [Swagger](https://swagger.io/) (swagger-jsdoc + swagger-ui-express) | API documentation |
| [cors](https://github.com/expressjs/cors) | Cross-origin resource sharing |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variables |
| [nodemon](https://nodemon.io/) | Dev auto-reload |
| [Docker](https://www.docker.com/) + Compose | Containerization |
| [GitHub Actions](https://github.com/features/actions) | Continuous integration |

---

## 📦 Core Features

- **Auth** — register, login, JWT-protected routes, password hashing with bcryptjs
- **Products** — CRUD operations with image uploads via Multer
- **Orders** — create and manage customer orders
- **Users** — user profile management
- **Email** — order confirmations and notifications via Nodemailer
- **Validation** — request body validation with express-validator
- **Documentation** — interactive Swagger UI
- **CORS** — configured for cross-origin requests

---

## 🐳 Quick Start (Docker)

**Requirements:** [Docker](https://www.docker.com/) with Compose v2 — no Node.js or MongoDB needed.

```bash
# 1. Clone the repository
git clone https://github.com/Amratef0/ecommerce-api.git
cd ecommerce-api

# 2. Create your environment file (the defaults work for a quick try)
cp .env.example .env

# 3. Build and start the API + MongoDB
docker compose up --build
```

| Service | URL |
|---|---|
| API | http://localhost:3000 |
| Swagger docs | http://localhost:3000/api-docs |

**Useful commands**

```bash
docker compose up -d --build   # run in the background
docker compose logs -f api     # follow API logs
docker compose down            # stop containers (keeps the data)
docker compose down -v         # stop and delete the database and uploads volumes
```

**Notes**

- `MONGO_URI` is set automatically by `docker-compose.yml` to point at the `mongo` service, so you don't need it in `.env` when using Compose.
- MongoDB data lives in the `mongo_data` volume and uploaded files in the `uploads_data` volume, so both survive container restarts.
- Set a strong `JWT_SECRET` in `.env` before deploying anywhere public.

**Build and run the image on its own**

```bash
docker build -t ecommerce-api .
docker run -p 3000:3000 --env-file .env ecommerce-api
```

---

## 🔧 Environment Variables

Create a `.env` file in the project root (start from `.env.example`):

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/ecommerce_db

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

| Variable | Description |
|---|---|
| `PORT` | Port the API listens on (default `3000`) |
| `MONGO_URI` | MongoDB connection string (set automatically by Docker Compose) |
| `JWT_SECRET` | Secret used to sign tokens — use a long random value |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `7d`) |
| `EMAIL_HOST` / `EMAIL_PORT` | SMTP server used by Nodemailer |
| `EMAIL_USER` / `EMAIL_PASS` | SMTP credentials (for Gmail, use an App Password) |

> The `.env` file is never committed. Only `.env.example` lives in the repository.

---

## 💻 Running without Docker

**Prerequisites**

- **Node.js** >= 20 (22 recommended) and **npm** >= 8
- **MongoDB** running locally, or a MongoDB Atlas connection string

```bash
# 1. Clone and install
git clone https://github.com/Amratef0/ecommerce-api.git
cd ecommerce-api
npm install

# 2. Configure the environment
cp .env.example .env

# 3. Run
npm run dev    # development (hot reload)
npm start      # production
```

The server starts on `http://localhost:3000`.

---

## 📖 API Documentation

Interactive Swagger docs are available at:

```
http://localhost:3000/api-docs
```

---

## 🔐 Authentication

The API uses **JWT (JSON Web Tokens)**:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Log in and receive a JWT |

Protected routes require the header:

```
Authorization: Bearer <token>
```

---

## 🔄 CI/CD

Every push to `main` and every pull request runs the **GitHub Actions** workflow in `.github/workflows/ci.yml`:

1. **Install, check & test** — `npm ci`, a syntax check of `server.js`, and `npm run lint` / `npm test` when those scripts exist. It also validates `docker-compose.yml`.
2. **Build Docker image** — builds the image with Buildx (with layer caching). On pushes to `main`, the image is also published to GitHub Container Registry:

```bash
docker pull ghcr.io/amratef0/ecommerce-api:latest
```

---

## 📁 Project Structure

```
ecommerce-api/
├── src/
│   ├── models/          # Mongoose schemas (User, Product, Order, etc.)
│   ├── routes/          # Express route handlers
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth, validation, error handling
│   └── config/          # DB connection, env config
├── .github/
│   └── workflows/
│       └── ci.yml       # Install, check, test, build (and push) Docker image
├── server.js            # App entry point
├── Dockerfile           # Production image (multi-stage, Node 22 Alpine)
├── docker-compose.yml   # API + MongoDB
├── .dockerignore        # Files excluded from the Docker build context
├── .env.example         # Template for environment variables
└── package.json
```

---

## 📜 License

This project is licensed under the **ISC License**.

---

## 👤 Author

**Amr Atef** — [@Amratef0](https://github.com/Amratef0)

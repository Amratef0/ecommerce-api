# 🛒 E-Commerce API


A full-featured RESTful API for an e-commerce platform, built with **Express.js**, **MongoDB**, and **Mongoose**. Supports authentication, product management, file uploads, email notifications, and full Swagger documentation.

---

## 🚀 Tech Stack

| Technology                                                                | Purpose                       |
| ------------------------------------------------------------------------- | ----------------------------- |
| [Express.js](https://expressjs.com/) v5                                   | Web framework                 |
| [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) | Database & ODM                |
| [JWT](https://jwt.io/)                                                    | Authentication                |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js)                          | Password hashing              |
| [Multer](https://github.com/expressjs/multer)                             | File / image uploads          |
| [Nodemailer](https://nodemailer.com/)                                     | Email notifications           |
| [express-validator](https://express-validator.github.io/)                 | Request validation            |
| [Swagger](https://swagger.io/) (swagger-jsdoc + swagger-ui-express)       | API documentation             |
| [cors](https://github.com/expressjs/cors)                                 | Cross-origin resource sharing |
| [dotenv](https://github.com/motdotla/dotenv)                              | Environment variables         |
| [nodemon](https://nodemon.io/)                                            | Dev auto-reload               |
| [Docker](https://www.docker.com/) + Compose                               | Containerization              |
| [GitHub Actions](https://github.com/features/actions)                     | Continuous integration        |

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
├── .env                 # Environment variables (not committed)
└── package.json
```

---

## ⚙️ Prerequisites

- **Node.js** >= 20 (22 recommended) and **npm** >= 8 — for running without Docker
- **MongoDB** running locally or a MongoDB Atlas connection string — for running without Docker
- **Docker** with Compose v2 — for running with Docker

---

## 🐳 Run with Docker (recommended)

Starts the API and a MongoDB instance with a single command.

```bash
# Clone the repository
git clone https://github.com/Amratef0/ecommerce-api.git
cd ecommerce-api

# Create your environment file (defaults work for a quick try)
cp .env.example .env

# Build and start
docker compose up --build
```

The API is now available at `http://localhost:3000` and the Swagger docs at `http://localhost:3000/api-docs`.

Useful commands:

```bash
docker compose up -d --build   # run in the background
docker compose logs -f api     # follow API logs
docker compose down            # stop containers (keeps the data)
docker compose down -v         # stop and delete the database and uploads volumes
```

Notes:

- `MONGO_URI` is set automatically by `docker-compose.yml` to point at the `mongo` service, so you don't need it in `.env` when using Compose.
- MongoDB data is stored in the `mongo_data` volume and uploaded files in the `uploads_data` volume, so both survive container restarts.
- Set a strong `JWT_SECRET` in `.env` before deploying anywhere public.

Build and run the image on its own:

```bash
docker build -t ecommerce-api .
docker run -p 3000:3000 --env-file .env ecommerce-api
```

---

## 🛠️ Installation (without Docker)

```bash
# Clone the repository
git clone https://github.com/Amratef0/ecommerce-api.git
cd ecommerce-api

# Install dependencies
npm install
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory (you can start from `.env.example`):

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/ecommerce_db

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

---

## ▶️ Running the App

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

The server will start on `http://localhost:3000`

---

## 🔄 Continuous Integration

Every push to `main` and every pull request runs the workflow in `.github/workflows/ci.yml`:

1. **Install, check & test** — `npm ci`, a syntax check of `server.js`, and `npm run lint` / `npm test` if those scripts exist. It also validates `docker-compose.yml`.
2. **Build Docker image** — builds the image with Buildx (with layer caching). On pushes to `main` the image is also published to GitHub Container Registry:

```bash
docker pull ghcr.io/amratef0/ecommerce-api:latest
```

---

## 📖 API Documentation

Swagger docs are available at:

```
http://localhost:3000/api-docs
```

---

## 🔐 Authentication

The API uses **JWT (JSON Web Tokens)**:

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive a JWT token
- Protected routes require the header: `Authorization: Bearer <token>`

---

## 📦 Core Features

- **Auth** — Register, login, JWT-protected routes, password hashing with bcryptjs
- **Products** — CRUD operations with image uploads via Multer
- **Orders** — Create and manage customer orders
- **Users** — User profile management
- **Email** — Order confirmations and notifications via Nodemailer
- **Validation** — Request body validation with express-validator
- **CORS** — Configured for cross-origin requests

---

## 📜 License

This project is licensed under the **ISC License**.

---

## 👤 Author

**Amr Atef** — [@Amratef0](https://github.com/Amratef0)

# 🛒 E-Commerce API

A full-featured RESTful API for an e-commerce platform, built with **Express.js**, **MongoDB**, and **Mongoose**. Supports authentication, product management, file uploads, email notifications, and full Swagger documentation.

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

---

## 📁 Project Structure

```
ecommerce-api/
├── src/
│   ├── models/          # Mongoose schemas (User, Product, Order, etc.)
│   ├── routes/          # Express route handlers
│   ├── controllers/     # Business logic
│   ├── middleware/       # Auth, validation, error handling
│   └── config/          # DB connection, env config
├── server.js            # App entry point
├── .env                 # Environment variables (not committed)
└── package.json
```

---

## ⚙️ Prerequisites

- **Node.js** >= 16
- **npm** >= 8
- **MongoDB** running locally or a MongoDB Atlas connection string

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/Amratef0/ecommerce-api.git
cd ecommerce-api

# Install dependencies
npm install
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

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

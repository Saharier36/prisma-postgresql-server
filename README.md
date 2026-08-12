<div align="center">

# 🛒 Prisma & PostgreSQL Backend Server

### A production-ready, modular REST API built with Express.js, TypeScript, Prisma ORM & PostgreSQL


[![Live API](https://img.shields.io/badge/Live%20API-Online-brightgreen?style=for-the-badge&logo=render)](https://prisma-postgresql-server-b91l.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/Saharier36/prisma-postgresql-server)

</div>

---

## 🧰 Tech Stack

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-Password%20Hashing-blue?style=for-the-badge)
![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge&logo=render&logoColor=white)

</div>

---

## 📖 Overview

This backend powers a marketplace-style application with authentication, product catalog management, customer reviews, and order processing. It follows a clean, modular, layer-based architecture (`routes → controller → service → prisma`) so each domain is isolated, testable, and easy to extend.

**Highlights:**
- 🔐 JWT-based authentication with role-based access control (`ADMIN` / `USER`)
- 🔒 Passwords hashed with bcrypt — never stored in plain text
- 🗃️ Soft-delete pattern across all models (data is never hard-deleted)
- 🔗 Fully relational schema with proper foreign keys and indexes
- 💳 Transaction-safe order creation — stock and totals are calculated and updated atomically
- 📦 Consistent, predictable API response structure across every endpoint

---

## 🌐 Live Deployment

> ⚠️ **Note:** This API is hosted on Render's free tier. If the service has been inactive for a while, the **first request may take 30–50 seconds** to respond while the server wakes up. Subsequent requests will be fast. This is a Render platform limitation, not an application issue.

[![Open Live API](https://img.shields.io/badge/🔗%20Open%20Live%20API-Click%20Here-2ea44f?style=for-the-badge)](https://prisma-postgresql-server-b91l.onrender.com)

---

## 🏗️ Project Structure

```
prisma-postgresql-server/
│
├── prisma/
│   ├── schema.prisma        # Database models, enums & relations
│   └── migrations/          # Version-controlled migration history
│
├── src/
│   ├── app.ts                # Express app configuration
│   ├── server.ts             # Entry point
│   │
│   ├── generated/
│   │   └── prisma/           # Auto-generated Prisma Client
│   │
│   ├── routes/
│   │   └── index.ts          # Central route aggregator
│   │
│   ├── middlewares/
│   │   └── auth.ts           # JWT verification & role guard
│   │
│   ├── lib/
│   │   ├── prisma.ts         # Prisma Client + pg driver adapter
│   │   ├── jwt.ts            # Token generation & verification
│   │   └── sendResponse.ts   # Standardized API response helper
│   │
│   └── services/
│       ├── user/
│       │   ├── user.interface.ts
│       │   ├── user.service.ts
│       │   ├── user.controller.ts
│       │   └── user.routes.ts
│       │
│       ├── category/
│       │   ├── category.interface.ts
│       │   ├── category.service.ts
│       │   ├── category.controller.ts
│       │   └── category.routes.ts
│       │
│       ├── product/
│       │   ├── product.interface.ts
│       │   ├── product.service.ts
│       │   ├── product.controller.ts
│       │   └── product.routes.ts
│       │
│       ├── review/
│       │   ├── review.interface.ts
│       │   ├── review.service.ts
│       │   ├── review.controller.ts
│       │   └── review.routes.ts
│       │
│       └── order/
│           ├── order.interface.ts
│           ├── order.service.ts
│           ├── order.controller.ts
│           └── order.routes.ts
│
├── .env.example
├── prisma.config.ts
├── package.json
└── tsconfig.json
```

---

## ⚙️ Getting Started (Local Setup)

```bash
# 1. Clone the repository
git clone https://github.com/Saharier36/prisma-postgresql-server.git
cd prisma-postgresql-server

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# then fill in DATABASE_URL, JWT_SECRET, JWT_EXPIRES_IN

# 4. Run database migrations
npx prisma migrate dev

# 5. Start the development server
npm run dev
```

Server will be running at `http://localhost:5000`.

### Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port the server runs on (default `5000`) |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key used to sign JWT tokens |
| `JWT_EXPIRES_IN` | Token expiry duration (e.g. `7d`) |

---

## 📦 API Response Format

Every endpoint — success or failure — returns a consistent shape:

```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {}
}
```

---

## 📚 API Documentation

**Base URL (Local):** `http://localhost:5000/api`
**Base URL (Live):** `https://prisma-postgresql-server-b91l.onrender.com/api`

### 🔐 Auth
| Method | Endpoint | Description | Auth | Body |
|---|---|---|---|---|
| `POST` | `/auth/register` | Register a new user | Public | `{ name, email, password }` |
| `POST` | `/auth/login` | Login and receive JWT | Public | `{ email, password }` |
| `GET` | `/auth/profile` | Get logged-in user info | 🔒 Any role | — |

### 🗂️ Categories
| Method | Endpoint | Description | Auth | Body |
|---|---|---|---|---|
| `POST` | `/categories` | Create a category | 🔒 Admin | `{ name, description? }` |
| `GET` | `/categories` | List all categories | Public | — |
| `GET` | `/categories/:id` | Get a category by ID | Public | — |
| `PATCH` | `/categories/:id` | Update a category | 🔒 Admin | `{ name?, description? }` |
| `DELETE` | `/categories/:id` | Soft-delete a category | 🔒 Admin | — |

### 📦 Products
| Method | Endpoint | Description | Auth | Body |
|---|---|---|---|---|
| `POST` | `/products` | Create a product | 🔒 Admin | `{ name, price, categoryId, description?, stock? }` |
| `GET` | `/products` | List all products (with category) | Public | — |
| `GET` | `/products/:id` | Get a product by ID (with reviews) | Public | — |
| `PATCH` | `/products/:id` | Update a product | 🔒 Admin | `{ name?, price?, stock?, categoryId? }` |
| `DELETE` | `/products/:id` | Soft-delete a product | 🔒 Admin | — |

### ⭐ Reviews
| Method | Endpoint | Description | Auth | Body |
|---|---|---|---|---|
| `POST` | `/reviews` | Create a review for a product | 🔒 Any role | `{ rating, productId, comment? }` |
| `GET` | `/reviews` | List all reviews | Public | — |
| `GET` | `/reviews/:id` | Get a review by ID | Public | — |
| `PATCH` | `/reviews/:id` | Update your own review | 🔒 Owner | `{ rating?, comment? }` |
| `DELETE` | `/reviews/:id` | Delete a review | 🔒 Owner / Admin | — |

### 🧾 Orders
| Method | Endpoint | Description | Auth | Body |
|---|---|---|---|---|
| `POST` | `/orders` | Place an order (auto price + stock calc) | 🔒 Any role | `{ items: [{ productId, quantity }] }` |
| `GET` | `/orders` | List all orders | 🔒 Admin | — |
| `GET` | `/orders/:id` | Get an order by ID | 🔒 Any role | — |
| `PATCH` | `/orders/:id/status` | Update order status | 🔒 Admin | `{ status }` |
| `DELETE` | `/orders/:id` | Soft-delete an order | 🔒 Admin | — |

### 📟 Status Codes

| Code | Meaning |
|---|---|
| `200` | Success |
| `201` | Resource created |
| `400` | Bad request / validation error |
| `401` | Unauthorized — missing/invalid token |
| `403` | Forbidden — insufficient role |
| `404` | Resource not found |
| `500` | Internal server error |

---

## 🗄️ Database Schema

**5 Models:** `User` · `Category` · `Product` · `Review` · `Order` (+ `OrderItem` join table)
**2 Enums:** `Role` (`ADMIN`, `USER`) · `OrderStatus` (`PENDING`, `CONFIRMED`, `SHIPPED`, `DELIVERED`, `CANCELLED`)

Every model includes:
- ✅ Soft delete (`isDeleted`)
- ✅ `createdAt` / `updatedAt` timestamps
- ✅ Explicit table mapping via `@@map()`
- ✅ Indexed foreign keys for query performance

**Key relations:**
- `User` 1—N `Order`, `User` 1—N `Review`
- `Category` 1—N `Product`
- `Product` 1—N `Review`, `Product` 1—N `OrderItem`
- `Order` 1—N `OrderItem`

---

## 🔒 Authentication & Authorization

- Passwords are hashed with **bcrypt** (10 salt rounds) before being stored.
- On login/register, a **JWT** is issued containing `userId`, `email`, and `role`.
- Protected routes use an `auth()` middleware that verifies the token and optionally restricts access to specific roles, e.g. `auth("ADMIN")`.
- Ownership checks (e.g. a user can only edit their own review) are enforced at the service layer.

---

## 🧪 Testing

All endpoints were manually tested with **Postman**, covering:
- Successful and failed authentication flows
- Role-restricted access (401 / 403 responses)
- Full CRUD lifecycle per module, including soft-delete behavior
- Transaction integrity for order creation (stock decrement + price calculation)

---

## 🚀 Deployment

| Component | Provider |
|---|---|
| Backend hosting | [Render](https://render.com) (Free Tier) |
| Database | [Neon](https://neon.tech) (Serverless PostgreSQL) |
| Source control | GitHub |

**Build Command:** `npm install && npx prisma generate && npm run build`
**Start Command:** `npm start`

---

<div align="center">

**Built by [Golam Saharier Omi](https://github.com/Saharier36)**

[![GitHub](https://img.shields.io/badge/GitHub-Saharier36-181717?style=flat-square&logo=github)](https://github.com/Saharier36)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-saharier--omi-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/saharier-omi/)

</div>
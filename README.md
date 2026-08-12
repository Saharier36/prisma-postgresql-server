# Prisma & PostgreSQL Backend Server

A production-ready REST API built with Express.js, TypeScript, Prisma ORM, and PostgreSQL

## Tech Stack
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcrypt

## Getting Started

\`\`\`bash
npm install
npx prisma migrate dev
npm run dev
\`\`\`

Create a `.env` file based on `.env.example`.

## API Response Format

\`\`\`json
{
  "success": true,
  "message": "Description here",
  "data": {}
}
\`\`\`

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth Required | Body |
|--------|----------|--------------|----------------|------|
| POST | /api/auth/register | Register new user | No | `{ name, email, password }` |
| POST | /api/auth/login | Login user | No | `{ email, password }` |
| GET | /api/auth/profile | Get logged-in user info | Yes (any role) | - |

### Categories
| Method | Endpoint | Description | Auth Required | Body |
|--------|----------|--------------|----------------|------|
| POST | /api/categories | Create category | Yes (ADMIN) | `{ name, description? }` |
| GET | /api/categories | Get all categories | No | - |
| GET | /api/categories/:id | Get category by ID | No | - |
| PATCH | /api/categories/:id | Update category | Yes (ADMIN) | `{ name?, description? }` |
| DELETE | /api/categories/:id | Soft delete category | Yes (ADMIN) | - |

### Products
| Method | Endpoint | Description | Auth Required | Body |
|--------|----------|--------------|----------------|------|
| POST | /api/products | Create product | Yes (ADMIN) | `{ name, price, categoryId, description?, stock? }` |
| GET | /api/products | Get all products | No | - |
| GET | /api/products/:id | Get product by ID | No | - |
| PATCH | /api/products/:id | Update product | Yes (ADMIN) | `{ name?, price?, stock?, categoryId? }` |
| DELETE | /api/products/:id | Soft delete product | Yes (ADMIN) | - |

### Reviews
| Method | Endpoint | Description | Auth Required | Body |
|--------|----------|--------------|----------------|------|
| POST | /api/reviews | Create review | Yes (any role) | `{ rating, productId, comment? }` |
| GET | /api/reviews | Get all reviews | No | - |
| GET | /api/reviews/:id | Get review by ID | No | - |
| PATCH | /api/reviews/:id | Update own review | Yes (owner) | `{ rating?, comment? }` |
| DELETE | /api/reviews/:id | Delete review | Yes (owner/ADMIN) | - |

## Status Codes
- `200` – Success
- `201` – Created
- `400` – Bad Request / Validation Error
- `401` – Unauthorized (no/invalid token)
- `403` – Forbidden (wrong role)
- `404` – Not Found
- `500` – Server Error

## Database Schema

5 Models: User, Category, Product, Review, Order (+ OrderItem)
2 Enums: Role (ADMIN, USER), OrderStatus (PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED)

All models include: soft delete (`isDeleted`), timestamps (`createdAt`, `updatedAt`), table mapping (`@@map`)
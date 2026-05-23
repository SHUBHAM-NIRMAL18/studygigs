# StudyGig 🎓

A decoupled freelance task marketplace platform for students — built with **Next.js 15** (Frontend UI & API Gateway Proxy), **Express.js** (Backend API), **Prisma**, **MySQL**, and **NextAuth**.

Students can post tasks, bid on work, manage deliverables, resolve disputes, and track everything through a clean dashboard.

---

## 📁 Project Structure

```
studygig/
├── package.json      # Monorepo scripts (concurrent dev servers)
├── backend/          # Node.js / Express backend server
│   ├── prisma/       # Prisma schema & migrations (MySQL)
│   └── src/          # Express route handlers & middlewares
└── frontend/         # Next.js 15 App Router application
    ├── src/          # Pages, layouts, & gateway proxy middleware
    └── public/
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (18+)
- [MySQL Server](https://www.mysql.com/) (e.g., via XAMPP, Docker, or native installer)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/SHUBHAM-NIRMAL18/studygigs.git
cd studygigs
```

### 2. Configure Environment Variables

Create database named `studygig` in your MySQL database server (e.g., via phpMyAdmin).

Create a `.env` file inside `backend/`:

```env
DATABASE_URL="mysql://root:@localhost:3306/studygig"
PORT=5000
```
*(Adjust username and password in the connection string if your MySQL configuration differs).*

Create a `.env.local` file inside `frontend/`:

```env
NEXTAUTH_SECRET="your-development-secret-here"
NEXTAUTH_URL="http://localhost:3000"
BACKEND_URL="http://localhost:5000"
GATEWAY_SECRET="studygig-gateway-secret"
```

### 3. Install Dependencies

Install all project dependencies (root, backend, and frontend) in one command:

```bash
npm run install:all
```

### 4. Setup the Database

Apply the database migrations to your MySQL instance:

```bash
npm run db:migrate
```

### 5. Run the Development Server

Start both the frontend and the Express backend concurrently:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | Next.js 15 (App Router) |
| **Backend API** | Express.js (Node.js/TypeScript) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | shadcn/ui + Radix UI |
| **ORM** | Prisma |
| **Database** | MySQL (dev/prod) |
| **Auth** | NextAuth.js v4 |
| **State** | Zustand |
| **Forms** | React Hook Form + Zod |
| **Animations** | Framer Motion |

---

## 📡 API Routes (Proxied to Port 5000)

| Route | Methods | Description |
|---|---|---|
| `/api/auth/signup` | POST | Register a new user |
| `/api/auth/authorize` | POST | NextAuth credential verification |
| `/api/auth/forgot-password` | POST | Initiates password reset |
| `/api/auth/reset-password` | POST | Completes password reset |
| `/api/tasks` | GET, POST | List / create tasks |
| `/api/tasks/[id]` | GET, PATCH, DELETE | Task detail operations |
| `/api/bids` | GET, POST | List / create bids |
| `/api/bids/[id]` | GET, PATCH, DELETE | Bid operations |
| `/api/deliverables` | GET, POST | Deliverables |
| `/api/disputes` | GET, POST | Dispute management |
| `/api/messages` | GET, POST | Messaging |
| `/api/reviews` | GET, POST | Reviews |
| `/api/stats` | GET | Dashboard stats |
| `/api/users` | GET | User listing |

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

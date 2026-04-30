# StudyGig 🎓

A full-stack freelance task marketplace platform for students — built with **Next.js 15**, **Prisma**, **SQLite**, and **NextAuth**.

Students can post tasks, bid on work, manage deliverables, resolve disputes, and track everything through a clean dashboard.

---

## 📁 Project Structure

```
studygig/
├── backend/          # Prisma schema & database configuration
│   └── prisma/
│       └── schema.prisma
└── frontend/         # Next.js 15 App Router application
    ├── src/
    │   ├── app/      # Pages & API routes
    │   ├── components/
    │   ├── hooks/
    │   ├── lib/
    │   ├── store/
    │   └── types/
    └── public/
```

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Git

### 1. Clone the repository

```bash
git clone https://github.com/SHUBHAM-NIRMAL18/studygigs.git
cd studygigs
```

### 2. Setup the Frontend

```bash
cd frontend
bun install        # or: npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside `frontend/`:

```env
DATABASE_URL="file:../backend/prisma/db/custom.db"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Setup the Database

```bash
# From inside frontend/
bun run db:push       # Push schema to DB
bun run db:generate   # Generate Prisma client
```

### 5. Run the Development Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Radix UI |
| ORM | Prisma |
| Database | SQLite (dev) |
| Auth | NextAuth.js v4 |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Animations | Framer Motion |

---

## 📡 API Routes

| Route | Methods | Description |
|---|---|---|
| `/api/auth/signup` | POST | Register a new user |
| `/api/auth/[...nextauth]` | GET, POST | NextAuth handler |
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

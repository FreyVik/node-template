# AGENTS.md - Backend Development Guide

## Recent Updates

## 2026-04-11

### Added
- Production dependencies installed: `express`, `sqlite3`, `cors`, `dotenv`, `helmet` (API framework, SQLite integration, CORS support, environment variable loading, security headers).
- Development dependencies installed: `typescript`, `@types/node`, `@types/express`, `nodemon`, `ts-node` (TypeScript build/runtime support, Node and Express typing, auto-reload in development).
- Additional typing packages detected in project: `@types/cors`, `@types/sqlite3`.
- Backend entry file present: `src/index.ts`.

### Completed
- [x] Phase 1 / Step 1: Initial project setup.
- [x] `tsconfig.json` configured for Node.js + TypeScript output to `dist` from `src`.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** SQLite
- **Language:** TypeScript
- **Package Manager:** pnpm

---

## Initial Setup

### Production Dependencies
```bash
pnpm add express sqlite3 cors dotenv helmet
```

### Development Dependencies
```bash
pnpm add -D typescript @types/node @types/express nodemon ts-node
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "pnpm nodemon src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

---

## Project Structure

```
backend/
├── src/
│   ├── index.ts           (entry point)
│   ├── app.ts            (Express configuration)
│   ├── routes/           (API routes)
│   ├── controllers/      (business logic)
│   ├── models/           (SQLite data models)
│   └── middleware/       (middlewares)
├── data/                 (.sqlite file)
├── package.json
├── tsconfig.json
├── Dockerfile
└── .env.example
```

---

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## Middlewares

Middlewares are configured in `src/app.ts`:

```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

export default app;
```

---

## Database

SQLite database is initialized in `src/models/database.ts`. The tables created are:

- **cuentas**: id, nombre, tipo, saldo, moneda
- **transacciones**: id, tipo, cantidad, categoria, fecha, cuentaId, nota
- **categorias**: id, nombre, icono, color

---

## API Endpoints

### Cuentas
| Method | Route | Description |
|--------|------|-------------|
| GET | /api/cuentas | Get all accounts |
| GET | /api/cuentas/:id | Get account by ID |
| POST | /api/cuentas | Create account |
| PUT | /api/cuentas/:id | Update account |
| DELETE | /api/cuentas/:id | Delete account |

### Transacciones
| Method | Route | Description |
|--------|------|-------------|
| GET | /api/transacciones | Get all transactions |
| GET | /api/transacciones/:id | Get transaction by ID |
| POST | /api/transacciones | Create transaction |
| PUT | /api/transacciones/:id | Update transaction |
| DELETE | /api/transacciones/:id | Delete transaction |

### Categorías
| Method | Route | Description |
|--------|------|-------------|
| GET | /api/categorias | Get all categories |
| GET | /api/categorias/:id | Get category by ID |
| POST | /api/categorias | Create category |
| PUT | /api/categorias/:id | Update category |
| DELETE | /api/categorias/:id | Delete category |

---

## Execution

```bash
# Development (with hot reload)
pnpm dev

# Production
pnpm build
pnpm start
```

The server listens on the port defined in `process.env.PORT` (default 4000).

---

## Environment Variables

Create `.env` file:
```
PORT=4000
```

---

## Notes

- Database is automatically created in the `data/` folder
- No authentication - it's a local application
- Frontend connects to `http://localhost:4000/api`

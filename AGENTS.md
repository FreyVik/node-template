# AGENTS.md - Backend Development Guide

## Recent Updates

## 2026-04-12

### Added
- SQLite bootstrap hardening in `src/infrastructure/persistence/sqlite/database.ts` with async initialization, `PRAGMA foreign_keys = ON`, WAL mode, and busy timeout.
- Centralized environment config in `src/shared/config/env.ts`.
- SQLite schema in English with tables: `accounts`, `transactions`, `categories`.
- On-demand seed scripts added: `seed` and `seed:reset` using SQL query batches.
- pnpm native build allowlist configured: `pnpm.onlyBuiltDependencies = ["sqlite3"]`.
- Git ignore rules for SQLite generated files: `data/*.sqlite`, `data/*.sqlite-wal`, `data/*.sqlite-shm`.
- Global-layer architecture base aligned for hexagonal growth: `src/domain`, `src/application`, `src/interfaces`, `src/infrastructure`, `src/shared`.
- HTTP adapter moved to `src/interfaces/http/*` and SQLite adapter moved to `src/infrastructure/persistence/sqlite/*`.

### Completed
- [x] Phase 2 / Step 4: SQLite configuration and local database file creation verification.
- [x] Architecture refactor: removed legacy `src/models`/`src/routes` flow and standardized imports to global layers.

## 2026-04-11

### Added
- Project dependencies installed: `express`, `sqlite3`, `cors`, `dotenv`, `helmet`, `typescript`, `@types/node`, `@types/express`, `nodemon`, `ts-node`.
- Initial backend structure created: `data/`, `src/routes/`, `src/controllers/`, `src/models/`, `src/middleware/`.
- Environment template created: `.env.example` with `PORT=4000`.
- Code quality tooling added: `@biomejs/biome` with project config in `biome.json`.
- New scripts added for quality checks: `lint`, `lint:fix`, `format`.

### Completed
- [x] Phase 1 / Step 1: Initial project setup (`pnpm init`, dependencies, `tsconfig.json`).
- [x] Phase 1 / Step 2: Base project structure and environment example file.
- [x] Smoke test verified for `GET /api/health` and `GET /api/info/summary` using local `pnpm dev` execution.

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
pnpm add -D typescript @types/node @types/express nodemon ts-node @biomejs/biome
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "nodemon src/index.ts",
    "seed": "ts-node src/scripts/seed.ts",
    "seed:reset": "ts-node src/scripts/seed-reset.ts",
    "lint": "biome check .",
    "lint:fix": "biome check . --write",
    "format": "biome format . --write",
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
│   ├── index.ts                      (application bootstrap)
│   ├── domain/                       (domain entities and contracts)
│   ├── application/                  (use cases)
│   ├── interfaces/
│   │   └── http/                     (Express app and route adapters)
│   ├── infrastructure/
│   │   └── persistence/sqlite/       (SQLite adapter and schema)
│   ├── shared/
│   │   └── config/                   (environment config)
│   └── scripts/                      (seed and maintenance scripts)
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

Middlewares are configured in `src/interfaces/http/app.ts`:

```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

export default app;
```

---

## Database

SQLite database is initialized in `src/infrastructure/persistence/sqlite/database.ts`. The tables created are:

- **accounts**: id, name, type, balance, currency
- **transactions**: id, type, amount, category, date, account_id, notes
- **categories**: id, name, icon, color

---

## API Endpoints

### Accounts
| Method | Route | Description |
|--------|------|-------------|
| GET | /api/accounts | Get all accounts |
| GET | /api/accounts/:id | Get account by ID |
| POST | /api/accounts | Create account |
| PUT | /api/accounts/:id | Update account |
| DELETE | /api/accounts/:id | Delete account |

### Transactions
| Method | Route | Description |
|--------|------|-------------|
| GET | /api/transactions | Get all transactions |
| GET | /api/transactions/:id | Get transaction by ID |
| POST | /api/transactions | Create transaction |
| PUT | /api/transactions/:id | Update transaction |
| DELETE | /api/transactions/:id | Delete transaction |

### Categories
| Method | Route | Description |
|--------|------|-------------|
| GET | /api/categories | Get all categories |
| GET | /api/categories/:id | Get category by ID |
| POST | /api/categories | Create category |
| PUT | /api/categories/:id | Update category |
| DELETE | /api/categories/:id | Delete category |

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
DATABASE_PATH=./data/freyr_finances.sqlite
```

---

## Notes

- Database is automatically created in the `data/` folder
- No authentication - it's a local application
- Frontend connects to `http://localhost:4000/api`
- Seed data is executed manually using `pnpm seed` and `pnpm seed:reset`

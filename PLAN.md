# Plan de Desarrollo - Finanzas Personales (Backend)

## 🎯 Stack Tecnológico
- **Runtime:** Node.js
- **Framework:** Express
- **Base de datos:** SQLite
- **Lenguaje:** TypeScript

---

## 📁 ESTRUCTURA DE CARPETAS

```
backend/
├── src/
│   ├── index.ts           (punto de entrada del servidor)
│   ├── app.ts            (configuración de Express)
│   ├── routes/           (rutas API)
│   │   ├── accounts.ts
│   │   ├── transactions.ts
│   │   └── categories.ts
│   ├── controllers/       (lógica de negocio)
│   │   ├── accountsController.ts
│   │   ├── transactionsController.ts
│   │   └── categoriesController.ts
│   ├── models/           (modelos de datos SQLite)
│   │   ├── database.ts
│   │   ├── Account.ts
│   │   ├── Transaction.ts
│   │   └── Category.ts
│   └── middleware/       (middlewares: CORS, logging, etc.)
├── data/                 (archivo .sqlite)
├── package.json
├── tsconfig.json
├── Dockerfile
└── .env.example
```

---

## 🚀 PASOS A RESOLVER

### FASE 1: CONFIGURACIÓN INICIAL

#### Paso 1: Inicializar proyecto
- [x] `pnpm init`
- [x] Instalar dependencias de desarrollo:
  - `pnpm add -D typescript @types/node @types/express nodemon ts-node`
- [x] Instalar dependencias de producción:
  - `pnpm add express sqlite3 cors dotenv helmet`
- [x] Configurar `tsconfig.json` para Node.js

#### Paso 2: Crear estructura
- [x] Crear carpetas: `src/`, `data/`, `src/routes/`, `src/controllers/`, `src/models/`, `src/middleware/`
- [x] Crear `.env.example` con `PORT=4000`

---

### FASE 2: BACKEND

#### Paso 3: Crear servidor Express
- [x] Crear `src/app.ts` con configuración básica
- [x] Configurar middlewares: cors, helmet, express.json
- [x] Crear `src/index.ts` como punto de entrada
- [x] Añadir script `"dev": "pnpm nodemon src/index.ts"` en package.json
- [x] Probar que el servidor arranca

#### Paso 4: Configurar SQLite
- [x] Crear `src/models/database.ts`
- [x] Crear esquema con tablas:
  - `accounts` (id, name, type, balance, currency)
  - `transactions` (id, type, amount, category, date, account_id, notes)
  - `categories` (id, name, icon, color)
- [x] Verificar que el archivo .sqlite se crea correctamente

#### Paso 5: Crear modelos CRUD
- [ ] `src/models/Account.ts` - create, getAll, getById, update, delete
- [ ] `src/models/Transaction.ts` - create, getAll, getById, update, delete
- [ ] `src/models/Category.ts` - create, getAll, getById, update, delete

#### Paso 6: Crear rutas API
- [ ] `src/routes/accounts.ts` - GET/POST/PUT/DELETE /api/accounts
- [ ] `src/routes/transactions.ts` - GET/POST/PUT/DELETE /api/transactions
- [ ] `src/routes/categories.ts` - GET/POST/PUT/DELETE /api/categories

#### Paso 7: Crear controladores
- [ ] Conectar modelos con rutas
- [ ] Añadir validación básica

#### Paso 8: Probar API
- [ ] Probar endpoints con curl, Postman o Thunder Client

---

### FASE 3: DOCKER

#### Paso 9: Dockerizar
- [ ] Crear `Dockerfile`
- [ ] Actualizar `.gitignore` para excluir `data/*.sqlite`

---

## 📝 ESQUEMA DE BASE DE DATOS

```sql
CREATE TABLE accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  balance REAL DEFAULT 0,
  currency TEXT DEFAULT 'EUR'
);

CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  amount REAL NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  account_id INTEGER,
  notes TEXT,
  FOREIGN KEY (account_id) REFERENCES accounts(id)
);

CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  icon TEXT,
  color TEXT
);
```

---

## 🔗 ENDPOINTS API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/accounts | Obtener todas las cuentas |
| GET | /api/accounts/:id | Obtener cuenta por ID |
| POST | /api/accounts | Crear cuenta |
| PUT | /api/accounts/:id | Actualizar cuenta |
| DELETE | /api/accounts/:id | Eliminar cuenta |
| GET | /api/transactions | Obtener todas las transacciones |
| GET | /api/transactions/:id | Obtener transacción por ID |
| POST | /api/transactions | Crear transacción |
| PUT | /api/transactions/:id | Actualizar transacción |
| DELETE | /api/transactions/:id | Eliminar transacción |
| GET | /api/categories | Obtener todas las categorías |
| GET | /api/categories/:id | Obtener categoría por ID |
| POST | /api/categories | Crear categoría |
| PUT | /api/categories/:id | Actualizar categoría |
| DELETE | /api/categories/:id | Eliminar categoría |

---

## 📝 NOTAS

1. El servidor escuchará en el puerto 4000 por defecto
2. La base de datos se creará automáticamente en la carpeta `data/`
3. No hay autenticación - es una aplicación local para un solo usuario
4. Usar middleware de CORS para permitir peticiones desde el frontend
5. Biome está configurado para lint/format con `pnpm lint`, `pnpm lint:fix` y `pnpm format`

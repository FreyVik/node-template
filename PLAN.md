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
│   ├── index.ts                      (punto de entrada del servidor)
│   ├── domain/                       (entidades y contratos de dominio)
│   ├── application/                  (casos de uso)
│   ├── interfaces/
│   │   └── http/                     (adaptador HTTP: app, rutas, handlers)
│   ├── infrastructure/
│   │   └── persistence/sqlite/       (adaptador SQLite: database y schema)
│   ├── shared/
│   │   └── config/                   (configuracion de entorno)
│   └── scripts/                      (seed y scripts de mantenimiento)
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
- [x] Crear carpetas base: `src/`, `data/`, `src/domain/`, `src/application/`, `src/interfaces/http/`, `src/infrastructure/persistence/sqlite/`, `src/shared/config/`, `src/scripts/`
- [x] Crear `.env.example` con `PORT=4000`

---

### FASE 2: BACKEND

#### Paso 3: Crear servidor Express
- [x] Crear `src/interfaces/http/app.ts` con configuración básica
- [x] Configurar middlewares: cors, helmet, express.json
- [x] Crear `src/index.ts` como punto de entrada
- [x] Añadir script `"dev": "pnpm nodemon src/index.ts"` en package.json
- [x] Probar que el servidor arranca

#### Paso 4: Configurar SQLite
- [x] Crear `src/infrastructure/persistence/sqlite/database.ts`
- [x] Crear esquema con tablas:
  - `accounts` (id, name, type, balance, currency)
  - `transactions` (id, type, amount, category, date, account_id, notes)
  - `categories` (id, name, icon, color)
- [x] Verificar que el archivo .sqlite se crea correctamente

#### Paso 5: Definir dominio y puertos
- [ ] Crear entidades/value objects en `src/domain/` (`Account`, `Transaction`, `Category`, `Money`)
- [ ] Crear contratos de repositorio en `src/domain/` (ports)
- [ ] Definir invariantes y reglas de negocio basicas

#### Paso 6: Implementar casos de uso (application)
- [ ] Crear casos de uso CRUD en `src/application/` para cuentas, transacciones y categorias
- [ ] Separar DTOs/input-output de los modelos de dominio
- [ ] Conectar casos de uso con puertos de dominio

#### Paso 7: Adaptadores HTTP e infraestructura
- [ ] Crear handlers/rutas en `src/interfaces/http/` para `/api/accounts`, `/api/transactions`, `/api/categories`
- [ ] Implementar repositorios SQLite en `src/infrastructure/persistence/sqlite/` que cumplan los puertos
- [ ] Añadir validacion basica de input y manejo de errores HTTP

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

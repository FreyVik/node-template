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
│   │   ├── cuentas.ts
│   │   ├── transacciones.ts
│   │   └── categorias.ts
│   ├── controllers/       (lógica de negocio)
│   │   ├── cuentasController.ts
│   │   ├── transaccionesController.ts
│   │   └── categoriasController.ts
│   ├── models/           (modelos de datos SQLite)
│   │   ├── database.ts
│   │   ├── Cuenta.ts
│   │   ├── Transaccion.ts
│   │   └── Categoria.ts
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
- [ ] `pnpm init`
- [ ] Instalar dependencias de desarrollo:
  - `pnpm add -D typescript @types/node @types/express nodemon ts-node`
- [ ] Instalar dependencias de producción:
  - `pnpm add express sqlite3 cors dotenv helmet`
- [ ] Configurar `tsconfig.json` para Node.js

#### Paso 2: Crear estructura
- [ ] Crear carpetas: `src/`, `data/`, `src/routes/`, `src/controllers/`, `src/models/`, `src/middleware/`
- [ ] Crear `.env.example` con `PORT=4000`

---

### FASE 2: BACKEND

#### Paso 3: Crear servidor Express
- [ ] Crear `src/app.ts` con configuración básica
- [ ] Configurar middlewares: cors, helmet, express.json
- [ ] Crear `src/index.ts` como punto de entrada
- [ ] Añadir script `"dev": "pnpm nodemon src/index.ts"` en package.json
- [ ] Probar que el servidor arranca

#### Paso 4: Configurar SQLite
- [ ] Crear `src/models/database.ts`
- [ ] Crear esquema con tablas:
  - `cuentas` (id, nombre, tipo, saldo, moneda)
  - `transacciones` (id, tipo, cantidad, categoria, fecha, cuentaId, nota)
  - `categorias` (id, nombre, icono, color)
- [ ] Verificar que el archivo .sqlite se crea correctamente

#### Paso 5: Crear modelos CRUD
- [ ] `src/models/Cuenta.ts` - create, getAll, getById, update, delete
- [ ] `src/models/Transaccion.ts` - create, getAll, getById, update, delete
- [ ] `src/models/Categoria.ts` - create, getAll, getById, update, delete

#### Paso 6: Crear rutas API
- [ ] `src/routes/cuentas.ts` - GET/POST/PUT/DELETE /api/cuentas
- [ ] `src/routes/transacciones.ts` - GET/POST/PUT/DELETE /api/transacciones
- [ ] `src/routes/categorias.ts` - GET/POST/PUT/DELETE /api/categorias

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
CREATE TABLE cuentas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  tipo TEXT NOT NULL,
  saldo REAL DEFAULT 0,
  moneda TEXT DEFAULT 'EUR'
);

CREATE TABLE transacciones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tipo TEXT NOT NULL,
  cantidad REAL NOT NULL,
  categoria TEXT NOT NULL,
  fecha TEXT NOT NULL,
  cuentaId INTEGER,
  nota TEXT,
  FOREIGN KEY (cuentaId) REFERENCES cuentas(id)
);

CREATE TABLE categorias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  icono TEXT,
  color TEXT
);
```

---

## 🔗 ENDPOINTS API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/cuentas | Obtener todas las cuentas |
| GET | /api/cuentas/:id | Obtener cuenta por ID |
| POST | /api/cuentas | Crear cuenta |
| PUT | /api/cuentas/:id | Actualizar cuenta |
| DELETE | /api/cuentas/:id | Eliminar cuenta |
| GET | /api/transacciones | Obtener todas las transacciones |
| GET | /api/transacciones/:id | Obtener transacción por ID |
| POST | /api/transacciones | Crear transacción |
| PUT | /api/transacciones/:id | Actualizar transacción |
| DELETE | /api/transacciones/:id | Eliminar transacción |
| GET | /api/categorias | Obtener todas las categorías |
| GET | /api/categorias/:id | Obtener categoría por ID |
| POST | /api/categorias | Crear categoría |
| PUT | /api/categorias/:id | Actualizar categoría |
| DELETE | /api/categorias/:id | Eliminar categoría |

---

## 📝 NOTAS

1. El servidor escuchará en el puerto 4000 por defecto
2. La base de datos se creará automáticamente en la carpeta `data/`
3. No hay autenticación - es una aplicación local para un solo usuario
4. Usar middleware de CORS para permitir peticiones desde el frontend
# TypeScript Project Template

Template para iniciar proyectos TypeScript desde cero con las mejores prácticas de 2026.

---

## 🖥️ Fase 1: Pre-requisitos del Sistema Operativo

### Windows (PowerShell)

#### 1. Instalar Node.js
```powershell
# Opción A: winget (recomendado - Windows Package Manager)
winget install OpenJS.NodeJS.LTS

# Opción B: Descargar desde nodejs.org
# https://nodejs.org/ - Descargar "LTS" (Windows Installer .msi)
```

#### 2. Instalar pnpm
```powershell
# npm viene incluido con Node.js, lo usamos para instalar pnpm globalmente
npm install -g pnpm
```

#### 3. Instalar Git
```powershell
# winget
winget install Git.Git

# O descargar desde https://git-scm.com
```

---

### Linux (Debian/Ubuntu) - Terminal

#### 1. Instalar Node.js
```bash
# Opción A: nodesource (recomendado para Node.js LTS)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Opción B: Usar apt (versiones más antiguas)
sudo apt update
sudo apt install nodejs npm
```

#### 2. Instalar pnpm
```bash
# npm viene incluido con Node.js
npm install -g pnpm
```

#### 3. Instalar Git
```bash
sudo apt update
sudo apt install git
```

---

## ✅ Verificar Instalación

Si todo se instaló correctamente, estos comandos deberían mostrar las versiones:

```bash
node --version    # Ejemplo: v20.18.0
npm --version     # Ejemplo: 10.9.0
pnpm --version   # Ejemplo: 10.0.0
git --version    # Ejemplo: git version 2.45.0
```

---

## 📦 Fase 2: Inicializar Proyecto

### 1. Crear directorio del proyecto
```bash
mkdir mi-proyecto
cd mi-proyecto
```

### 2. Inicializar package.json
```bash
pnpm init
```
Inicializa el proyecto creando el archivo `package.json` con valores por defecto.

### 3. Editar package.json
Editar manualmente los campos esenciales:

```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "type": "module",
  "description": "Descripción del proyecto",
  "main": "dist/index.js"
}
```

| Campo | Propósito | Notas |
|-------|----------|-------|
| `name` | Nombre del proyecto | Usa kebab-case (ej: "mi-proyecto") |
| `version` | Versión del proyecto | Semántica (ej: "1.0.0") |
| `type` | Sistema de módulos | `"module"` = ES6 modules, omitir = CommonJS |
| `description` | Descripción corta | Opcional |
| `main` | Entry point | `"dist/index.js"` para producción, `"src/index.ts"` para desarrollo |

#### Sobre `type: "module"`
Establece `"module"` para habilitar sintaxis ES6 modules (import/export) en Node.js.
- Valores aceptados: `"module"` (ES6) o excluir campo (CommonJS por defecto)

#### Sobre `main`
Indica el entry point del paquete para imports directoss:
- `"dist/index.js"`: código compilado (producción)
- `"src/index.ts"`: código fuente (desarrollo)
- No incluirlo: para apps/APIs que no son librerías reutilizables

---

## 📦 Fase 3: Instalar Dependencias

### Dependencias de desarrollo
```bash
pnpm add -D typescript @types/node tsx
```

| Flag | Dónde se guarda | Cuándo usar |
|------|-----------------|-------------|
| `-D` | `devDependencies` | Solo en desarrollo (typescript, @types, tsx, vitest, etc.) |
| sin `-D` | `dependencies` | En producción (express, fastify, zod, etc.) |

| Paquete | Propósito |
|--------|-----------|
| typescript | Compilador de TypeScript |
| @types/node | Tipos de TypeScript para Node.js |
| tsx | Ejecuta TypeScript directamente sin compilar (para desarrollo) |

> **Importante**: Siempre usar `-D` para typecript, @types/node y tsx porque solo se necesitan para desarrollo, no en producción.

---

## ⚙️ Fase 4: Configurar TypeScript

### 1. Generar tsconfig.json base
```bash
npx tsc --init
```
Genera un archivo de configuración TypeScript con valores por defecto.

### 2. Editar tsconfig.json
Reemplazar el contenido con esta configuración recomendada:

```json
{
  "compilerOptions": {
    // Target y Module (versión de JS y sistema de módulos)
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022"],
    "types": ["node"],

    // Configuración estricta (recomendado)
    "strict": true,
    "exactOptionalPropertyTypes": true,

    // Interoperabilidad (para compatibilidad con CommonJS)
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,

    // Compilación (directorios de entrada y salida)
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,

    // TypeScript moderno
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "skipLibCheck": true,

    // Seguridad extra
    "noUncheckedIndexedAccess": true,

    // ELIMINADOS - solo para proyectos con React
    // "jsx": "react-jsx",  // Eliminado: solo necesario para React
    // "sourceMap": true,   // Eliminado: genera .map para debugging (opcional)
    // "declarationMap": true  // Eliminado: genera .d.ts.map (opcional)
  },

  // Archivos a incluir en la compilación
  "include": ["src/**/*.ts"],

  // Archivos a excluir de la compilación
  "exclude": ["dist", "node_modules"]
}
```

### Explicación de opciones importantes

#### target y module (versión de JS)
| Opción | Valor recomendado | Propósito |
|--------|---------------|----------|
| `target` | "ES2022" | Versión de JavaScript a generar. ES2022 = moderno y compatible |
| `module` | "ESNext" | Sistema de módulos. ESNext = moderno |

#### moduleResolution
| Valor | Cuándo usarlo |
|-------|-------------|
| `"bundler"` | Proyectos con bundlers modernos (Vite, esbuild, SWC) - **Recomendado** |
| `"node"` | Proyectos sin bundler (CommonJS puro) |
| `"node16"` | Proyectos Node.js con ES modules puros |

#### lib (bibliotecas disponibles)
| Valor | Propósito |
|-------|----------|
| `["ES2022"]` | APIs de ES2022 disponibles en el código |
| `["ES2022", "DOM"]` | Añade APIs del navegador (para frontend) |

#### types (tipos de Node.js)
| Valor | Propósito |
|-------|----------|
| `["node"]` | Carga los tipos de @types/node (console, process, fs, etc.) |
| `[]` | No carga tipos automáticamente (requiere añadir manualmente) |

> **Importante**: Añadir `"types": ["node"]` es necesario para que TypeScript reconozca `console`, `process`, `Buffer`, `__dirname`, etc. sin errores del LSP.

#### Configuración estricta
| Opción | Propósito |
|--------|----------|
| `strict: true` | Habilita TODAS las comprobaciones estrictas de tipos |
| `exactOptionalPropertyTypes` | `?` properties no pueden ser undefined, deben tener valor |

#### Interoperabilidad
| Opción | Propósito |
|--------|----------|
| `esModuleInterop` | Permite `import express from 'express'` (sin default) |
| `forceConsistentCasingInFileNames` | Evita errores sensibles en imports |
| `resolveJsonModule` | Permite importar .json directamente |

#### include y exclude
| Opción | Propósito |
|--------|----------|
| `include` | Archivos a compilar (globs). Ej: `["src/**/*.ts"]` |
| `exclude` | Archivos a IGNORAR. Ej: `["dist", "node_modules"]` |

#### Parámetros eliminados (según proyecto)
| Parámetro | Por qué eliminarlo |
|----------|------------------|
| `jsx` | Solo necesario para proyectos React. Eliminado si no usas React |
| `sourceMap` | Genera .map para debugging. Eliminado para build más limpio |
| `declarationMap` | Genera .d.ts.map. Eliminado para build más limpio |

---

> **Nota**: Esta configuración es para proyectos TypeScript **sin React**. Si usas React, añade `"jsx": "react-jsx"`. Para proyectos con frameworks (Next.js, Vite), suelen generar su propio tsconfig.

---

## 🔧 Fase 5: Configurar Scripts

Editar la sección `"scripts"` en `package.json`:

```json
{
  "scripts": {
    "dev": "tsx --watch src/index.ts",
    "build": "tsc",
    "typecheck": "tsc --noEmit",
    "start": "node dist/index.js"
  }
}
```

| Script | Propósito |
|--------|-----------|
| `dev` | Ejecución en desarrollo con hot reload |
| `build` | Compila TypeScript a JavaScript |
| `typecheck` | Verifica tipos sin compilar (más rápido) |
| `start` | Ejecuta el código compilado |

---

## 📁 Fase 6: Estructura de Archivos

### 1. Crear carpetas

#### Linux/macOS (bash)
```bash
mkdir -p src/types src/services src/utils
```

#### Windows (PowerShell)
```powershell
mkdir src
mkdir src\types
mkdir src\services
mkdir src\utils
```

### 2. Crear archivo entry point
Crear `src/index.ts` con contenido básico:

```typescript
console.log("¡Hola, TypeScript!");

function saludar(nombre: string): string {
  return `Hola, ${nombre}!`;
}

const mensaje = saludar("Mundo");
console.log(mensaje);
```

### 3. Crear archivos vacíos en subcarpetas

```typescript
// src/types/index.ts
// Tipos compartidos del proyecto
export {};
```

```typescript
// src/services/index.ts
// Servicios del proyecto
export {};
```

```typescript
// src/utils/index.ts
// Utilidades del proyecto
export {};
```

### 4. Crear .gitignore
Crear archivo `.gitignore` con:
```
node_modules/
dist/
*.log
.env
```

### Estructura final:
```
├── src/
│   ├── types/
│   │   └── index.ts     # Tipos compartidos
│   ├── services/
│   │   └── index.ts     # Lógica de negocio
│   ├── utils/
│   │   └── index.ts     # Utilidades
│   └── index.ts         # Entry point
├── dist/                # Se crea al compilar
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### Explicación de carpetas:

| Carpeta | Propósito |
|--------|-----------|
| `src/types/` | Tipos y interfaces compartidas |
| `src/services/` | Lógica de negocio |
| `src/utils/` | Funciones utilitarias |
| `src/index.ts` | Entry point del proyecto |
| `dist/` | Código compilado (no_committeado) |

---

## 🗂️ Fase 7: Git

### 1. Inicializar repositorio
```bash
git init
```

### 2. Primer commit
```bash
git add .
git commit -m "Initial commit"
```

---

## 🚀 Uso del Proyecto

```bash
# Desarrollo (con hot reload)
pnpm dev

# Compilar a JavaScript
pnpm build

# Verificar tipos (sin compilar)
pnpm typecheck

# Ejecutar en producción (después de build)
pnpm start
```

---

## 🛠️ Herramientas Adicionales (opcional)

### Linting y Formateo
```bash
# Opción 1: ESLint + Prettier
pnpm add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier eslint-config-prettier

# Opción 2: Biome (más rápido, escrito en Rust)
pnpm add -D @biomejs/biome
```

### Testing
```bash
pnpm add -D vitest
```

### Validación Runtime
```bash
pnpm add zod
```

### Framework (según proyecto)
```bash
# Backend - Express
pnpm add express
pnpm add -D @types/express

# Backend - Fastify
pnpm add fastify
pnpm add -D @types/fastify
```

---

## 📝 Notas

- Este template usa **pnpm** como gestor de paquetes (recomendado en 2026)
- Configuración estricta habilitada (`strict: true`)
- TypeScript 5.x compatible
- Node.js 23+ soporta ejecución nativa de TypeScript con `--experimental-strip-types`

---

## 🌿 Ramas: Backend + Frontend

Este template incluye dos ramas con ejemplos listos para usar:

| Rama | Propósito | Código de ejemplo |
|------|----------|---------------|
| `master` | Template base | Vacío |
| `backend` | Server/API Node.js | Servidor HTTP básico |
| `frontend` | Navegador/Web | Hello World DOM |

### Cómo usar las ramas

```bash
# Ver ramas disponibles
git branch

# Cambiar a Backend
git checkout backend

# Cambiar a Frontend
git checkout frontend

# Volver al template base
git checkout master
```

### Ejecutar según la rama

#### Backend
```bash
# En rama backend
pnpm dev
pnpm build
pnpm start
```

#### Frontend
```bash
# En rama frontend
pnpm dev
pnpm build
```

### Añadir dependencias según tipo

```bash
# Backend
pnpm add express
pnpm add -D @types/express @types/node

# Frontend (React)
pnpm add react react-dom
pnpm add -D @types/react @types/react-dom
```
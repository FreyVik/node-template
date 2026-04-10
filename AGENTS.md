# AGENTS.md - Guía de Configuración para Proyectos TypeScript

## Estado: 🟡 EN CONSTRUCCIÓN
Este documento se irá actualizando a medida que el proyecto tome forma.

---

## 1. Gestor de Paquetes

**pnpm** es el gestor recomendado en 2026 por su velocidad y eficiencia.

```bash
# Instalación global (si no lo tienes)
npm install -g pnpm

# Comandos básicos
pnpm install      # Instalar dependencias
pnpm add <paquete> # Añadir dependencia
pnpm add -D <paquete> # Añadir dependencia de desarrollo
pnpm remove <paquete> # Eliminar dependencia
```

---

## 2. Configuración TypeScript (tsconfig.json)

### Configuración Base Recomendada
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "noUncheckedIndexedAccess": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["dist", "node_modules"]
}
```

### Extender Configs Existentes
En lugar de escribir el tsconfig desde cero, puedes usar configs base mantenidos por la comunidad:

```bash
pnpm add -D @tsconfig/node20  # Para Node.js
pnpm add -D @tsconfig/strictest  # Config más estricta
```

，然后用 extiendes en tu tsconfig:
```json
{
  "extends": "@tsconfig/node20/tsconfig.json",
  "compilerOptions": {
    // Tus overrides aquí
  }
}
```

---

## 3. Scripts Recomendados (package.json)

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

---

## 4. Estructura de Proyecto Sugerida

```
proyecto/
├── src/
│   ├── types/        # Definiciones de tipos compartidas
│   ├── services/     # Lógica de negocio
│   ├── routes/      # Rutas/endpoints (si aplica)
│   ├── utils/       # Utilidades
│   ├── index.ts     # Entry point
│   └── app.ts       # Configuración de app (si aplica)
├── dist/            # Output compilado (NO committing)
├── tests/           # Tests (opcional, puede estar junto a src)
├── tsconfig.json
├── package.json
└── .gitignore
```

### .gitignore mínimo
```
node_modules/
dist/
*.log
.env
```

---

## 5. Herramientas de Desarrollo

### Linting y Formateo - Biome (Recomendado en 2026)

**Biome** es la opción recomendada porque:
- ✅ Reemplaza ESLint + Prettier en una sola herramienta
- ✅ Escrito en Rust → 50x más rápido que ESLint
- ✅ Configuración mínima
- ✅ Mantenimiento activo

#### Instalación
```bash
pnpm add -D @biomejs/biome
```

#### Inicializar configuración
```bash
npx @biomejs/biome init
```

#### Scripts recomendados (añadir a package.json)
```json
{
  "lint": "biome lint .",
  "format": "biome format --write .",
  "check": "biome check ."
}
```

### Testing
```bash
pnpm add -D vitest
pnpm add -D @types/node  # Para tipos de Node en tests
```

### Ejecución TypeScript Directa
```bash
pnpm add -D tsx  # Ejecuta TS directamente sin compilar
```

---

## 6. Patrones y Convenciones

### Imports
```typescript
// ✅ Use type imports para tipos
import type { User, CreateUserDto } from './types';
import { someFunction } from './utils';

// ❌ Evitar
import { User, someFunction } from './types';
```

### Strict Mode
**Siempre** habilitar `strict: true`. Es 2026, no hay excusa para no usarlo.

### Tipos vs Runtime
- Types solo existen en compilación
- Para validación runtime, usar **Zod** o **Valibot**

---

## Ramas del Proyecto

| Rama | Propósito |
|------|----------|
| `master` | Template base |
| `backend` | Ejemplo Node.js/Express |
| `frontend` | Ejemplo React/Vanilla |

### Cambiar de rama
```bash
git checkout backend   # Para backend
git checkout frontend  # Para frontend
git checkout master  # Volver a base
```

### Push a GitHub
```bash
git remote add origin https://github.com/FreyVik/node-template.git
git push -u origin master backend frontend
```

---

<<<<<<< HEAD
## Rama Actual: Frontend

Esta rama contiene un ejemplo de Hello World para navegador.

### Ejecutar
```bash
pnpm dev        # Requiere HTML con elemento #app
pnpm build     # Compilar a dist/
```

### Añadir dependencias
```bash
pnpm add react react-dom
pnpm add -D @types/react @types/react-dom
```

---

=======
>>>>>>> master
## Pendiente de Definir

- [ ] Tipo de proyecto (API, CLI, frontend, library?)
- [ ] Framework (Express, Fastify, Nest, none?)
- [ ] Base config a usar (@tsconfig/...)
- [ ] Estado de ESLint/Prettier/Biome
- [ ] Testing (Vitest, Jest, none?)
- [ ] Variables de entorno (necesitas validación con Zod?)

---

## Comandos de Setup Rápido

```bash
# Inicializar proyecto vacío con la config base
mkdir <nombre-proyecto> && cd <nombre-proyecto>
pnpm init
pnpm add -D typescript @types/node tsx
npx tsc --init
# Editar tsconfig.json manualmente (ver arriba)
```

---

## Notas Adicionales

- Para proyectos con frameworks específicos (Next.js, Express, etc.), los configs varían ligeramente
- Si usas un framework, suele generar un tsconfig correcto automáticamente
- En 2026, Node.js 23+ soporta ejecución nativa de TypeScript con `--experimental-strip-types`
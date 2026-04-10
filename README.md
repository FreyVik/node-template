# Finanzas Personales - Frontend

Aplicación web para gestionar finanzas personales construida con React, TypeScript y Vite.

---

## 🚀 Iniciar Proyecto

```bash
# Instalar dependencias
pnpm install

# Arrancar servidor de desarrollo
pnpm dev

# Compilar para producción
pnpm build

# Ver versión producción local
pnpm preview
```

---

## 📁 Estructura de Archivos

```
├── index.html              # Entry point del navegador
├── vite.config.ts          # Configuración de Vite
├── tsconfig.json           # Configuración de TypeScript
├── package.json            # Dependencias y scripts
├── src/
│   └── index.tsx           # Componente principal React
└── dist/                   # Archivos compilados (no commitear)
```

### Entry Points Principales

| Archivo | Propósito |
|---------|-----------|
| `index.html` | Punto de entrada HTML. Define el `<div id="root">` donde React se renderiza. |
| `src/index.tsx` | Componente principal de React. Aquí empieza toda la aplicación. |
| `vite.config.ts` | Configuración de Vite (plugins, servidor, build). |
| `tsconfig.json` | Configuración de TypeScript (tipos, JSX, strict mode). |

---

## 🛠️ Comandos Disponibles

| Comando | Propósito |
|---------|-----------|
| `pnpm dev` | Servidor de desarrollo con hot reload (http://localhost:5173) |
| `pnpm build` | Compilar TypeScript + generar archivos para producción |
| `pnpm preview` | Ver la versión de producción localmente |
| `pnpm typecheck` | Verificar tipos TypeScript sin compilar |
| `pnpm lint` | Detectar errores de código con Biome |
| `pnpm format` | Formatear código automáticamente |
| `pnpm check` | Lint + Format a la vez |

---

## 🔧 Tecnologías del Proyecto

| Categoría | Tecnología |
|-----------|------------|
| Framework | React 19 |
| Lenguaje | TypeScript |
| Build tool | Vite |
| Linting | Biome |
| Gestor | pnpm |

---

## 📝 Scripts (package.json)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "lint": "biome lint .",
    "format": "biome format --write .",
    "check": "biome check ."
  }
}
```

---

## ⚙️ Configuración TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

### Opciones importantes:

| Opción | Valor | Propósito |
|--------|-------|-----------|
| `target` | ES2022 | Versión de JavaScript de salida |
| `lib` | ES2022, DOM, DOM.Iterable | APIs disponibles (navegador + JS moderno) |
| `jsx` | react-jsx | Soporte para sintaxis JSX de React |
| `strict` | true | Modo estricto de TypeScript |
| `noEmit` | true | No generar archivos .js (Vite lo hace) |
| `moduleResolution` | bundler | Para proyectos con bundlers (Vite) |

---

## 🔄 Añadir nuevas dependencias

```bash
# Dependencias de producción
pnpm add <paquete>

# Dependencias de desarrollo
pnpm add -D <paquete>
```

### Ejemplos常用:
```bash
# Router
pnpm add react-router-dom

# Gráficos
pnpm add recharts
pnpm add -D @types/recharts

# Iconos
pnpm add lucide-react

# Fechas
pnpm add date-fns

# Validación
pnpm add zod
```

---

## 📦 Estado Actual del Proyecto

### Dependencias instaladas:
- react, react-dom
- vite, @vitejs/plugin-react
- @types/react, @types/react-dom
- @biomejs/biome

### pending de implementar:
- [ ] Estructura de carpetas (components, pages, hooks, types, services, utils, context)
- [ ] Routing (react-router-dom)
- [ ] UI/Styles (Tailwind CSS)
- [ ] Gráficos (Recharts)
- [ ] Tipos (Transaccion, Cuenta, etc.)
- [ ] Estado global (Context API)

---

## 📌 Notas

- Este proyecto usa **Vite** como build tool (más rápido que Webpack)
- **Biome** ESLint + Prettier (más rápido, todo en uno)
- Los tipos de TypeScript se verifican en tiempo de desarrollo
- El código se compila automáticamente al hacer `pnpm build`
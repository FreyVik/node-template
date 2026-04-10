# AGENTS.md - Proyecto Finanzas Personales (Frontend)

## Estado: 🟡 EN CONSTRUCCIÓN
Este documento seirá actualizando a medida que el proyecto tome forma.

---

## 1. Gestor de Paquetes

**pnpm** - Gestor recomendado en 2026.

```bash
npm install -g pnpm
pnpm install
pnpm add <paquete>
pnpm add -D <paquete>
```

---

## 2. Dependencias del Proyecto

### Core
```bash
pnpm add react react-dom
pnpm add -D @types/react @types/react-dom
```

### Routing
```bash
pnpm add react-router-dom
```

### UI/Styles (elegir uno)
```bash
# Opción A: Tailwind CSS
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Opción B: Styled Components
pnpm add styled-components
pnpm add -D @types/styled-components

# Opción C: CSS Modules (vanilla)
# Ya incluido sin libs extra
```

### Gráficos (para gráficos financieros)
```bash
pnpm add recharts
pnpm add -D @types/recharts
```

### Iconos
```bash
pnpm add lucide-react
```

### Fechas
```bash
pnpm add date-fns
```

### Validación
```bash
pnpm add zod
```

### HTTP Client
```bash
pnpm add axios
```

---

## 3. Estructura de Proyecto

```
src/
├── components/
│   ├── ui/           # Componentes reutilizables (Button, Input, Card)
│   ├── charts/       # Gráficos financieros
│   ├── forms/        # Formularios
│   └── layout/       # Layout (Header, Sidebar, etc.)
├── pages/
│   ├── Dashboard.tsx
│   ├── Transacciones.tsx
│   ├── Cuentas.tsx
│   ├── Informes.tsx
│   └── Configuracion.tsx
├── services/
│   ├── api.ts        # Configuración axios
│   ├── transacciones.ts
│   ├── cuentas.ts
│   └── budgets.ts
├── hooks/
│   ├── useTransacciones.ts
│   ├── useCuentas.ts
│   └── usePresupuesto.ts
├── types/
│   ├── transaccion.ts
│   ├── cuenta.ts
│   └── presupuesto.ts
├── utils/
│   ├── formateo.ts   # формат números, fechas
│   ├── calculos.ts  # cálculos financieros
│   └── constantes.ts
├── context/
│   └── AppContext.tsx # Estado global
├── App.tsx
└── main.tsx
```

---

## 4. Scripts

```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "biome lint .",
  "format": "biome format --write ."
}
```

---

## 5. Configuración TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
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
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## 6. Tipos Principales

```typescript
// src/types/transaccion.ts
export type Transaccion = {
  id: string;
  tipo: 'ingreso' | 'gasto';
  cantidad: number;
  categoria: string;
  fecha: Date;
  cuentaId: string;
  nota?: string;
};

// src/types/cuenta.ts
export type Cuenta = {
  id: string;
  nombre: string;
  tipo: 'bancaria' | 'efectivo' | 'tarjeta';
  saldo: number;
  moneda: 'EUR' | 'USD';
};
```

---

## 7. Stack Tecnológico Elegido

| Categoría | Tecnología |
|----------|------------|
| Framework | React |
| Routing | React Router |
| Estado | Context API |
| Estilos | Tailwind CSS |
| Gráficos | Recharts |
| Fechas | date-fns |
| Validación | Zod |
| Icons | Lucide |

---

## 8. Pendiente

- [ ] Definir estructura de datos
- [ ] Configurar Tailwind
- [ ] Crear componentes base
- [ ] Implementar transacciones CRUD
- [ ] ImplementarDashboard
- [ ] Añadir gráficos

---

## 9. Notas

- Usar Zod para validación de formularios
- date-fns para tutto relacionado con fechas
- Recharts para gráficos de gastos/ingresos
- context para estado global (cuentas, transacciones)
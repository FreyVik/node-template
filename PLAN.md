# Plan de Desarrollo - Finanzas Personales (Frontend)

## 🎯 Stack Tecnológico
- **Build tool:** Vite
- **Framework:** React
- **Lenguaje:** TypeScript
- **Estado:** TanStack Query (React Query)
- **Estilos:** Tailwind CSS
- **Comunicación:** Fetch API

---

## 📁 ESTRUCTURA DE CARPETAS

```
frontend/
├── src/
│   ├── main.tsx           (punto de entrada)
│   ├── App.tsx            (componente principal)
│   ├── components/
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Card.tsx
│   │       └── Loading.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Cuentas.tsx
│   │   ├── Transacciones.tsx
│   │   └── Categorias.tsx
│   ├── services/
│   │   ├── api.ts        (configuración base de fetch)
│   │   ├── cuentasService.ts
│   │   ├── transaccionesService.ts
│   │   └── categoriasService.ts
│   ├── hooks/
│   │   ├── useCuentas.ts
│   │   ├── useTransacciones.ts
│   │   └── useCategorias.ts
│   └── types/
│       ├── cuenta.ts
│       ├── transaccion.ts
│       └── categoria.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── Dockerfile
└── .env.example
```

---

## 🚀 PASOS A RESOLVER

### FASE 1: CONFIGURACIÓN INICIAL

#### Paso 1: Crear proyecto Vite
- [ ] `pnpm create vite@latest . -- --template react-ts` (si no existe)
- [ ] Instalar dependencias adicionales:
  - `pnpm add @tanstack/react-query`
- [ ] Instalar dependencias de desarrollo:
  - `pnpm add -D tailwindcss postcss autoprefixer`

#### Paso 2: Configurar Tailwind CSS
- [ ] `npx tailwindcss init -p`
- [ ] Configurar `tailwind.config.js`:
  ```javascript
  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: { extend: {} },
    plugins: [],
  }
  ```
- [ ] Crear `src/index.css` con directivas:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- [ ] Importar en `main.tsx`: `import './index.css'`

---

### FASE 2: TIPOS Y SERVICIOS

#### Paso 3: Crear tipos TypeScript
- [ ] Crear `src/types/cuenta.ts`:
  ```typescript
  export interface Cuenta {
    id: number;
    nombre: string;
    tipo: 'bancaria' | 'efectivo' | 'tarjeta';
    saldo: number;
    moneda: string;
  }
  ```
- [ ] Crear `src/types/transaccion.ts`:
  ```typescript
  export interface Transaccion {
    id: number;
    tipo: 'ingreso' | 'gasto';
    cantidad: number;
    categoria: string;
    fecha: string;
    cuentaId: number;
    nota?: string;
  }
  ```
- [ ] Crear `src/types/categoria.ts`:
  ```typescript
  export interface Categoria {
    id: number;
    nombre: string;
    icono?: string;
    color?: string;
  }
  ```

#### Paso 4: Crear servicios API
- [ ] Crear `src/services/api.ts`:
  ```typescript
  const API_URL = 'http://localhost:4000/api';
  
  export async function fetchAPI(endpoint: string, options?: RequestInit) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return response.json();
  }
  ```
- [ ] Crear `src/services/cuentasService.ts`:
  - `getCuentas()` - GET /api/cuentas
  - `getCuentaById(id)` - GET /api/cuentas/:id
  - `createCuenta(data)` - POST /api/cuentas
  - `updateCuenta(id, data)` - PUT /api/cuentas/:id
  - `deleteCuenta(id)` - DELETE /api/cuentas/:id
- [ ] Crear `src/services/transaccionesService.ts` (funciones similares)
- [ ] Crear `src/services/categoriasService.ts` (funciones similares)

---

### FASE 3: COMPONENTES UI

#### Paso 5: Crear componentes base
- [ ] `src/components/ui/Button.tsx` - botón con estilos Tailwind
- [ ] `src/components/ui/Input.tsx` - input con estilos Tailwind
- [ ] `src/components/ui/Card.tsx` - tarjeta con estilos Tailwind
- [ ] `src/components/ui/Loading.tsx` - spinner de carga

---

### FASE 4: HOOKS Y ESTADO

#### Paso 6: Configurar TanStack Query
- [ ] Crear `src/main.tsx`:
  ```typescript
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './App';
  
  const queryClient = new QueryClient();
  
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );
  ```

#### Paso 7: Crear hooks personalizados
- [ ] `src/hooks/useCuentas.ts`:
  ```typescript
  import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
  import { getCuentas, createCuenta, updateCuenta, deleteCuenta } from '../services/cuentasService';
  
  export function useCuentas() {
    return useQuery({ queryKey: ['cuentas'], queryFn: getCuentas });
  }
  
  export function useCreateCuenta() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: createCuenta,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cuentas'] }),
    });
  }
  // ... otros hooks similares
  ```
- [ ] Crear `src/hooks/useTransacciones.ts`
- [ ] Crear `src/hooks/useCategorias.ts`

---

### FASE 5: PÁGINAS

#### Paso 8: Crear páginas
- [ ] `src/pages/Dashboard.tsx`:
  - Mostrar resumen de finanzas
  - Total de ingresos/gastos por mes
  - Gráfico simple (opcional)
- [ ] `src/pages/Cuentas.tsx`:
  - Lista de cuentas
  - Formulario para crear/editar cuenta
  - Botón para eliminar
- [ ] `src/pages/Transacciones.tsx`:
  - Lista de transacciones
  - Filtros por fecha, categoría
  - Formulario para crear/editar transacción
- [ ] `src/pages/Categorias.tsx`:
  - Lista de categorías
  - Gestor de categorías

#### Paso 9: Integrar en App.tsx
- [ ] Crear navegación básica (pestañas o sidebar)
- [ ] Renderizar páginas según estado
- [ ] Integrar componentes y hooks

---

### FASE 6: DOCKER

#### Paso 10: Dockerizar
- [ ] Crear `Dockerfile`
- [ ] Configurar para desarrollo o producción

---

## 🔗 CONEXIÓN CON BACKEND

El frontend se conecta al backend en `http://localhost:4000/api`:

| Frontend | Backend |
|---------|---------|
| GET /api/cuentas | Puerto 4000 |
| Puerto UI | 3000 (Vite dev) |

Asegúrate de que el backend está corriendo antes de iniciar el frontend.

---

## 📝 NOTAS

1. Antes de iniciar el frontend, asegúrate de que el backend está corriendo (`npm run dev` en el directorio backend)
2. Usar TanStack Query para fetching de datos, caché y gestión de estado
3. Usar Fetch API para HTTP requests (sin Axios)
4. Usar Tailwind CSS para estilos
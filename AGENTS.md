# AGENTS.md - Frontend Development Guide

## Tech Stack
- **Build tool:** Vite
- **Framework:** React
- **Language:** TypeScript
- **State Management:** TanStack Query (React Query)
- **Styling:** Tailwind CSS
- **Communication:** Fetch API
- **Package Manager:** pnpm

---

## Initial Setup

### Additional Dependencies
```bash
pnpm add @tanstack/react-query
```

### Development Dependencies
```bash
pnpm add -D tailwindcss postcss autoprefixer
```

---

## Project Structure

```
frontend/
├── src/
│   ├── main.tsx           (entry point)
│   ├── App.tsx            (main component)
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
│   │   ├── api.ts        (fetch base configuration)
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

## tsconfig.json

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
    "exactOptionalPropertyTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

---

## Tailwind CSS Configuration

### Install & Init
```bash
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### tailwind.config.js
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

### src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### main.tsx
```typescript
import './index.css'
```

---

## TanStack Query Configuration

### main.tsx
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

---

## API Service

### src/services/api.ts
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

---

## Entity Services Examples

### src/services/cuentasService.ts
```typescript
import { fetchAPI } from './api';

export const getCuentas = () => fetchAPI('/api/cuentas');
export const getCuentaById = (id: string) => fetchAPI(`/api/cuentas/${id}`);
export const createCuenta = (data: any) => fetchAPI('/api/cuentas', {
  method: 'POST',
  body: JSON.stringify(data)
});
export const updateCuenta = (id: string, data: any) => fetchAPI(`/api/cuentas/${id}`, {
  method: 'PUT',
  body: JSON.stringify(data)
});
export const deleteCuenta = (id: string) => fetchAPI(`/api/cuentas/${id}`, {
  method: 'DELETE'
});
```

---

## Custom Hooks Examples

### src/hooks/useCuentas.ts
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
```

---

## Components Structure

### Basic UI Components
- `src/components/ui/Button.tsx` - styled button
- `src/components/ui/Input.tsx` - styled input
- `src/components/ui/Card.tsx` - styled card
- `src/components/ui/Loading.tsx` - loading spinner

### Page Components
- `src/pages/Dashboard.tsx` - financial summary
- `src/pages/Cuentas.tsx` - accounts management
- `src/pages/Transacciones.tsx` - transactions management
- `src/pages/Categorias.tsx` - categories management

---

## App Structure

### src/App.tsx
- Basic navigation (tabs or sidebar)
- Page routing based on state
- Integration of components and hooks

---

## Docker

### Dockerfile
- Create for development or production

---

## Backend Connection

Frontend connects to backend at `http://localhost:4000/api`:
- Frontend UI runs on port 3000 (Vite dev)
- Backend API runs on port 4000

**Important:** Start backend first (`pnpm dev` in backend directory).

---

## Notes

1. Start backend before frontend (`pnpm dev` in backend directory)
2. Use TanStack Query for data fetching, caching, and state management
3. Use Fetch API for HTTP requests (no Axios)
4. Use Tailwind CSS for styling
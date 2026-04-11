# AGENTS.md - Frontend Development Reference

## Tech Stack
- **Build tool:** Vite
- **Framework:** React
- **Language:** TypeScript
- **State:** TanStack Query
- **Styling:** Tailwind CSS
- **API:** Fetch API
- **PM:** pnpm

---

## Project Structure
```
frontend/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/ui/          # Button, Input, Card, Loading
│   ├── pages/                  # Dashboard, Cuentas, etc.
│   ├── services/               # api.ts, *Service.ts
│   ├── hooks/                  # *Hooks.ts
│   └── types/                  # cuenta.ts, transaccion.ts, categoria.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── Dockerfile
```

---

## Configuration Files

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "strict": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

### tailwind.config.js
```javascript
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: []
}
```

---

## Key Patterns

### API Service (src/services/api.ts)
```typescript
const API_URL = 'http://localhost:4000/api';
export async function fetchAPI(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

### TanStack Query Setup (src/main.tsx)
```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

### Service Example (src/services/cuentasService.ts)
```typescript
import { fetchAPI } from './api';

export const getCuentas = () => fetchAPI('/api/cuentas');
export const createCuenta = (data) => 
  fetchAPI('/api/cuentas', { method: 'POST', body: JSON.stringify(data) });
```

### Hook Example (src/hooks/useCuentas.ts)
```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCuentas, createCuenta } from '../services/cuentasService';

export function useCuentas() {
  return useQuery({ queryKey: ['cuentas'], queryFn: getCuentas });
}
export function useCreateCuenta() {
  return useMutation({
    mutationFn: createCuenta,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cuentas'] })
  });
}
```

---

## Development Commands
```bash
# Install
pnpm install

# Dev
pnpm dev

# Build
pnpm build

# Preview
pnpm preview
```

---

## Environment
- Frontend: http://localhost:3000 (Vite dev)
- Backend: http://localhost:4000/api
- Start backend first: `pnpm dev` in backend/
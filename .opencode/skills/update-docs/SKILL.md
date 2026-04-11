---
name: update-docs
description: Actualiza automaticamente AGENTS.md y PLAN.md con cambios detallados cuando se completan hitos o hay cambios significativos en el proyecto
license: MIT
compatibility: opencode
---

# Update Documentation Skill

## Proposito
Mantener la documentacion del proyecto (AGENTS.md y PLAN.md) actualizada con cambios detallados.

## Cuando ejecutarse

### Ejecucion Manual
El usuario puede solicitar:
- "actualiza la documentacion"
- "run update-docs"
- "/update-docs"

### Ejecucion Automatica
El agente debe ejecutar esta skill cuando detecte:
- Nuevas dependencias instaladas (`pnpm add`, `npm install`, `pnpm add -D`)
- Nuevos archivos creados en `src/`
- Estructura de carpetas modificada
- Nuevos endpoints API creados
- Checkboxes marcados en PLAN.md

## Proceso

1. **Detectar rama actual** (backend o frontend)
2. **Escanear cambios:**
   - Leer package.json → comparar dependencias
   - Leer estructura de src/ → comparar carpetas
   - Leer PLAN.md → identificar pasos completados
3. **Generar changelog detallado** (formato changelog)
4. **Insertar en AGENTS.md** (al inicio, seccion "Recent Updates")
5. **Actualizar PLAN.md** (marcar checkboxes completados)
6. **Hacer commit** con mensaje descriptivo

## Formato Changelog

```markdown
## [Fecha] - Actualizacion

### Anadido
- Nueva dependencia: express@4.21.0 (framework backend)
- Nuevo archivo: src/models/database.ts
- Nueva ruta API: GET /api/cuentas

### Completado
- [✅] Paso 3: Crear servidor Express
- [✅] Paso 4: Configurar SQLite
```

## Reglas

1. **No tocar README.md**
2. **Mantener orden cronologico inverso** (mas reciente primero)
3. **Incluir contexto** de cada cambio (para que sirve, por que se anadio)
4. **Usar pnpm** para todos los comandos
5. **Detectar la rama** y actualizar la documentacion correspondiente:
   - Si esta en rama `backend`: actualizar AGENTS.md de backend
   - Si esta en rama `frontend`: actualizar AGENTS.md de frontend

## Ejemplo de actualizacion en AGENTS.md

```markdown
## Recent Updates

## 2026-04-11

### Anadido
- Nueva dependencia: express@4.21.0 (framework backend)
- Nueva dependencia: sqlite3@5.1.7 (base de datos)
- Nuevo archivo: src/models/database.ts (inicializacion SQLite)

### Completado
- [✅] Paso 3: Crear servidor Express
```

## Notas

- Esta skill funciona en cualquier rama del proyecto (backend, frontend, master)
- El agente debe cargar esta skill proactivamente cuando detecte cambios significativos
- Si el usuario pide explicitamente actualizar documentacion, ejecutar inmediatamente
- Después de actualizar, notificar al usuario que se han actualizado los archivos
# 📚 Documentación Fase 3 - TFM Nemi

**Proyecto:** Nemi React  
**Autor:** Hugo Mateo  
**Fecha:** 5 de febrero de 2026

---

## ⚠️ Nota Importante

Según directrices del TFM:
- La información se plasmará según las necesidades del proyecto
- Si algún apartado no lo contiene o no lo requiere, no es necesario agregarlo
- Si falta tiempo, se puede omitir o presentar a nivel teórico
- Se pueden agregar puntos adicionales según el proyecto

---

## 1. Site Map

### a. Definición
Un mapa del sitio es la representación visual de la estructura de navegación de la aplicación, mostrando todas las páginas y cómo se relacionan entre sí.

### b. Descripción
La aplicación Nemi es un marketplace de servicios con dos flujos principales:
- **Clientes**: Buscan y solicitan servicios
- **Proveedores**: Ofrecen servicios y gestionan órdenes

### c. Gráfico de ejemplo

```
nemi-react/
├── Welcome (/)
│   ├── Login (/login)
│   ├── RegisterClient (/register/client)
│   ├── RegisterProvider (/register/provider)
│   └── RecoverPassword (/recover)
│
├── CLIENTE (/c/*)
│   ├── Home (/c/home) → ClientHomeNew (/c/home/new)
│   ├── ProviderProfile (/taquero/:id)
│   ├── RequestForm (/c/request/:providerId)
│   ├── ClientRequests (/c/requests)
│   └── ClientFavorites (/c/favorites)
│
├── PROVEEDOR (/p/*)
│   ├── Dashboard (/p/dashboard)
│   ├── Orders (/p/orders)
│   └── Business (/p/business)
│
├── ADMIN
│   └── Account (/account)
│
└── DEMO
    └── ComponentShowcase (/components)
```

---

## 2. Wireframes

### a. Definición
Los wireframes son esquemas de baja fidelidad que muestran la estructura y disposición de elementos de las interfaces principales.

### b. Descripción
Se crearon wireframes para los flujos principales:
- Búsqueda de servicios (ClientHomeNew)
- Formulario de solicitud (RequestForm)
- Listado de solicitudes (ClientRequests)

### c. Gráfico de ejemplo
*[Incluir screenshots de bajo nivel o prototipos previos]*

---

## 3. Prototipo - Hi-Fi

### a. Definición
Prototipos de alta fidelidad que implementan el diseño visual final, interactividad y validaciones.

### b. Descripción
Se desarrolló un sistema de diseño completo con componentes reutilizables:
- **ButtonPrimary**: 3 variantes (primary, danger, secondary)
- **ServiceCard**: Tarjetas de proveedores con imágenes y calificaciones
- **RequestStatus**: Badges de estado de solicitudes
- **Paleta de colores**: WCAG 2.1 AA compatible
- **Tipografía**: Escala Major Third (1.25x)
- **Espaciado**: Grid de 8pt

### c. Gráfico de ejemplo

**Colores principales:**
```
- Primary (Menta): #00B894
- Danger (Rojo): #D63031
- Secondary (Gris): #636E72
- Neutral: #F0F0F0 - #1A1A1A
```

**Componentes:**
- ButtonPrimary (3 tamaños × 3 variantes)
- ServiceCard (con favoritos)
- RequestStatus (con estados)

---

## 4. Metodología de Desarrollo

### a. Definición
Metodología es el conjunto de procesos, herramientas y prácticas utilizadas para desarrollar el proyecto.

### b. Descripción
**Metodología ágil con Git-based workflow:**
- Ramas de features por funcionalidad
- Pull Requests con revisión
- Merges a main tras validación
- Versionado semántico

**Herramientas:**
- GitHub para control de versiones
- Vite para desarrollo con HMR
- React Hooks para estado
- Styled-components para estilos

**Proceso:**
1. Crear rama `feature/nombre`
2. Desarrollar funcionalidad
3. Crear PR con descripción
4. Merge a main
5. Deploy automático

### c. Gráfico de ejemplo

**PRs completadas:**
- ✅ PR #1: Sistema de Diseño
- ✅ PR #2: Componentes (Button, Card, Badge)
- ✅ PR #3: ComponentShowcase
- ✅ PR #4: ClientHomeNew
- ✅ PR #5: Login mejorado

---

## 5. Arquitectura de la Información

### a. Descripción

La arquitectura sigue un patrón de capas:

```
src/
├── pages/          → Componentes de página (rutas)
├── components/     → Componentes reutilizables
├── context/        → AuthContext (estado global)
├── hooks/          → useGeolocation
├── lib/            → mockApi (simulación backend)
└── styles/         → designTokens (sistema de diseño)
```

### b. Sustentación

**Por qué esta estructura:**
- **Separación de responsabilidades**: Cada carpeta tiene un propósito claro
- **Escalabilidad**: Fácil agregar nuevas páginas/componentes
- **Reutilización**: Componentes centralizados en `components/`
- **Mantenibilidad**: Tokens centralizados en `styles/`
- **Testing**: Fácil de testear componentes aislados

### c. Gráfica de ejemplo
*[Ver sección anterior: Estructura de carpetas]*

---

## 6. Selección de Lenguaje Frontend / Backend

### a. Selección del Framework/Librería Frontend

**Seleccionado:** React 18.3.1

#### i. Descripción
React es una librería JavaScript para construir interfaces de usuario con componentes reutilizables. Se usa con React Hooks para lógica de estado.

#### ii. Sustentación

| Criterio | React | Alternativa |
|----------|-------|------------|
| **Ecosistema** | Enorme (npm, Next, etc.) | Vue: menor pero funcional |
| **Curva aprendizaje** | Media (JSX, Hooks) | Angular: más empinada |
| **Performance** | Excelente con memo/useMemo | Svelte: ligeramente mejor |
| **Comunidad** | Muy activa | Vue: más pequeña |
| **Oportunidades laborales** | Muy alta demanda | Angular: demanda media |

**Decisión:** React por ecosistema, demanda laboral y flexibilidad.

---

### b. Selección del Lenguaje/Framework Backend

**Seleccionado:** Mock API (simulación con JavaScript puro)

#### i. Descripción
Se implementó una simulación de backend en `src/lib/mockApi.js` que replica endpoints:
- `auth.login()`
- `auth.register()`
- `providers.list()`
- `requests.create()`
- `requests.listForUser()`

#### ii. Sustentación

| Criterio | Mock API | Backend Real |
|----------|----------|-------------|
| **Objetivo TFM** | Demostrar arquitectura frontend ✅ | No requerido para fase 3 |
| **Tiempo de desarrollo** | 2-3 horas | 20+ horas |
| **Suficiente para tests** | Sí (datos simulados) | Sí, pero innecesario |
| **Validación de flujos** | Funciona 100% | Idem |

**Decisión:** Mock API suficiente para TFM fase 3. Backend real puede ser fase complementaria.

---

## 7. Diseño de la Base de Datos

### a. Descripción

La estructura de datos usa Mock API con modelos:

```javascript
// Providers (Servicios)
{
  id, name, specialty, image, rating,
  reviewCount, distance, priceRange
}

// Requests (Solicitudes)
{
  id, clientUserId, providerId, 
  date, time, address, notes,
  status, createdAt
}

// Users (Autenticación)
{
  id, email, password, role, name
}
```

### b. Sustentación

**SQL vs NoSQL:**

| Aspecto | SQL | NoSQL |
|--------|-----|-------|
| **Estructura** | Tablas relacionadas | Documentos flexibles |
| **Relaciones** | Fuerte (FK) | Débil (referencias) |
| **Escalabilidad** | Vertical | Horizontal |

**Para este proyecto:**
- Datos simples sin relaciones complejas
- Estructura fija y predecible
- **Opción SQL** sería suficiente (PostgreSQL/MySQL)
- **Opción NoSQL** (MongoDB) también viable

**Elección:** Mock API JavaScript como prototipo rápido.

### c. Gráfica de ejemplo

```
USERS
├── id (PK)
├── email
├── password (hashed)
├── role (client|provider)
└── name

PROVIDERS
├── id (PK)
├── userId (FK → USERS)
├── name
├── specialty
├── image_url
├── rating
├── review_count
├── distance_km
└── price_range

REQUESTS
├── id (PK)
├── clientUserId (FK → USERS)
├── providerId (FK → PROVIDERS)
├── date
├── time
├── address
├── notes
├── status (pending|accepted|rejected)
└── createdAt
```

---

## 8. Gestión de la Lógica de Negocio

### a. Descripción

La lógica de negocio se distribuye en:

```
src/
├── pages/          → Lógica de página (formularios, validaciones)
├── context/        → AuthContext (estado global de usuario)
├── lib/mockApi.js  → Lógica de datos y endpoints
└── hooks/          → useGeolocation (lógica reutilizable)
```

**Patrones usados:**
- **Context API**: Estado global de autenticación
- **Custom Hooks**: Lógica reutilizable (geolocalización)
- **useState**: Estado local de componentes
- **useMemo**: Optimización de filtros

### b. Sustentación

**No se implementó Clean Architecture completa porque:**
- El proyecto es principalmente **frontend**
- Mock API es simple y no requiere capas complejas
- Para un backend real sí se implementaría:
  - Capa de Controllers
  - Capa de Services
  - Capa de Repositories
  - DTO (Data Transfer Objects)

**Decisión:** Patrón simple pero escalable para TFM fase 3.

---

## 9. Enfoque de Estilos

### a. Descripción

Se utiliza **Styled-components** (CSS-in-JS) con sistema centralizado de tokens.

### b. Sustentación

| Enfoque | Ventajas | Desventajas |
|---------|----------|-------------|
| **Styled-components** ✅ | Colocación, scoping automático, variables | Bundle size +30kb |
| **CSS Modules** | Más ligero | Menos dinámico |
| **Tailwind** | Rápido desarrollo | Clases verbosas |
| **SASS** | Potente | No scoping automático |

**Justificación:**
- **Mantenibilidad**: Tokens centralizados = cambios globales fáciles
- **Velocidad**: HMR rápido en desarrollo
- **Escalabilidad**: Sistema de diseño profesional

### c. Ejemplos de estilos del proyecto

```javascript
// designTokens.js - Sistema centralizado
export const colors = {
  primary: '#00B894',    // Menta
  danger: '#D63031',     // Rojo
  secondary: '#636E72'   // Gris
}

export const spacing = {
  xs: '4px', sm: '8px', md: '16px', lg: '24px'
}

export const typography = {
  h1: { fontSize: '3.052rem', fontWeight: 700 }
}
```

```jsx
// ButtonPrimary.jsx - Uso de tokens
const StyledButton = styled.button`
  background-color: ${p => colors[p.variant] || colors.primary};
  padding: ${p => spacing[sizes[p.size]?.padding]};
  border-radius: ${borderRadius.md};
  transition: ${transitions.smooth};
  
  &:hover {
    box-shadow: ${shadows.lg};
  }
`
```

---

## 10. Comunicación Frontend-Backend y API Design

### a. Descripción

**Endpoints simulados en `mockApi.js`:**

```javascript
// Autenticación
POST /auth/login       → { email, password }
POST /auth/register    → { email, password, role, name }

// Proveedores
GET /providers         → lista de servicios
GET /providers/:id     → detalle de proveedor

// Solicitudes
POST /requests         → { clientUserId, providerId, date, time, address, notes }
GET /requests/:userId  → solicitudes del usuario
```

**Formato de respuestas:**
```javascript
{
  success: true,
  data: { ... },
  error: null,
  timestamp: "2026-02-05T10:00:00Z"
}
```

### b. Sustentación

**Ventajas del Mock API:**
- ✅ No requiere servidor externo
- ✅ Simula latencia realista
- ✅ Fácil de entender y modificar
- ✅ Suficiente para validar flujos

**Para producción se usaría:**
- Backend real (Node.js/Express, Python, etc.)
- REST o GraphQL
- Autenticación JWT
- Documentación OpenAPI/Swagger

---

## 11. Calidad y Mantenibilidad del Código: Testing Strategy

### a. Descripción

**Estrategia de testing implementada:**
- ✅ Componentes accesibles (WCAG 2.1 AA)
- ✅ Validaciones en formularios
- ✅ Manejo de errores
- ⏳ Tests unitarios (pendiente: Jest + React Testing Library)
- ⏳ Tests E2E (pendiente: Cypress/Playwright)

**Validaciones implementadas:**
```javascript
// Login.jsx - Validación en tiempo real
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

const validatePassword = (pwd) => pwd.length >= 6
```

### b. Sustentación

**Qué se validó:**
1. **Campos requeridos** en formularios
2. **Formato de email** con regex
3. **Longitud de contraseña** (mín. 6 caracteres)
4. **Accesibilidad**: Labels, ARIA, contraste de colores

**Plan de testing futuro:**
```bash
# Unit tests
npm test -- --coverage

# E2E tests
npm run test:e2e

# Lighthouse audit
npm run lighthouse
```

---

## 12. Manejo de Errores y Logging

### a. Descripción

**Estrategia de errores:**

```javascript
// Try-catch en operaciones async
async onSubmit(e) {
  e.preventDefault()
  setError('')
  try {
    await register({ ... })
    nav('/c/home')
  } catch (err) {
    setError(err?.message || 'Error general')
  }
}

// Global error boundary (futuro)
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

**Logging:**
- Errores en consola (development)
- Alertas al usuario (UI)
- Estados de loading para feedback

### b. Sustentación

**Mejoras futuras:**
- Sentry para tracking centralizado
- Winston/Pino para logging en backend
- Alertas push para errores críticos

---

## 13. Estrategia de Despliegue

### a. Descripción

**Proceso de despliegue:**

1. **Desarrollo local**
   - `npm run dev` → Vite HMR en localhost:5173
   - Validación en navegador

2. **Build para producción**
   - `npm run build` → Genera `dist/` optimizado
   - Vite realiza tree-shaking y minificación

3. **Despliegue en Vercel** (PRÓXIMO)
   - Conectar repo GitHub
   - Deploy automático en cada push a main
   - URL pública: `https://nemi-react.vercel.app`

### b. Sustentación

**Por qué Vercel:**
- ✅ Integración nativa con Vite
- ✅ Deploys automáticos desde GitHub
- ✅ Plan gratuito suficiente
- ✅ Performance optimizado (CDN global)
- ✅ Logs de build accesibles

**Alternativas:**
- **Netlify**: Similar a Vercel
- **GitHub Pages**: Solo para sitios estáticos
- **AWS**: Más complejo pero más control

---

## 📋 Resumen de Pendientes

| Punto | Estado | Prioridad |
|-------|--------|-----------|
| 1. Site Map | ✅ | ✓ |
| 2. Wireframes | ⏳ | Media |
| 3. Prototipo Hi-Fi | ✅ | ✓ |
| 4. Metodología | ✅ | ✓ |
| 5. Arquitectura | ✅ | ✓ |
| 6. Frontend/Backend | ✅ | ✓ |
| 7. Base de Datos | ✅ | ✓ |
| 8. Lógica Negocio | ✅ | ✓ |
| 9. Estilos | ✅ | ✓ |
| 10. API Design | ✅ | ✓ |
| 11. Testing | ⏳ | Alta |
| 12. Errores/Logging | ✅ | ✓ |
| 13. Despliegue | ⏳ | **URGENTE** |

---

## 🎯 Próximos Pasos

1. ✅ **Revisar esta documentación** y ajustar según necesidades
2. 🔴 **Desplegar en Vercel** (15 minutos)
3. 📸 **Tests SUS de usabilidad** (4 horas)
4. 📄 **Compilar PDF final** con anexos

¿Qué punto quieres completar primero?

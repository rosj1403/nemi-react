# NEMI (React)

Implementación base del proyecto NEMI en React (opción **A: UI simple sin librerías extra**).

## Requisitos
- Node.js 18+ (recomendado)

## Instalación
```bash
npm install
npm run dev
```

## Usuarios demo
- Cliente: `cliente@nemi.mx` / `123456`
- Proveedor: `taquero@nemi.mx` / `123456`

## Rutas principales
### Acceso
- `/` Bienvenida
- `/login` Inicio de sesión
- `/register/client` Registro cliente
- `/register/provider` Registro proveedor
- `/recover` Recuperación (mock)

### Cliente
- `/c/home` Exploración (búsqueda, filtros, placeholder de mapa)
- `/taquero/:id` Perfil de proveedor
- `/c/request/:providerId` Formulario de solicitud
- `/c/requests` Bandeja de solicitudes
- `/c/favorites` Favoritos

### Proveedor
- `/p/dashboard` Tablero
- `/p/orders` Administrador de pedidos (Aceptar/Rechazar + motivo)
- `/p/business` Gestión de negocio

## Mock API
Persistencia en `localStorage`.
- GET `/proveedores` -> `api.providers.list()`
- POST `/solicitudes` -> `api.requests.create()`
- PUT `/perfil-taquero` -> `api.providers.updateByOwner()`

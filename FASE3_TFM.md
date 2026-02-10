# Fase 3 — Proceso de desarrollo (TFM)

> Documento base para completar la entrega de la Fase 3.  
> **Proyecto:** Nemi React  
> **Autor:** Hugo Mateo  
> **Fecha:** 31 de enero de 2026

---

## 3.1 Inicio del proceso de desarrollo. Control de versiones

**Herramienta usada:** Git + GitHub

**Descripción breve:**
Se utilizó Git para el control de versiones con un flujo profesional basado en ramas de feature y pull requests. Esto permitió desarrollar componentes sin afectar la rama principal, facilitar revisiones y mantener un historial de cambios claro.

**Evidencias sugeridas:**
- Capturas de PRs y ramas en GitHub.
- Ejemplo de commits descriptivos.

**Texto ejemplo:**
> El proyecto se gestionó con Git y GitHub. Cada funcionalidad se desarrolló en una rama independiente y se integró mediante PRs, lo que permitió control de cambios y colaboración segura.

---

## 3.2 Gestión de dependencias

**Herramienta usada:** npm

**Descripción breve:**
La aplicación utiliza npm como gestor de dependencias. Todas las librerías se declaran en `package.json` para asegurar consistencia entre entornos.

**Dependencias clave:**
- React 18
- Vite
- React Router DOM
- Styled-components

**Evidencias sugeridas:**
- Captura del archivo `package.json`.
- Captura de ejecución `npm install`.

---

## 3.3 Desarrollo responsive

**Descripción breve:**
Se aplicó enfoque mobile-first con breakpoints definidos. Se usaron CSS Grid y Flexbox para garantizar adaptación en dispositivos móviles y desktop.

**Evidencias sugeridas:**
- Captura desktop y mobile de `/components`.
- Captura desktop y mobile de `/c/home/new`.

**Texto ejemplo:**
> La interfaz se diseñó con enfoque mobile-first. Se validó su comportamiento en resoluciones de 375px y 1280px usando Grid/Flex, garantizando correcta adaptación.

---

## 3.4 Desarrollo de componentes funcionales con ReactJS

**Componentes reales implementados:**
- `ButtonPrimary`
- `ServiceCard`
- `RequestStatus`

**Descripción breve:**
Se desarrollaron componentes funcionales reutilizables utilizando JSX y props, siguiendo el sistema de diseño definido.

**Evidencias sugeridas:**
- Capturas de ComponentShowcase.
- Extractos de código de cada componente.

---

## 3.5 Hooks con ReactJS

**Hooks utilizados:**
- `useState`
- `useMemo`
- `useContext`

**Ejemplos en el proyecto:**
- Login mejorado: validaciones con `useState`
- ClientHomeNew: filtros con `useMemo`
- AuthContext: login con `useContext`

**Texto ejemplo:**
> Se emplearon hooks para manejar estado, optimizar filtrados y compartir contexto global de autenticación.

---

## 3.6 Navegabilidad con React Router DOM

**Descripción breve:**
Se configuraron rutas públicas y protegidas con React Router DOM. Se implementó navegación dinámica y redirecciones por rol.

**Evidencias sugeridas:**
- Captura del archivo `src/App.jsx`.
- Tabla de rutas principales.

**Rutas clave:**
- `/components` → Showcase
- `/login` → Login
- `/c/home/new` → Home cliente
- `/p/dashboard` → Dashboard proveedor

---

## 3.7 Simulación del Back-End

**Descripción breve:**
Se utilizó un mock local (`mockApi.js`) y datos simulados en pantallas para representar proveedores y solicitudes.

**Evidencias sugeridas:**
- Captura del archivo `mockApi.js`.
- Captura de datos mock en ClientHomeNew.

---

## 3.8 Despliegue público

**Estado actual:** Pendiente

**Plan sugerido:**
- Desplegar en Vercel o Netlify.
- Incluir enlace público en el documento final.

**Evidencias sugeridas:**
- Captura del panel de Vercel/Netlify.
- URL del despliegue.

---

## 3.9 Test de usabilidad

**Estado actual:** Pendiente

**Plan sugerido:**
- Realizar test con 3–5 usuarios.
- Aplicar encuesta SUS.
- Incluir tabla de resultados y conclusiones.

**Evidencias sugeridas:**
- Capturas de encuesta.
- Tabla de resultados (SUS).

---

# ✅ Conclusión de Fase 3 (borrador)

Durante esta fase se estableció el proceso de desarrollo con Git, npm y React. Se implementaron componentes funcionales reutilizables, se validó el diseño responsive y se estructuró la navegación con React Router. Además, se inició la simulación de datos y se dejaron preparados los pasos para despliegue público y pruebas de usabilidad.

---

# 📎 Anexos sugeridos

- Capturas de ComponentShowcase
- Capturas de ClientHomeNew (desktop + mobile)
- Captura de Login mejorado
- Capturas de PRs en GitHub

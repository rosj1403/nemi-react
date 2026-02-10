# 📦 Paquete de Evidencias — Fase 3 TFM

**Proyecto:** Nemi React  
**Fecha:** 31 de enero de 2026  
**Estado:** Checklist de recopilación

---

## ✅ Evidencias por Sección

### **3.1 Control de versiones (Git + GitHub)**

| Evidencia | Formato | Estado | Notas |
|-----------|---------|--------|-------|
| PR #1: Sistema de Diseño | Captura + enlace | ✅ | https://github.com/rosj1403/nemi-react/pull/1 |
| PR #2: Componentes | Captura + enlace | ✅ | https://github.com/rosj1403/nemi-react/pull/2 |
| PR #3: ComponentShowcase | Captura + enlace | ✅ | https://github.com/rosj1403/nemi-react/pull/3 |
| PR #4: ClientHomeNew | Captura + enlace | ✅ | https://github.com/rosj1403/nemi-react/pull/4 |
| PR #5: Login mejorado | Captura + enlace | ✅ | https://github.com/rosj1403/nemi-react/pull/5 |
| Tabla de commits | `git log --oneline` | ⏳ | Ejecutar en terminal |
| Árbol de ramas | Captura de GitHub | ⏳ | Ir a "Insights > Network" |

---

### **3.2 Gestión de dependencias (npm)**

| Evidencia | Formato | Estado | Ubicación |
|-----------|---------|--------|-----------|
| package.json | Captura + archivo | ⏳ | `/package.json` |
| Instalación npm | Captura terminal | ⏳ | `npm install` output |
| Versiones clave | Tabla markdown | ⏳ | De package.json |

---

### **3.3 Desarrollo responsive**

| Evidencia | Formato | Estado | URL |
|-----------|---------|--------|-----|
| ComponentShowcase desktop | PNG (1280px) | ✅ | `01_components_showcase.png` |
| ComponentShowcase mobile | PNG (375px) | ⏳ | Necesita captura |
| ClientHomeNew desktop | PNG (1280px) | ✅ | `03_client_home_desktop.png` |
| ClientHomeNew mobile | PNG (375px) | ✅ | `06_client_home_mobile.png` |
| Colores palette | PNG (section) | ✅ | `02_colors_palette.png` |
| Tabla de breakpoints | Markdown | ⏳ | Crear tabla |

---

### **3.4 Componentes funcionales**

| Evidencia | Formato | Estado | Archivo |
|-----------|---------|--------|---------|
| ButtonPrimary código | Captura + archivo | ⏳ | `src/components/buttons/ButtonPrimary.jsx` |
| ServiceCard código | Captura + archivo | ⏳ | `src/components/cards/ServiceCard.jsx` |
| RequestStatus código | Captura + archivo | ⏳ | `src/components/badges/RequestStatus.jsx` |
| Showcase visual | PNG múltiples | ✅ | `01_components_showcase.png` |
| Props table | Markdown | ⏳ | Crear tablas de props |

---

### **3.5 Hooks en React**

| Evidencia | Formato | Estado | Ejemplo |
|-----------|---------|--------|---------|
| useState en Login | Captura código | ⏳ | `src/pages/auth/Login.jsx` L20-40 |
| useMemo en ClientHomeNew | Captura código | ⏳ | `src/pages/client/ClientHomeNew.jsx` L100-115 |
| useContext en AuthContext | Captura código | ⏳ | `src/context/AuthContext.jsx` |
| Explicación teórica | Markdown | ⏳ | Copiar de IMPLEMENTATION_DETAILS.md |

---

### **3.6 React Router DOM**

| Evidencia | Formato | Estado | Ubicación |
|-----------|---------|--------|-----------|
| App.jsx código | Captura + archivo | ⏳ | `src/App.jsx` |
| Tabla de rutas | Markdown | ✅ | En FASE3_TFM.md |
| ProtectedRoute | Captura código | ⏳ | `src/components/ProtectedRoute.jsx` |
| Diagrama de navegación | SVG o imagen | ⏳ | Crear mapa visual |

---

### **3.7 Simulación Backend**

| Evidencia | Formato | Estado | Ubicación |
|-----------|---------|--------|-----------|
| mockApi.js código | Captura + archivo | ⏳ | `src/lib/mockApi.js` |
| Mock data en ClientHomeNew | PNG captura | ✅ | `03_client_home_desktop.png` |
| Estructura de respuestas | Tabla JSON | ⏳ | Documentar endpoints |

---

### **3.8 Despliegue público**

| Evidencia | Formato | Estado | Notas |
|-----------|---------|--------|-------|
| Vercel/Netlify deploy | URL + captura | ⏳ | **PENDIENTE: Hacer deploy** |
| Panel de deployment | Captura | ⏳ | Después del deploy |
| Logs de build | Captura | ⏳ | Después del deploy |

**Action:** Desplegar ahora en Vercel.

---

### **3.9 Test de usabilidad**

| Evidencia | Formato | Estado | Notas |
|-----------|---------|--------|-------|
| Encuesta SUS | Google Forms/PDF | ⏳ | **PENDIENTE: Crear encuesta** |
| Resultados SUS | Tabla + gráfico | ⏳ | Después de tests |
| Notas de usuarios | Documento | ⏳ | Recopilar feedback |

**Action:** Realizar con 3-5 usuarios después del deploy.

---

## 📊 Resumen de Estado

| Sección | Completado | Pendiente |
|---------|-----------|----------|
| 3.1 Git/GitHub | 80% | Links + screenshots finales |
| 3.2 npm | 50% | Captura de install |
| 3.3 Responsive | 80% | ComponentShowcase mobile |
| 3.4 Componentes | 50% | Código + props |
| 3.5 Hooks | 30% | Capturas de código |
| 3.6 Router | 60% | Diagrama navegación |
| 3.7 Backend | 50% | Documentación endpoints |
| 3.8 Deploy | 0% | **URGENTE** |
| 3.9 Testing | 0% | **URGENTE** |

**Total:** 40% completado

---

## 🎯 Plan de Acción Inmediato

### **HOY:**
1. ✅ Recopilar capturas GitHub (PRs, commits)
2. ✅ Captura package.json
3. ✅ Captura App.jsx
4. ⏳ Captura ComponentShowcase mobile (solo falta)
5. ⏳ Crear tabla de props para componentes

### **ESTA SEMANA:**
6. 🔴 **Desplegar en Vercel** (2-3 horas)
7. 🔴 **Crear encuesta SUS + tests** (4-5 horas)
8. ✅ Recopilar código snippets

### **ANTES DE ENTREGAR:**
9. ✅ Compilar todo en PDF con anexos
10. ✅ Validar que todas las referencias están vivas

---

## 📁 Estructura de carpetas recomendada

```
TFM_EVIDENCIAS/
├── 3.1_control_versiones/
│   ├── pr1_design_system.png
│   ├── pr2_components.png
│   ├── pr3_showcase.png
│   ├── pr4_clienthome.png
│   ├── pr5_login.png
│   └── git_log.txt
│
├── 3.2_dependencias/
│   ├── package.json
│   └── npm_install.png
│
├── 3.3_responsive/
│   ├── 01_components_showcase.png
│   ├── 02_colors_palette.png
│   ├── 03_client_home_desktop.png
│   ├── 06_client_home_mobile.png
│   └── breakpoints_table.md
│
├── 3.4_componentes/
│   ├── ButtonPrimary.jsx
│   ├── ServiceCard.jsx
│   ├── RequestStatus.jsx
│   └── props_documentation.md
│
├── 3.5_hooks/
│   ├── useState_example.png
│   ├── useMemo_example.png
│   └── useContext_example.png
│
├── 3.6_router/
│   ├── App.jsx
│   ├── ProtectedRoute.jsx
│   ├── rutas_tabla.md
│   └── navigation_diagram.png
│
├── 3.7_backend/
│   ├── mockApi.js
│   └── endpoints_documentation.md
│
├── 3.8_deploy/
│   ├── vercel_panel.png
│   └── deployment_url.txt
│
├── 3.9_testing/
│   ├── encuesta_sus.pdf
│   ├── resultados_tabla.md
│   └── feedback_usuarios.txt
│
└── RESUMEN_EVIDENCIAS.md
```

---

## 🚀 Próximos pasos

1. **Ejecuta estos comandos** para generar evidencias:

```bash
# Git log bonito
git log --oneline --graph --all > git_history.txt

# Screenshot package.json
# Screenshot App.jsx
# Screenshot ProtectedRoute.jsx
```

2. **Descarga las capturas que ya tomaste** y renómbralas según la estructura.

3. **Crea tabla de props** en markdown para cada componente.

4. **Deploy en Vercel** (20 minutos máximo).

5. **Encuesta SUS** con usuarios (2 horas).

¿Por dónde empezamos? ¿Primero el deploy (3.8) o las capturas de código (3.4-3.6)?

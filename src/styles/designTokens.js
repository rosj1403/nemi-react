/**
 * Design Tokens - NEMI
 * Sistema de diseño centralizado basado en el documento de especificaciones
 * Colores, tipografía, espaciado y otros valores de diseño
 */

// ============================================================================
// COLORES - Paleta de Nemi
// ============================================================================

export const colors = {
  // Colores Primarios
  primary: {
    menta: '#00B894', // Verde - Identidad principal
    darkGray: '#2D3436', // Gris oscuro - Textos principales
  },

  // Colores Secundarios
  secondary: {
    red: '#D63031', // Rojo - Botones de acción (CTA)
    yellow: '#FFD54F', // Amarillo - Resaltados y ofertas
    neutralGray: '#4F4F4F', // Gris neutro - Navegación secundaria
    lightGray: '#F5F5F5', // Gris claro - Fondos
  },

  // Colores Semánticos (Feedback)
  semantic: {
    success: '#55EFC4', // Verde esmeralda - Éxito
    error: '#D63031', // Rojo - Errores
    info: '#74B9FF', // Azul - Información
  },

  // Colores auxiliares
  text: {
    primary: '#2D3436', // Texto principal
    secondary: '#4F4F4F', // Texto secundario
    disabled: '#BDC3C7', // Texto deshabilitado
  },

  background: {
    default: '#FFFFFF',
    light: '#F5F5F5',
  },

  border: '#E0E0E0',
};

// ============================================================================
// TIPOGRAFÍA - Escala Modular (Major Third 1.25)
// Base: 16px
// ============================================================================

export const typography = {
  // Familias
  families: {
    display: "'Poppins', sans-serif", // Encabezados y logo
    body: "'Inter', sans-serif", // Cuerpo y textos
  },

  // Escala modular: 16px × 1.25^n
  sizes: {
    h1: '39px', // 16 × 1.25^4
    h2: '31px', // 16 × 1.25^3
    h3: '25px', // 16 × 1.25^2
    body1: '20px', // 16 × 1.25^1
    body2: '16px', // Base
    caption: '13px', // 16 × 1.25^-1
  },

  // Pesos tipográficos
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line Heights (para accesibilidad)
  lineHeights: {
    h1: '1.2', // 47px para 39px
    h2: '1.2', // 37px para 31px
    h3: '1.3', // 32px para 25px
    body1: '1.5', // 30px para 20px
    body2: '1.5', // 24px para 16px
    caption: '1.4', // 18px para 13px
  },

  // Letter spacing
  letterSpacing: {
    h1: '-0.02em',
    h2: '-0.01em',
    h3: '0em',
    body: '0.01em',
    caption: '0.02em',
  },

  // Estilos tipográficos predefinidos
  styles: {
    h1: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '39px',
      fontWeight: 700,
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '31px',
      fontWeight: 600,
      lineHeight: '1.2',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '25px',
      fontWeight: 500,
      lineHeight: '1.3',
      letterSpacing: '0em',
    },
    body1: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: '1.5',
      letterSpacing: '0.01em',
    },
    body2: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '1.5',
      letterSpacing: '0.01em',
    },
    caption: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '13px',
      fontWeight: 400,
      lineHeight: '1.4',
      letterSpacing: '0.02em',
    },
    button: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: 'auto',
      letterSpacing: '0.05em',
    },
  },
};

// ============================================================================
// ESPACIADO - Sistema de 8pt
// ============================================================================

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '40px',
  // Para márgenes/paddings específicos
  contentPaddingMobile: '16px',
  contentPaddingTablet: '24px',
  contentPaddingDesktop: '32px',
  gutterMobile: '8px',
  gutterTablet: '16px',
  gutterDesktop: '24px',
};

// ============================================================================
// BREAKPOINTS - Responsive Design (Mobile First)
// ============================================================================

export const breakpoints = {
  mobile: '0px',
  mobileLarge: '600px',
  tablet: '600px',
  desktop: '1024px',
  wide: '1440px',
};

// ============================================================================
// SOMBRAS
// ============================================================================

export const shadows = {
  none: 'none',
  sm: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  md: '0px 4px 8px rgba(0, 0, 0, 0.12)',
  lg: '0px 8px 16px rgba(0, 0, 0, 0.15)',
  xl: '0px 12px 24px rgba(0, 0, 0, 0.18)',
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  round: '50%',
};

// ============================================================================
// TRANSICIONES
// ============================================================================

export const transitions = {
  fast: '150ms ease-in-out',
  normal: '250ms ease-in-out',
  slow: '350ms ease-in-out',
};

// ============================================================================
// ICONOGRAFÍA
// ============================================================================

export const iconSizes = {
  // Iconos principales (navegación)
  primary: {
    container: '48px',
    icon: '24px',
  },
  // Iconos secundarios (funciones)
  secondary: {
    container: '40px',
    icon: '20px',
  },
  // Iconos informativos
  info: {
    container: '20px',
    icon: '16px',
  },
};

// ============================================================================
// Z-INDEX (Capas)
// ============================================================================

export const zIndex = {
  base: 1,
  dropdown: 100,
  sticky: 200,
  modal: 300,
  tooltip: 400,
  notification: 500,
};

// ============================================================================
// CONTRASTES WCAG 2.1 (Validación)
// ============================================================================

export const wcagContrast = {
  primary: {
    menta: '5.1:1', // AA
    darkGray: '12.6:1', // AAA
  },
  secondary: {
    red: '4.8:1', // AA
    yellow: '8.9:1', // AA
    neutralGray: '3.2:1', // AA (Gráficos)
    lightGray: '19.2:1', // AA
  },
  semantic: {
    success: '4.5:1', // AA
    error: '4.8:1', // AA
    info: '4.6:1', // AA
  },
};

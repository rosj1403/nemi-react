import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --nemi-mint: #00B894;
    --nemi-dark: #2D3436;
    --nemi-bg: #F5F5F5;
    --nemi-danger: #D63031;
    --nemi-info: #74B9FF;
    --nemi-warn: #FFD54F;
    --radius: 14px;
    --shadow: 0 8px 24px rgba(0,0,0,0.08);
  }

  * { box-sizing: border-box; }
  html, body { height: 100%; }
  body {
    margin: 0;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
    color: var(--nemi-dark);
    background: var(--nemi-bg);
  }

  a { color: inherit; text-decoration: none; }
  button, input, textarea { font: inherit; }

  /* Accesibilidad: foco visible */
  :focus-visible {
    outline: 3px solid var(--nemi-info);
    outline-offset: 2px;
  }

  /* Preferencia de reducción de movimiento */
  @media (prefers-reduced-motion: reduce) {
    * { scroll-behavior: auto !important; transition: none !important; animation: none !important; }
  }
`

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { palette } from './theme.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

const body = document.getElementsByTagName('body')[0];
body.style.backgroundColor = palette.almostWhite;
body.style.color = palette.dark.dark1;
body.style.fontFamily = `'Courier New', monospace`;

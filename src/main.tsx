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
body.style.backgroundColor = palette.dark.dark1;
body.style.color = palette.light.light3;
body.style.fontFamily = `'Courier New', monospace`;

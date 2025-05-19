// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './sass/app.sass';

createRoot(document.getElementById('root')!).render(
  <App />
)

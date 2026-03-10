import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {AuthProvider} from "./context/AuthContext.tsx";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
          <div className="bg-harvest min-w-screen mx-auto pt-12 px-4 sm:px-6 w-full max-w-[100vw] overflow-x-hidden overscroll-x-none touch-pan-y">
              <App />
          </div>
    </AuthProvider>
  </StrictMode>,
)
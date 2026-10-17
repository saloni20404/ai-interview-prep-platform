import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./style.scss"

// Sanitise localStorage on every page load — clear any corrupted token from old deployments
// A valid JWT is exactly 3 base64 segments separated by dots (no spaces)
const storedToken = localStorage.getItem("token");
if (storedToken && (storedToken.includes(" ") || storedToken.split(".").length !== 3)) {
    console.warn("Invalid token cleared from localStorage on startup.");
    localStorage.removeItem("token");
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

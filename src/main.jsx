import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ItemProvider } from './Context/ItemContext.jsx'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ItemProvider>
      <App />
    </ItemProvider>
  </StrictMode>
)

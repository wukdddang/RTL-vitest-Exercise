import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import { server } from './mocks/server.ts'

server.listen()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

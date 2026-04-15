import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * Ponto de entrada do app React.
 * - Carrega estilos globais (`index.css`)
 * - Monta o componente `App` dentro do elemento `#app` do `index.html`
 * - `StrictMode` ajuda a detectar efeitos colaterais durante o desenvolvimento
 */
ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


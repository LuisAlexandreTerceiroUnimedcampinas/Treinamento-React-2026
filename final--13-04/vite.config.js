import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Evita erro EPERM ao tentar limpar `dist/` em ambientes Windows restritos.
    // O build passa a sobrescrever arquivos existentes quando possível.
    emptyOutDir: false,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    // Em alguns ambientes Windows (ex.: políticas corporativas),
    // processos "fork" podem falhar com `spawn EPERM`.
    // Usar `threads` evita criar novos processos.
    pool: 'threads',
  },
})

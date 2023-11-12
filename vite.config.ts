import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    conditions: ['browser', 'module', 'import'],
  },
  plugins: [react()],
})

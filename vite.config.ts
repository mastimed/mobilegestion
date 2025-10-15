import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Remplacez <NOM_DU_DEPOT> par le nom de votre dépôt GitHub
  base: '/mobilegestion/', 
})

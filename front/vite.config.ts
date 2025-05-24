import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
/*export default defineConfig({
  plugins: [react()],
})
*/

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/usuarios-disponibles': 'http://localhost:4000',
      '/chats-usuario': 'http://localhost:4000',
      '/crear-chat': 'http://localhost:4000',
      '/register': 'http://localhost:4000',
'/mensajes-chat': 'http://localhost:4000',
      '/enviar-mensaje': 'http://localhost:4000'

    },
  },
});
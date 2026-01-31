import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(), 
  ],
   server: {
      proxy: {
        "^/ims/.*": {
          target: "https://emsbackend-prfw.onrender.com/",
          changeOrigin: true,
          rewrite: path => path.replace(/^\/ims/, "")
        }
      }
    }
 

})

    // target: "http://127.0.0.1:8000",

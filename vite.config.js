import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig({ 
  base: './',
  plugins: [tailwindcss(), svelte()],
  test: {
    environment: 'jsdom',
  },
  build: {
  rollupOptions: {
    input: 'index.html'
  }
}
});
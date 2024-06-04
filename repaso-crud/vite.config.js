import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                login: 'index.html',
                register: './src/auth/register.html',
                dashboard: './src/pages/dashboard.html'
            },
        },
    },
});
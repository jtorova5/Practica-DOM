import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                login: 'index.html',
                register: './src/auth/register.html',
                login: './src/pages/login.html',
                dashboard: './src/pages/dashboard.html'
            },
        },
    },
})
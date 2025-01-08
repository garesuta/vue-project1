import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
    // Load environment variables based on the current mode (e.g., development or production)
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [vue()],
        server: {
            proxy: {
                '/api': {
                    target: env.VITE_API_HOST, // Use the loaded environment variable
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
    };
});


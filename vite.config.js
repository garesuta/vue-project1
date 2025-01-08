import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [vue()],
        build: {
            outDir: 'dist',
        },
        server: {
            proxy: mode === 'development' ? {
                '/api': {
                    target: env.VITE_API_HOST,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            } : undefined,
        },
    };
});



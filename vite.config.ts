import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
    base: '/traffic-rules-frontend/',
    cacheDir: './node_modules/vite',
    define: {
        'import.meta.env.VITE_ENDPOINT_API': JSON.stringify(process.env.VITE_ENDPOINT_API || ''),
    },
    plugins: [
        svgLoader(), 
        vue(),
        tailwindcss(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],

    server: {
        host: true,
        port: 5174,
        fs: {
            strict: false,
        },
       
    },
    resolve: {
        extensions: ['.ts', '.vue'],
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@business': path.resolve(__dirname, './src/business'),
            '@infrastructure': path.resolve(__dirname, './src/infrastructure'),
            '@repository': path.resolve(__dirname, './src/infrastructure/domain/repository'),
            '@service': path.resolve(__dirname, './src/infrastructure/domain/service'),
            '@/modules': path.resolve(__dirname, './src/modules'),
            '@assets': path.resolve(__dirname, './src/assets'),
            icons: path.resolve(__dirname, 'node_modules/vue-material-design-icons'),
        },
    },
});

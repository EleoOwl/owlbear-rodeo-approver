import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { resolve } from "path";

declare var __dirname: string;

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        cors: {
            origin: "https://www.owlbear.rodeo",
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                popover: resolve(__dirname, "popover.html"),
                background: resolve(__dirname, "background.html"),
            },
        },
    },
})
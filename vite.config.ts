import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => ({
    plugins: [react()],
    clearScreen: false,
    server: {
        port: 1420,
        strictPort: true,
        watch: {
            ignored: ["**/src-tauri/**"]
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@lib": path.resolve(__dirname, "./src/lib"),
            "@backend": path.resolve(__dirname, "./src/backend"),
            "@context": path.resolve(__dirname, "./src/context"),
            "@components": path.resolve(__dirname, "./src/components"),
        }
    }
}));

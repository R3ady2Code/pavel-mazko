import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        postcss: {
            plugins: [
                require("autoprefixer")({
                    overrideBrowserslist: ["> 1%", "last 2 versions", "not dead"]
                })
            ]
        }
    }
});

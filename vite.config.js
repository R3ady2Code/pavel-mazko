import { defineConfig } from "vite";
import autoprefixer from "autoprefixer";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        postcss: {
            plugins: [
                autoprefixer({
                    overrideBrowserslist: ["> 1%", "last 2 versions", "not dead"]
                })
            ]
        }
    }
    // build: {
    //     rollupOptions: {
    //         external: ["react"]
    //     }
    // }
});

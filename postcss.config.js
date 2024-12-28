// postcss.config.js
export default {
    plugins: [
        require("autoprefixer")({
            // Настройки Autoprefixer (опционально)
            overrideBrowserslist: ["> 1%", "last 2 versions", "not dead"]
        })
    ]
};

// postcss.config.js
import autoprefixer from "autoprefixer";

export default {
    plugins: [
        autoprefixer({
            overrideBrowserslist: ["> 1%", "last 2 versions", "not dead"]
        })
    ]
};

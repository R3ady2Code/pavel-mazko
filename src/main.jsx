import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

import App from "./App.jsx";

import "./styles/index.scss";
import "./styles/styles.scss";
import "./styles/font.scss";
import "swiper/css";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from './router/index.js'
import "fomantic-ui-css/semantic.css";

createApp(App).use(router).mount('#app')

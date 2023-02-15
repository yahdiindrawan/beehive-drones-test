import { createApp } from "vue";
import { createPinia } from "pinia";
import { routes } from "./routers/index.js";
import { createRouter, createWebHistory } from "vue-router";
import ApiService from "./services/api.service.js";
import { StorageService } from "./services/storage.service.js";
import vClickOutside from "click-outside-vue3";
import "./style.css";
import App from "./App.vue";

ApiService.init(import.meta.env.VITE_APP_API_URL);
if (StorageService.getToken()) {
  ApiService.setHeader();
}

const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.baseUrlStorage =
  import.meta.env.VITE_APP_API_URL + import.meta.env.VITE_APP_STORAGE_PATH;

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !StorageService.getToken()) {
    next("/login");
  } else {
    next();
  }
});

app.use(router);
app.use(pinia);
app.use(vClickOutside);

app.mount("#app");

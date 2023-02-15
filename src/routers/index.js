import Login from "@/views/Login.vue";

// Admin
import Admin from "./admin";

export const routes = [
  {
    path: "/login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  // {
  //   path: "/:path(.*)",
  //   component: NotFound,
  // },
  ...Admin,
];

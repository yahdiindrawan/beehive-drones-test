import Layout from "@/layouts/admin.vue";

import Dashboard from "@/views/admin/dashboard/Index.vue";
import Positions from "@/views/admin/positions/Index.vue";

export default [
  {
    path: "/admin/",
    component: Layout,
    meta: {
      auth: true,
    },
    children: [
      {
        path: "",
        component: Dashboard,
      },
      {
        path: "positions",
        component: Positions,
      },
    ],
  },
];

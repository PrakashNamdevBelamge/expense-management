import ExpenseFormComponent from "@/components/ExpenseFormComponent.vue";
import ExpenseListComponent from "@/components/ExpenseListComponent.vue";
import ExpenseMain from "@/components/ExpenseMain.vue";
import ReportComponent from "@/components/ReportComponent.vue";
import ForgotPassword from "@/components/ForgotPassword.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import NewUser from "@/components/NewUser.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginComponent,
    },
    {
      path: "/newuser",
      name: "newuser",
      component: NewUser,
    },
    {
      path: "/forgotpassword",
      name: "forgotpassword",
      component: ForgotPassword,
    },
    {
      path: "/expenses",
      name: "home",
      component: ExpenseMain,

      children: [
        {
          path: "",
          name: "list",
          component: ExpenseListComponent,
        },
        {
          path: "create",
          name: "create",
          component: ExpenseFormComponent,
        },
        {
          path: "edit/:id",
          name: "edit",
          component: ExpenseFormComponent,
        },
        {
          path: "reports",
          name: "reports",
          component: ReportComponent,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      redirect: "/login",
    },
  ],
});
router.beforeEach((to, from, next) => {
  const authStore = localStorage.getItem("userData") ? true : false;
  const publicPaths = ["/login", "/newuser", "/forgotpassword"];

  if (!publicPaths.includes(to.path) && !authStore) {
    next("/login");
  } else {
    next();
  }
});
export default router;

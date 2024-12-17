import ExpenseCreate from "@/components/ExpenseCreate.vue";
import ExpenseList from "@/components/ExpenseList.vue";
import ExpenseMain from "@/components/ExpenseMain.vue";
import ExpenseReports from "@/components/ExpenseReports.vue";
import ForgotPassword from "@/components/ForgotPassword.vue";
import Login from "@/components/Login.vue";
import NewUser from "@/components/NewUser.vue";
import { createRouter, createWebHistory } from "vue-router";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,

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
          component: ExpenseList,
        },
        {
          path: "create",
          name: "create",
          component: ExpenseCreate,
        },
        {
          path: "edit/:id",
          name: "edit",
          component: ExpenseCreate,
        },
        {
          path: "reports",
          name: "reports",
          component: ExpenseReports,
        },
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      redirect: "/login",
    },
  ],
});
router.beforeEach((to, from, next) => {
  const authStore = localStorage.getItem('userData') ? true : false;
  const publicPaths = ["/login", "/newuser", "/forgotpassword"];

  if (!publicPaths.includes(to.path) && !authStore) {
    next("/login");
  } else {
    next();
  }
});
export default router;

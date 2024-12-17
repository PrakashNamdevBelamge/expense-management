import ExpenseCreate from "@/components/ExpenseCreate.vue";
import ExpenseMain from "@/components/ExpenseMain.vue";
import ExpenseReports from "@/components/ExpenseReports.vue";
import ForgotPassword from "@/components/ForgotPassword.vue";
import Login from "@/components/Login.vue";
import NewUser from "@/components/NewUser.vue";
import { createRouter, createWebHistory } from "vue-router";

function isLoggedIn() {
  const userStore = localStorage.getItem('userData');
  console.log(userStore);
   if(userStore) return false
   return true;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    //   beforeEnter: (to, from, next) => {
    //     if (isLoggedIn()) {
    //         next({ path: "/login" });
    //     } else {
    //         next({ path: "/expenses" });
    //     }
    // }
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
    },
    
    {
      path: "/expenses/create",
      name: "create",
      component: ExpenseCreate,
    },
    {
      path: "/expenses/edit/:id",
      name: "edit",
      component: ExpenseCreate,
    },
    {
      path: "/expenses/reports",
      name: "reports",
      component: ExpenseReports,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      redirect: "/login",
    },
  ],
});

export default router;

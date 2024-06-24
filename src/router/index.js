import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import HomePage from "../pages/HomePage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import store from "../store"
import { IS_AUTHENTICATED_GETTER } from "../store/constant";

// Router
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/auth/login",
            name: "login",
            component: LoginPage,
            meta: {
                auth: false
            }
        },
        {
            path: "/auth/register",
            name: "register",
            component: RegisterPage,
            meta: {
                auth: false
            }
        },
        {
            path: "/home",
            name: "home",
            component: HomePage,
            meta: {
                auth: true
            }
        }
    ]
})

// Guard navigation routes by checking authentication
router.beforeEach((to, from, next) => {
    // If user wants to go to protected routes while not authenticated, redirect to login page
    if ('auth' in to.meta && to.meta.auth && !store.getters[`auth/${IS_AUTHENTICATED_GETTER}`]) {
        next("/auth/login")
    }
    // If user wants to go to login/register page while authenticated, redirect to home page
    else if ('auth' in to.meta && !to.meta.auth && store.getters[`auth/${IS_AUTHENTICATED_GETTER}`]) {
        next("/home")
    }
    else {
        next()
    }
})

export default router
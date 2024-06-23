import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import HomePage from "../pages/HomePage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import store from "../store"
import { IS_AUTHENTICATED_GETTER } from "../store/constant";

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

router.beforeEach((to, from, next) => {
    if ('auth' in to.meta && to.meta.auth && !store.getters[`auth/${IS_AUTHENTICATED_GETTER}`]) {
        next("/auth/login")
    }
    else if ('auth' in to.meta && !to.meta.auth && store.getters[`auth/${IS_AUTHENTICATED_GETTER}`]) {
        next("/home")
    }
    else {
        next()
    }
})

export default router
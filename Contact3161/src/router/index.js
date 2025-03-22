import { createRouter, createWebHistory } from "vue-router";

import ContactsView from "../views/ContactsView.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";

const routerHistory = createWebHistory();

const routes = [
    {
        path: "/contacts",
        name: "contacts",
        component: ContactsView,
        meta: { requiresAuth: true },
    },
    {
        path: "/SignIn",
        name: "SignIn",
        component: SignIn,
    },
    {
        path: "/SignUp",
        name: "SignUp",
        component: SignUp
    },
    {
        path: "/",
        redirect: "/SignIn",
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/SignIn",
    },
];
const router = createRouter({
    history: routerHistory,
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("token");
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next({ name: "SignIn" });
        } else {
            next();
        }
    } else {
        next();
    }
})

export default router;

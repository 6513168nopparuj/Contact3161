import { createRouter, createWebHistory } from "vue-router";

import ContactsView from "../views/ContactsView.vue";
import SignIn from "../views/SignIn.vue";

const routerHistory = createWebHistory();

const routes = [
    {
        path: "/Contacts",
        name: "Contacts",
        component: ContactsView,
        meta: { requiresAuth: true },
    },
    {
        path: "/SignIn",
        name: "SignIn",
        component: SignIn,
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

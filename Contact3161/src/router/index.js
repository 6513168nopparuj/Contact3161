import { createRouter, createWebHistory } from "vue-router";

import ContactsView from "../views/ContactsView.vue";
import SignIn from "../views/SignIn.vue";

const routerHistory = createWebHistory();

const routes = [
    {
        path: "/Contacts",
        name: "Contacts",
        component: ContactsView,
    },
    {
        path: "/SignIn",
        name: "SignIn",
        component: SignIn,
    },
    {
        path: "/",
        redirect: "/Contacts",
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/Contacts",
    },
];
const router = createRouter({
    history: routerHistory,
    routes,
});

export default router;

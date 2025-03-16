import {createRouter,createWebHistory} from "vue-router"

import HelloWorld from "../components/HelloWorld.vue"
import Home from "../views/Home.vue"
import Search from "../views/Search.vue"

const routerHistory = createWebHistory()

const routes = [
    {
    path : "/home",
    name : "Home",
    component: Home
    },
    {
    path : "/hello",
    name : "HelloWorld",
    component: HelloWorld
    },
    {
    path : "/search",
    name : "search",
    component: Search
    },
    {
    path : "/",
    redirect : '/search',
    },
    {
    path : "/:catchAll(.*)",
    redirect : '/search',
    }

]
const router =  createRouter({
    history:routerHistory,
    routes
})
export default router
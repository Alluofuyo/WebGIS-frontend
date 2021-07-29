import {createRouter, createWebHistory} from "vue-router"
import {store} from "./store";

const checkLogin = () => {
    if (store.state.token == "") {
        return {
            path: "/login",
            replace: true,
            fullPath: "/login"
        }
    }
}
const routes = [
    {
        path: "/",
        component: () => import("@/views/Login.vue"),
        meta: {
            transition: "fade"
        }
    },
    {
        path: "/login",
        component: () => import("@/views/Login.vue"),
        meta: {
            transition: "fade"
        }
    },
    {
        path: "/regist",
        component: () => import("@/views/Regist.vue"),
        meta: {
            transition: "fade"
        }
    },
    {
        path: "/index",
        component: () => import("@/views/Index.vue"),
        redirect: "/index/map",
        meta: {
            transition: ""
        },
        children: [
            {
                path: "map",
                component: () => import("@/views/nav/Map.vue"),
                meta: {
                    transition: "fade"
                }
            },
            {
                path: "info",
                component: () => import("@/views/nav/Info.vue"),
                meta: {
                    transition: "fade"
                }
            },
            {
                path: "about",
                component: () => import("@/views/nav/About.vue"),
                meta: {
                    transition: "fade"
                }
            }
        ]
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    console.log(to, from)
    if (["/login", "/regist"].includes(to.path)) {
        return true
    } else if (store.state.token == "") {
        return {path: "/login", replace: true}
    } else {
        return true
    }
})

export {router}
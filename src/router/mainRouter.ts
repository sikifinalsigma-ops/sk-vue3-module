import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/frame/Main.vue'
import NotFound from '@/pages/frame/Error.vue'
import Login from '@/pages/login/Login.vue'
import Layout from '@/pages/frame/Layout.vue'
// 默认路由，所有用户共享
const routes: any = [
    {
        path: "/",
        component: Layout,
        // 子路由
        children: [{
            path: "/",
            component: Main,
            meta: {
                title: "后台首页"
            }
        }]
    },
    {
        path: "/login",
        component: Login,
        meta: {
            title: "登录页"
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

// 动态路由，用于匹配菜单动态添加路由
const asyncRoutes = []
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
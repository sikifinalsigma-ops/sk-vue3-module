import router from "@/router/mainRouter"
import { getAuthorizationToken } from "@/frame/module/authorization"
import { toast } from "@/frame/module/info"
import { showFullLoading, hideFullLoading } from "@/frame/module/progress"
import useLoginUser from "@/frame/store/loginuser"
import { logout } from "@/api/login"

// 全局前置守卫
router.beforeEach(async (to, from) => {
    // 显示loading
    showFullLoading()

    const token = getAuthorizationToken()
    const userInfo = useLoginUser()

    // 没有登录，强制跳转回登录页
    if (!token && to.path !== "/login") {
        toast("提示", "请先登录","warning")
        return "/login"
    }
    else if (!token && to.path === "/login") {
        return true;
    }
    // 防止重复登录
    else if (token && to.path === "/login") {
        toast("提示","请勿重复登录", "warning")
        return from.path || "/"
    }
    // 如果用户登录了，自动获取用户信息
    else if (!userInfo.hasInfo) {
        try {
            //console.log(userInfo.user)
            await userInfo.setLogInfo()
        } catch (err) {
            // 拉取用户信息失败：token失效/后端异常 → 清空token，跳登录
            toast("登录已失效，请重新登录", "error")
            const res = await logout();     
            userInfo.logout();
            return "/login"
        }
    }

    // 设置页面标题
    let title = (to.meta.title ? to.meta.title : "") + "-后台"
    document.title = title
    return true
})

// 全局后置守卫
router.afterEach((to, from) => hideFullLoading())
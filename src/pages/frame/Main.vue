<template>
    <div>
        后台首页

        {{ user?.userName }}

        <el-button @click="handleLogout">退出登录</el-button>
    </div>
</template>
<script setup lang="ts">
import { logout } from "@/api/login"
import { showModal, toast } from "@/frame/module/info"
import { useRouter } from "vue-router"
import { useLoginUser } from "@/frame/store/loginuser"
import { storeToRefs } from 'pinia'
const router = useRouter()
const loginUserStore = useLoginUser()
const { user } = storeToRefs(loginUserStore)
function handleLogout() {
    showModal("是否要退出登录？").then(async res => {
        try {
            const res = await logout();
            loginUserStore.logout();
            // 跳转回登录页
            router.push("/login")
            // 提示退出登录成功
            toast("退出登录成功")

        }
        catch (err: any) {
            toast("退出登录失败：" + (err.message || "网络异常"), "error")
        }

    })
}
</script>
<template>
    <el-row class="login-container">
        <el-col :lg="16" :md="12" class="left">
            <div>
                <div>欢迎光临</div>
                <div>商城后台开发</div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right">
            <h2 class="title">欢迎回来</h2>
            <div>
                <span class="line"></span>
                <span>账号密码登录</span>
                <span class="line"></span>
            </div>
            <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon>
                                <user />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password>
                        <template #prefix>
                            <el-icon>
                                <lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button round color="#626aef" class="w-[250px]" type="primary" @click="onSubmit"
                        :loading="loading">登
                        录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { toast } from '@/frame/module/info'
import { useRouter } from 'vue-router'
import type { ElForm } from 'element-plus'
import { useLoginUser } from '@/frame/store/loginuser'
import { sha256 } from 'js-sha256';

const router = useRouter()
const loginUserStore = useLoginUser()

const form = reactive({
    username: "",
    password: ""
})

const rules = {
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
    ]
}

const formRef = ref<InstanceType<typeof ElForm> | null>(null)
const loading = ref(false)

const onSubmit = async () => {
    if (!formRef.value)
        return
    const valid = await formRef.value.validate().catch(() => false)
    if (!valid)
        return
    //debugger
    loading.value = true
    try {
        await loginUserStore.login(form.username, sha256(form.password))
        toast("登录成功")
        router.push("/")
    } catch (err: any) {
        console.log(err)
        toast( "登录失败",err.message || "error","warning")
    } finally {
        loading.value = false
    }
}

// 回车登录
function onKeyUp(e: KeyboardEvent) {
    if (e.key === "Enter")
        onSubmit()
}

onMounted(() => {
    document.addEventListener("keyup", onKeyUp)
})
onBeforeUnmount(() => {
    document.removeEventListener("keyup", onKeyUp)
})
</script>

<style scoped>

@reference "tailwindcss";
.login-container {
    @apply min-h-screen bg-indigo-500;
}

.login-container .left,
.login-container .right {
    @apply flex items-center justify-center;
}

.login-container .right {
    @apply bg-gray-50 flex-col;
}

.left>div>div:first-child {
    @apply font-bold text-5xl text-white mb-4;
}

.left>div>div:last-child {
    @apply text-gray-200 text-sm;
}

.right .title {
    @apply font-bold text-3xl text-gray-800;
}

.right>div {
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.right .line {
    @apply h-[1px] w-16 bg-gray-200;
}
</style>

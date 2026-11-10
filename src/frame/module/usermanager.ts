import { ref, reactive } from 'vue'
import { logout, updatepassword } from "@/api/login"
import { showModal, toast } from "@/frame/module/info"
import { useRouter } from "vue-router"
import { useLoginUser } from "@/frame/store/loginuser"
export function useRepassword() {
    const router = useRouter()
    const userStore = useLoginUser();

    // 修改密码
    const formDrawerRef = ref<any>(null)
    const form = reactive({
        oldpassword: "",
        password: "",
        repassword: ""
    })

    const rules = {
        oldpassword: [
            {
                required: true,
                message: '旧密码不能为空',
                trigger: 'blur'
            },
        ],
        password: [
            {
                required: true,
                message: '新密码不能为空',
                trigger: 'blur'
            },
        ],
        repassword: [
            {
                required: true,
                message: '确认密码不能为空',
                trigger: 'blur'
            },
        ]
    }

    const formRef = ref<any>(null)
    const onSubmit = () => {

        formRef.value.validate((valid: any) => {

            if (!valid) {
                return false
            }

            formDrawerRef.value.showLoading();
            updatepassword(form.oldpassword, form.password)
                .then(async res => {
                    toast("修改密码成功，请重新登录")
                    try {
                        const res = await logout();
                        userStore.logout();
                        // 跳转回登录页
                        router.push("/login")
                        // 提示退出登录成功
                        toast("退出登录成功")

                    }
                    catch (err: any) {
                        toast("退出登录失败：" + (err.message || "网络异常"), "error")
                    }
                })
                .finally(() => {
                    formDrawerRef.value.hideLoading()
                })

        })
    }

    const openRePasswordForm = () => formDrawerRef.value.open()

    return {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRePasswordForm
    }
}

export function userLogout() {
    const router = useRouter()
    const userStore = useLoginUser();
    function handleLogout() {
        showModal("是否要退出登录？").then(async res => {
            try {
                const res = await logout();
                userStore.logout();
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

    return {
        handleLogout
    }
}
import { defineStore } from 'pinia'
import { getAuthorizationToken, setAuthorizationToken, removeAuthorizationToken } from '@/frame/module/authorization'
import { login, loginfo, logout } from '@/api/login'

export const useLoginUser = defineStore('loginuser', {
  // 状态，必须是函数返回对象
  state: () => ({
    user: {} as Record<string, any>
  }),

  getters: {
    // 判断是否已经登录（有用户信息）
    hasInfo: (state) => !!state.user?.id
  },

  // 方法，支持同步/异步，修改state
  actions: {

    async login(username: string, password: string) {
      
      const res:any = await login(username, password)
      if (res.code !== 200) {
        // 业务登录失败，抛出错误，组件catch捕获message
        throw new Error(res.data?.message || '账号或密码错误')
      }
      // 登录成功才往下走
      const token = res.data.token
      setAuthorizationToken(token)
      this.user = res.data.userInfo;
    },

    async setLogInfo() {
      const userInfo = await loginfo();
      this.user = userInfo.data.userInfo;
      return userInfo;
    },

    //退出登录：清空token + 清空用户信息    
    async logout() {
      removeAuthorizationToken()
      this.user = {}
    },

  },

  //开启持久化
  persist: true
  
})

export default useLoginUser
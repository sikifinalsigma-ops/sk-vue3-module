import { useCookies } from '@vueuse/integrations/useCookies'
const cookie = useCookies()

// 获取token
export function getToken(TokenKey:string){
    return cookie.get(TokenKey)    
}

// 设置token
export function setToken(TokenKey:string,TokenValue:string){
    return localStorage.setItem(TokenKey,TokenValue)
}

// 清除token
export function removeToken(TokenKey:string){
    return cookie.remove(TokenKey)    
}
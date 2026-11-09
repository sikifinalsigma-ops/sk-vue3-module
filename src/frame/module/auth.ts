import { useCookies } from '@vueuse/integrations/useCookies'
const TokenKey = "jwt-authorization-token"
const cookie = useCookies()

// 获取token
export function getAuthorizationToken(){
    //return cookie.get(TokenKey)
    return localStorage.getItem(TokenKey)
}

// 设置token
export function setAuthorizationToken(token:any){
    //return cookie.set(TokenKey,token)
    return localStorage.setItem(TokenKey,token)
}

// 清除token
export function removeAuthorizationToken(){
    //return cookie.remove(TokenKey)
    return localStorage.removeItem(TokenKey)
}
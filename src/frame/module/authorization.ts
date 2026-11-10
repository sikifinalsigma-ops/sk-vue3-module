import {JwtTokenKey} from "@/const/frame"

// 获取token
export function getAuthorizationToken(){
    return localStorage.getItem(JwtTokenKey)
}

// 设置token
export function setAuthorizationToken(token:any){
    return localStorage.setItem(JwtTokenKey,token)
}

// 清除token
export function removeAuthorizationToken(){
    return localStorage.removeItem(JwtTokenKey)
}
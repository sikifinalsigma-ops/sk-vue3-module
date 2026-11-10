import axios from '@/frame/syncreq/axios'

export function login(username:string,password:string){
    return axios.post("/UserSignIn/Login",{
        UserId:username,
        UserPassword:password
    })
}

export function loginfo(){
    return axios.post("/UserSignIn/LogInfo")
}

export function logout(){
    return axios.post("/UserSignIn/Logout")
}

export function updatepassword(oldpassword:string,newpassword:string){
    return axios.post("/UserSignIn/UpdatePassword",{
        OldPassword:oldpassword,
        NewPassword:newpassword
    })
}
import axios from "axios"
import { toast } from '@/frame/module/info'
import { getAuthorizationToken } from '@/frame/module/authorization'
import { AxiosUrl } from '@/const/frame'
const service = axios.create({
    baseURL:AxiosUrl
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {

    // 往header头自动添加token
    const token = getAuthorizationToken()
    if(token){
        //config.headers["token"] = token
        //console.log(token);
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    response = response.data
    return response;
  }, function (error) {
    // 对响应错误做点什么
    toast("请求失败",error.response?.data?.msg || "error","warning")
    return Promise.reject(error);
 })

export default service
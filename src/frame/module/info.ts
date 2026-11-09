import { ElNotification, ElMessageBox } from 'element-plus'

// 消息提示
export function toast(ctitle = "", cmsg = "", ctype = "success") {
  ElNotification({
    title: ctitle,
    message: cmsg,
    type: ctype,
    duration:3000
  } as NotificationOptions);
}


export function showModal(content:string = "提示内容", ctype:'success' | 'warning' | 'info' | 'error' = "warning" , title:string = "") 
{ 
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type:ctype,
      center: true,
    }
  )    
}

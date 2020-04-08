import axios from 'axios'
import router from '@/router';
import { Message,Loading } from 'element-ui'
import store from '@/store'
import { getToken, getCookie, setCookie } from '@/utils/auth'
import global_info from '@/api/Global'

// 线上
// let base = "https://api.mumuhome.net"
// 测试
// let base = "https://dev.mumuhome.net"

let loading = Loading.service({ fullscreen: true });
function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({ fullscreen: true });
}
function endLoading(Loading) {    //使用Element loading-close 方法
  Loading.close()
}

// 创建axios实例
const service = axios.create({
  // baseURL: base, // url = base url + request url
  timeout: 5000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
  config => {
    if(global_info.isShowLoading==true) {
      startLoading();
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 211:Token 过期了;
      if (res.code === 503) {
          store.dispatch('user/resetToken').then(() => {
            setCookie('userId','')
            setCookie('accessToken','')
            setCookie('loginName','')
            setCookie('mobile','')
            setCookie('userId','')
            setCookie('password','')
            router.push({path:'/login' ,query: {url:location.hostname}});
            clearInterval(window.timer);
            location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
      setTimeout(()=>{
        endLoading(loading);
      },600)
      return
    } else {
      setTimeout(()=>{
        endLoading(loading);
      },600)
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

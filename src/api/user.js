import request from '@/utils/request'
import {domain} from '@/host_url.js'

// 登录
export function login(data) {
  return request({
    url: domain.Base_M1_URL+'/login/user/shortcut/login',
    method: 'post',
    data
  })
}

// 校验输入验证码是否和所发短信一样
export function verificationCodeCkeck(data) {
  return request({
    url: domain.Base_M1_URL+'/login/verificationCode/check',
    method: 'post',
    data
  })
}

// 获取短信验证码
export function verificationCodeCreate(data) {
  return request({
    url: domain.Base_M1_URL+'/login/verificationCode/create',
    method: 'post',
    data
  })
}

// 用户在不在线
export function userOnline(data) {
  return request({
    url: domain.Base_M1_URL+'/login/user/online',
    method: 'post',
    data
  })
}

// 修改密码
export function revise_login_password(data) {
  return request({
    url: domain.Base_M1_URL+'/api_merchants_food/pc.merchants/revise',
    method: 'post',
    data
  })
}

// 获取用户的详细信息（如用户权限，用户名等等信息）
export function getInfo(token) {
  return request({
    url: domain.Base_M1_URL+'/user/info',
    method: 'get',
    params: { token }
  })
}

// 登出
export function logout() {
  return request({
    url: domain.Base_M1_URL+'/user/logout',
    method: 'post'
  })
}

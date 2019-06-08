import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sec-user/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/sec-user/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/sec-user/user/logout',
    method: 'post'
  })
}

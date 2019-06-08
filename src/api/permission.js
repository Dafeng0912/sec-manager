import request from '@/utils/request'

// 权限管理管理
export function getPromission() {
    return request({
        url: '/sec-user/permission/get',
        method: 'get',
    })
}

export function deletePro(perId,userId) {
    return request({
        url: '/sec-user/permission/delete',
        method: 'get',
        params:{
            perId,userId
        },
    })
}

// 查看每个权限的用户
export function perGEtUser(id) {
    return request({
        url: '/sec-user/permission/pergetuser',
        method: 'get',
        params:{id},
    })
}

// 查看每个用户的权限
export function userGetPer(id) {
    return request({
        url: '/sec-user/permission/usergetper',
        method: 'get',
        params:{id},
    })
}

export function ueerEditPer(id) {
    return request({
        url: '/sec-user/permission/usereditPer',
        method: 'get',
        params:{id},
    })
}
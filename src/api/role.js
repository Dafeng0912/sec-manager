// 角色管理管理
import request from '@/utils/request'

export function getRole() {
    return request({
        url: '/sec-user/role/get',
        method: 'get',
    })
}
export function updateRole(role) {
    return request({
        url: '/sec-user/role/update',
        method: 'post',
        data:{ 
            id : role.id,
            role : role.role,
        }
    })
}

export function deletRole(id) {
    return request({
        url: '/sec-user/role/delete',
        method: 'get',
        params:{id}
    })
}

export function insertRole(role) {
    return request({
        url: '/sec-user/role/insert',
        method: 'post',
        data:{ 
            id : role.id,
            role : role.role
        }
    })
}

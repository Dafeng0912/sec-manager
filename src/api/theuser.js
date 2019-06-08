// 角色管理管理
import request from '@/utils/request'

export function getuser() {
    return request({
        url: '/sec-user/user/get',
        method: 'get',
    })
}

export function getUserPer() {
    return request({
        url: '/sec-user/user/getuserper',
        method: 'get',
    })
}

export function getself(id) {
    return request({
        url: '/sec-user/user/getself',
        method: 'get',
        params:{
            id
        }
    })
}

export function updateuser(user) {
    return request({
        url: '/sec-user/user/update',
        method: 'post',
        data:{ 
            id : user.id,
            userId : user.userId,
            name : user.name,
            sex : user.sex,
            password : user.password,
            roleId : user.roleId,
            phone : user.phone,
            admissionTime : user.admissionTime,
            emial : user.emial,
            permissionId : user.permissionId
        }
    })
}

export function deletuser(id) {
    return request({
        url: '/sec-user/user/delete',
        method: 'get',
        params:{id}
    })
}

export function insertuser(user) {
    return request({
        url: '/sec-user/user/insert',
        method: 'post',
        data:{ 
            id : user.id,
            userId : user.userId,
            name : user.name,
            sex : user.sex,
            password : user.password,
            roleId : user.roleId,
            phone : user.phone,
            admissionTime : user.admissionTime,
            emial : user.emial,
            permissionId : user.permissionId
        }
    })
}

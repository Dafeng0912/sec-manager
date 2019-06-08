// -------------合作学校信息维护-------------------
import request from '@/utils/request'
export function getschool() {
    return request({
        url: '/sec-circuit/stadard/get',
        method: 'get',
    })
}
export function updataLevel(evaluationStandard) {
    return request({
        url: '/sec-circuit/stadard/update',
        method: 'post',
        data:{ 
            id:evaluationStandard.id,
            name : evaluationStandard.name,
            depict : evaluationStandard.depict
        }
    })
}

export function deleteLevel(id) {
    return request({
        url: '/sec-circuit/stadard/delete',
        method: 'get',
        params:{id}
    })
}

export function insertLevel(evaluationStandard) {
    return request({
        url: '/sec-circuit/stadard/add',
        method: 'post',
        data:{ 
            name : evaluationStandard.name,
            depict : evaluationStandard.depict
        }
    })
}

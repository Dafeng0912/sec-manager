import request from '@/utils/request'


// 评价指标管理管理
export function getnorn() {
  return request({
    url: '/sec-circuit/stadard/get',
      method: 'get',
  })
}
export function update(evaluationStandard) {
  return request({
      url: '/sec-circuit/stadard/update',
      method: 'post',
      data:{ 
        id:evaluationStandard.id,
        name:evaluationStandard.name,
        whights:evaluationStandard.whights
      }
  })
}

export function deletenorm(id) {
    return request({
        url: '/sec-circuit/stadard/delete',
        method: 'get',
        params:{id}
    })
}

export function insert(evaluationStandard) {
    return request({
        url: '/sec-circuit/stadard/add',
        method: 'post',
        data:{ 
            name : evaluationStandard.name,
            whights : evaluationStandard.whights
        }
    })
}

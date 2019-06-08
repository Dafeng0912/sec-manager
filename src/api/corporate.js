import request from '@/utils/request'

export function getAllCorporate() {
  return request({
    url: '/sec-circuit/corporate/get',
    method: 'get',
  })
}

export function update(corporate) {
    return request({
      url: '/sec-circuit/corporate/update',
      method: 'post',
      data:{
        id : corporate.id,
        manager :corporate.manager,
        userId :corporate.userId,
        company:corporate.company
      }
    })
  }
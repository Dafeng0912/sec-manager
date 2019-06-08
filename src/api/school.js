import request from '@/utils/request'

export function getAllSchool() {
  return request({
    url: '/sec-circuit/school/get',
    method: 'get',
  })
}

export function update(school) {
    return request({
      url: '/sec-circuit/school/update',
      method: 'post',
      data:{
        id : school.id,
        manage :school.manager,
        userId :school.userId,
      }
    })
  }
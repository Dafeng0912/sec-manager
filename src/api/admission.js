import request from '@/utils/request'

export function getAll() {
  return request({
    url: '/sec-circuit/admission/get',
    method: 'get',
  })
}

export function insert(ap) {
  return request({
    url: '/sec-circuit/admission/insert',
    method: 'post',
    data: { 
       name : ap.name,
       content :ap.content,
       time : ap.time,
       execution : ap.execution,
       order : ap.order,
       partner : ap.partner,
       schedule : ap.schedule,
     }
  })
}

export function deleteAdmission(id) {
  return request({
    url: '/sec-circuit/admission/delete',
    method: 'get',
    params:{id}
  })
}

export function update(ap) {
    return request({
      url: '/sec-circuit/admission/update',
      method: 'post',
      data:{
        id:ap.id,
        name : ap.name,
        content :ap.content,
        time : ap.time,
        execution : ap.execution,
        order : ap.order,
        partner : ap.partner,
        schedule : ap.schedule,
      }
    })
  }
import request from '@/utils/request'

// 全部评价记录视图
export function getAll() {
  return request({
    url: '/sec-circuit/record/getAll',
    method: 'get',
  })
}

/**
 *  获得饼图数据
 */
export function get() {
  return request({
    url: '/sec-circuit/record/get',
    method: 'get',
  })
}

export function deleterecord(id) {
    return request({
      url: '/sec-circuit/record/delete',
      method: 'get',
      params:{
          id
      }
    })
  }

export function insertRecord(record) {
  return request({
    url: '/sec-circuit/record/insert',
    method: 'post',
    data:{
      count : record.count,
      userId : record.userId
    }
  })
}
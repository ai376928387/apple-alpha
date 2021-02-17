import request from '@/utils/request'

export function getDataDetail () {
  const url = '/getDataDetail'
  return new Promise((resolve, reject) => {
    request({
      url,
      method: 'get'
    }).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

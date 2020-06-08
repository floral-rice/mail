import {request} from './axios'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    //get方法中的数据拼接
    params: {
      type,
      page
    }
  })
}

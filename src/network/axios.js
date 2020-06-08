import axios from 'axios'

export function request(config) {
  //配置公共的配置
  const instance = axios.create({

    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  //拦截器
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {})

//  使用instance
  return instance(config)
}


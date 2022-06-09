import axios from 'axios'

export function request (config) {
  const install = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
  })
  // 防止走缓存，给每次请求添加时间戳
  install.interceptors.request.use(
    (config) => {
      if (config.method === 'post') {
        config.data = {
          ...config.data,
          _timestamp: Date.parse(new Date()) / 1000
        }
      } else if (config.method === 'get') {
        config.params = {
          ...config.params,
          _timestamp: Date.parse(new Date()) / 1000
        }
      }
      return config
    },
    (error) => {
      console.log(error)
      return Promise.reject(error)
    }
  )

  return install(config)
}

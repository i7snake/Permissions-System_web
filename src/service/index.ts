import { TOKEN } from '@/global/token'
import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import AxiosRequest from './request'

const axiosRequest = new AxiosRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 每一个请求都要自动携带token
      const token = localCache.getCache(TOKEN)
      if (config.headers && token) {
        // 类型缩小
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }
  }
})

export default axiosRequest

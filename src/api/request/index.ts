import type {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios'
import axios from 'axios'
import type {CreateRequestConfig, RequestConfig} from '@/api/request/type'

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */
const MpRequest = (config: CreateRequestConfig) => {
  const instance: AxiosInstance = axios.create(config)

  // 全局拦截器
  // 请求拦截器
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // loading/token 处理
      console.log('触发全局请求拦截器')
      return config
    },
    (err: any) => {
      return Promise.reject(err)
    }
  )

  // 响应拦截器
  instance.interceptors.response.use(
    (res: AxiosResponse) => {
      if (res.status === 400) {
        console.log(res)
      }
      console.log('触发全局响应拦截器')
      return res.data
    },
    (err: any) => {
      return Promise.reject(err)
    }
  )

  // 针对特定的实例添加拦截器
  if (config.interceptors) {
    instance.interceptors.request.use(
      config.interceptors.requestSuccessFn,
      config.interceptors.requestFailureFn
    )

    instance.interceptors.response.use(
      config.interceptors.responseSuccessFn,
      config.interceptors.responseFailureFn
    )
  }

  //单次请求拦截器
  const request = async <T = any>(config: RequestConfig<T>): Promise<T> => {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config as any)
    }

    try {
      let res: Awaited<T> = await instance.request<any, T>(config)

      // 单次响应的成功拦截处理
      if (config.interceptors?.responseSuccessFn) {
        res = config.interceptors.responseSuccessFn(res) as Awaited<T>
      }

      return res
    } catch (err) {
      return Promise.reject(err)
    }
  }

  const get = <T = any>(config: RequestConfig<T>) => {
    return request({...config, method: 'GET'})
  }

  const post = <T = any>(config: RequestConfig<T>) => {
    return request({...config, method: 'POST'})
  }

  const deleteRequest = <T = any>(config: RequestConfig<T>) => {
    return request({...config, method: 'DELETE'})
  }

  const patch = <T = any>(config: RequestConfig<T>) => {
    return request({...config, method: 'PATCH'})
  }

  return {get, post, delete: deleteRequest, patch}
}

export default MpRequest
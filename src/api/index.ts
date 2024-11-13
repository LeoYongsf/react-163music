import {BASE_URL, TIMEOUT} from '@/api/config'
import MpRequest from '@/api/request'

const Request = MpRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestSuccessFn: (config) => {
      console.log('触发单个请求拦截器')
      return config
    },
    responseSuccessFn: (res) => {
      return res
    },
    responseFailureFn(err) {
      return err
    },
    requestFailureFn(err) {
      return err
    }
  }
})
export default Request

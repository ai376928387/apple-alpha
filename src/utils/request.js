import axios from 'axios'
import { Loading } from 'quasar'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_URL
  // timeout: 20000 // request timeout
})

// set the request interceptor
service.interceptors.request.use(function (config) {
  showLoading() // do before request send
  return config
})
// set response intercepter
service.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
)

// Handle mutilple request in same time
let needLoadingRequestCount = 0

export function showLoading () {
  if (needLoadingRequestCount === 0) {
    Loading.show()
  }
  needLoadingRequestCount++
}

export function successHandler (response) {
  if (needLoadingRequestCount <= 0) return response
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    Loading.hide()
  }
  return response
}

export function errorHandler (error) {
  // stop load count at once
  needLoadingRequestCount = 0
  Loading.hide()
  return Promise.reject(error)
}

export default service

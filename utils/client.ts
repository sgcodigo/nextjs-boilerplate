import axios from 'axios'
import qs from 'qs'
import { Request, Response } from 'types/api'

export default async function api<T = any>(url: string, config?: Request): Promise<Response<T>> {
  const { type, token, payload, method = 'GET', ...rest } = config || {}

  rest.headers = rest.headers || {}
  rest.baseURL = process.env.NEXT_PUBLIC_API_URL

  if (!!token) {
    rest.headers['Authorization'] = 'Bearer ' + token
  } else {
    rest.auth = {
      username: `${process.env.NEXT_PUBLIC_API_USERNAME}`,
      password: `${process.env.NEXT_PUBLIC_API_PASSWORD}`,
    }
  }

  switch (type) {
    case 'csv':
      rest.headers['Accept'] = 'application/csv'
      rest.responseType = 'blob'
      break

    case 'form':
      rest.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      break

    case 'multipart':
      rest.headers['Content-Type'] = 'multipart/form-data'
      break

    default:
      rest.headers['Content-Type'] = 'application/json'
  }

  return await axios({
    url,
    method,
    ...rest,
    [method !== 'GET' ? 'data' : 'params']: type === 'form' ? qs.stringify(payload) : payload,
  })
    .then(res => {
      const { data, message, succeeded, errorCode } = res.data
      return succeeded !== false ? Promise.resolve({ data, message }) : Promise.reject({ code: errorCode, message })
    })
    .catch(err => {
      //Note: Don't handle the logout here. Handle at hooks/useClient so that the app will be reactive without needing to reload.
      const data = err.response?.data
      return Promise.reject({
        code: data?.errorCode || err.response?.status,
        message: data?.message || data?.error_description,
      })
    })
}

import { useRecoilValue } from 'recoil'
import { tokenState } from 'states'
import { Request } from 'types/api'
import client from 'utils/client'
import useLogout from './useLogout'

export function useClient() {
  const token = useRecoilValue(tokenState)
  const logout = useLogout()

  return <T = any>(url: string, config?: Request) => {
    return client<T>(url, { token, method: 'GET', ...config })
      .then(res => Promise.resolve(res))
      .catch(err => {
        if (err.code === 401) logout()
        return Promise.reject(err)
      })
  }
}

import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { Request, Response, ResponseError } from 'types/api'
import { useClient } from './useClient'

export function useFetchQuery<TData = any>(
  url: string,
  $config?: Request & { key?: string },
  options?: UseQueryOptions<Response, ResponseError, Response<TData>, any[]>
) {
  const client = useClient()
  const { key, ...config } = $config || {}
  return useQuery(key ? [key] : [url, config?.payload], () => client<TData>(url, config), options)
}

export function useMutateQuery<TData = any>(
  options?: UseMutationOptions<Response<TData>, ResponseError, Request, unknown>
) {
  const client = useClient()
  return useMutation(({ url = '', ...config }: Request) => client(url, { method: 'POST', ...config }), options)
}

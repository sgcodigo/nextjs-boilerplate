import { AxiosRequestConfig } from 'axios'

export type Request = AxiosRequestConfig & { type?: 'form' | 'csv' | 'multipart'; token?: string; payload?: any }

export type ResponseError = { code: number; message: string }

export type Response<TData = any> = { data: TData; message: string }

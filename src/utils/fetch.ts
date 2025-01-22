import axios, { AxiosRequestConfig } from 'axios'
import { Request } from 'express'

export const fetchUrl = (url: string, req: Request) => {
  // Forward the original request configuration
  const config: AxiosRequestConfig = {
    method: req.method,
    headers: { ...req.headers },
    data: req.body,
  }

  // Remove host header as it should be determined by axios
  delete config.headers?.host
  
  return axios(url, config)
}

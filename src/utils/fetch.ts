import chalk from 'chalk'
import consola from 'consola'
import { Request } from 'express'

// Custom error class for fetch failures
export class FetchError extends Error {
  constructor(message: string, public url: string) {
    super(message)
    this.name = 'FetchError'
  }
}

interface ProxyResponse {
  data: unknown
  status: number
  headers: Headers
}

export const fetchUrl = async (url: string, req: Request): Promise<ProxyResponse> => {
  const isFaviconRequest = url.includes('favicon.ico')

  // Forward the original request configuration
  const config: RequestInit = {
    method: req.method,
    headers: new Headers(req.headers as Record<string, string>),
    // Forward body for all methods except GET and HEAD
    body: ['GET', 'HEAD'].includes(req.method.toUpperCase())
      ? undefined
      : req.is('application/json')
      ? JSON.stringify(req.body)
      : req.body,
    // Enable credentials to handle cookies
    credentials: 'include',
  }

  if (!isFaviconRequest) {
    consola.debug(chalk.cyan(`Fetching ${config.method} ${url}`))
  }

  // Remove problematic headers that should be handled by fetch
  if (config.headers instanceof Headers) {
    config.headers.delete('host')
    config.headers.delete('content-length')
    // Remove connection-specific headers
    config.headers.delete('connection')
    config.headers.delete('keep-alive')
  }

  try {
    const response = await fetch(url, config)
    
    // Handle non-2xx responses
    if (!response.ok) {
      throw new FetchError(`HTTP error! status: ${response.status}`, url)
    }
    
    let data: unknown
    const contentType = response.headers.get('content-type')

    // Handle response based on content type
    if (contentType?.includes('application/json')) {
      data = await response.json()
    } else {
      data = await response.text()
    }

    return {
      data,
      status: response.status,
      headers: response.headers,
    }
  } catch (error) {
    if (error instanceof FetchError) {
      throw error
    }
    throw new FetchError('Failed to fetch from target URL', url)
  }
}

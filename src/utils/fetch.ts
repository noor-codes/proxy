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
  error?: {
    message: string
    originalRequest: {
      url: string
      config: RequestInit
    }
  }
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

    // Log cookies if in debug mode and not a favicon request
    if (!isFaviconRequest) {
      const cookies = req.headers.cookie
      if (cookies) {
        consola.debug(chalk.yellow('Forwarding cookies:'), cookies)
      }
    }
  }

  try {
    const response = await fetch(url, config)
    
    let data: unknown
    const contentType = response.headers.get('content-type')

    // Log response cookies if in debug mode and not a favicon request
    if (!isFaviconRequest) {
      const responseCookies = response.headers.get('set-cookie')
      if (responseCookies) {
        consola.debug(chalk.yellow('Received cookies:'), responseCookies)
      }
    }

    // Handle response based on content type
    if (contentType?.includes('application/json')) {
      data = await response.json()
    } else {
      data = await response.text()
    }

    // For non-2xx responses, include the error details but don't throw
    if (!response.ok) {
      consola.debug(chalk.red(`Response not OK: ${response.status} ${response.statusText}`))
      return {
        data,
        status: response.status,
        headers: response.headers,
        error: {
          message: `HTTP ${response.status}: ${response.statusText}`,
          originalRequest: {
            url,
            config
          }
        }
      }
    }

    return {
      data,
      status: response.status,
      headers: response.headers,
    }
  } catch (error) {
    // Network or parsing errors
    return {
      data: null,
      status: 0,
      headers: new Headers(),
      error: {
        message: error instanceof Error ? error.message : 'Failed to fetch from target URL',
        originalRequest: {
          url,
          config
        }
      }
    }
  }
}

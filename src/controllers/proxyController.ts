import chalk from 'chalk'
import consola from 'consola'

import { Request, Response } from 'express'
import { fetchUrl, FetchError } from '@utils/fetch'

export interface ErrorResponse {
  error: string
  details?: string
}

// Function to validate URL
const isValidUrl = (urlString: string): boolean => {
  try {
    // Add protocol if missing
    const urlToTest = urlString.startsWith('http') ? urlString : `https://${urlString}`
    new URL(urlToTest)
    return true
  } catch (error) {
    return false
  }
}

export const proxyRequest = async (req: Request, res: Response<unknown | ErrorResponse>) => {
  const urlParam = req.params.url
  const isFaviconRequest = urlParam?.includes('favicon.ico')

  if (!isFaviconRequest) {
    consola.debug(chalk.white('----------------------------------------------'))
    consola.debug(chalk.cyan(`${req.method} ${req.originalUrl}`))
  }

  if (!urlParam) {
    return res.status(400).json({
      error: 'Missing URL parameter',
      details: 'Please provide a URL to proxy. Visit /info for usage details.',
    })
  }

  // Validate URL before attempting to fetch
  if (!isValidUrl(urlParam)) {
    if (!isFaviconRequest) {
      consola.debug(chalk.red(`Invalid URL: ${urlParam}`))
    }
    return res.status(400).json({
      error: 'Invalid URL',
      details: 'The provided URL is not valid. Visit /info for usage details.',
    })
  }

  try {
    const url = urlParam.startsWith('http') ? urlParam : `https://${urlParam}`
    if (!isFaviconRequest) {
      consola.info(chalk.blue(`Proxying ${req.method} request to: ${url}`))
    }

    const response = await fetchUrl(url, req)
    if (!isFaviconRequest) {
      if (response.status >= 200 && response.status < 300) {
        consola.debug(chalk.blue(`Succeeded to fetch from ${urlParam}`))
        consola.debug(chalk.green(`Proxy response successful (${response.status})`))
      } else {
        consola.debug(chalk.red(`Proxy response unsuccessful (${response.status})`))
      }
    }

    // If there's an error in the response but we got a valid status code,
    // pass through the original response with its status
    if (response.error && response.status > 0) {
      return res.status(response.status).json({
        ...(typeof response.data === 'object' ? response.data : {}),
        _proxy: {
          error: response.error.message,
          originalRequest: response.error.originalRequest
        }
      })
    }
    
    // If it's a network or parsing error (status 0), return 500
    if (response.error) {
      return res.status(500).json({
        error: 'Proxy request failed',
        details: response.error.message,
        url: urlParam,
        method: req.method,
        originalRequest: response.error.originalRequest,
        response: {
          status: response.status,
          headers: Object.fromEntries(response.headers.entries()),
          data: response.data,
        },
      })
    }

    res.status(response.status).json(response.data)
  } catch (error) {
    // Only log if it's not a FetchError
    if (!(error instanceof FetchError)) {
      consola.error(chalk.red('Unexpected proxy error:'), {
        error:
          error instanceof Error
            ? {
                name: error.name,
                message: error.message,
                stack: error.stack,
              }
            : error,
        url: urlParam,
        method: req.method,
      })
    } else if (!isFaviconRequest) {
      consola.debug(chalk.blue(`Failed to fetch from ${urlParam}`))
      consola.debug(chalk.red(`Proxy response unsuccessful (${500})`))
    }

    const errorDetails = {
      error: error instanceof Error ? error.name : 'Proxy Error',
      details:
        error instanceof Error ? error.message : 'An unexpected error occurred while proxying the request',
      url: urlParam,
      method: req.method,
      ...(error instanceof FetchError && {
        originalRequest: {
          url: error.url,
        },
      }),
    }

    return res.status(500).json(errorDetails)
  }
}

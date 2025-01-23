import chalk from 'chalk'
import consola from 'consola'

import { fetchUrl, FetchError } from '@utils/fetch'
import { Request, Response } from 'express'
import { getGuide } from './guideController'

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
    return getGuide(req, res)
  }

  // Validate URL before attempting to fetch
  if (!isValidUrl(urlParam)) {
    if (!isFaviconRequest) {
      consola.error(chalk.red(`Invalid URL: ${urlParam}`))
    }
    return getGuide(req, res)
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
        consola.error(chalk.red(`Proxy response unsuccessful (${response.status})`))
      }
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

    return getGuide(req, res)
  }
}

import chalk from 'chalk'
import consola from 'consola'

import { fetchUrl } from '@utils/fetch'
import { Request, Response } from 'express'

export interface ErrorResponse {
  error: string
  details?: string
}

export const proxyRequest = async (req: Request, res: Response<unknown | ErrorResponse>) => {
  const urlParam = req.params.url
  const isFaviconRequest = urlParam?.includes('favicon.ico')

  if (!isFaviconRequest) {
    consola.debug(chalk.white('----------------------------------------------'))
    consola.debug(chalk.cyan(`${req.method} ${req.originalUrl}`))
  }

  if (!urlParam) {
    consola.warn(chalk.yellow('Request rejected: Missing URL parameter'))
    return res.status(400).json({
      error: 'Invalid URL',
      details: 'URL parameter is required',
    })
  }

  try {
    const url = urlParam.startsWith('http') ? urlParam : `https://${urlParam}`
    if (!isFaviconRequest) {
      consola.info(chalk.blue(`Proxying ${req.method} request to: ${url}`))
    }

    const response = await fetchUrl(url, req)
    if (!isFaviconRequest) {
      consola.debug(chalk.green(`Proxy response successful`))
    }
    res.status(response.status).json(response.data)
  } catch (error) {
    consola.error(chalk.red('Proxy request failed:'), {
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
    res.status(500).json({
      error: 'Request Failed',
      details: error instanceof Error ? error.message : 'Unknown error occurred',
    })
  }
}

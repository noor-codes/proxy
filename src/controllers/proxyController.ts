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

  if (!urlParam) {
    return res.status(400).json({
      error: 'Invalid URL',
      details: 'URL parameter is required'
    })
  }

  try {
    const url = urlParam.startsWith('http') ? urlParam : `https://${urlParam}`
    consola.info(chalk.blue(`Proxying request to: ${url}`))

    const response = await fetchUrl(url, req)
    res.status(response.status).json(response.data)
  } catch (error) {
    consola.error(chalk.red('Proxy request failed:'), error)
    res.status(500).json({
      error: 'Request Failed',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    })
  }
}

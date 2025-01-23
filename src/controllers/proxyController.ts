import chalk from 'chalk'
import consola from 'consola'
import { fetchUrl } from '@utils/fetch'
import { Request, Response } from 'express'
import { config } from '@/config'

const { debugMode } = config

console.log(debugMode)

interface ErrorResponse {
  error: string
  details?: string
}

export const proxyRequest = async (req: Request, res: Response<any | ErrorResponse>) => {
  const urlParam = req.params.url

  // Ignore favicon requests
  if (urlParam.includes('favicon.ico')) {
    return res.status(204).end()
  }

  if (!urlParam) {
    debugMode && consola.warn('Missing URL parameter in request')
    return res.status(400).json({ error: 'URL parameter is required' })
  }

  // Ensure the URL starts with http:// or https://
  let targetUrl = urlParam
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = `https://${targetUrl}`
  }

  try {
    // Validate URL
    new URL(targetUrl)

    debugMode && consola.info(`Proxying request to: ${chalk.blue.underline(targetUrl)}`)
    const response = await fetchUrl(targetUrl, req)
    debugMode && consola.success(`Successfully proxied request to: ${chalk.green.bold(targetUrl)}`)
    res.status(response.status).json(response.data)
  } catch (error) {
    if (error instanceof TypeError) {
      debugMode && consola.error(`Invalid URL: ${chalk.red.bold(targetUrl)}`)
      return res.status(400).json({ error: 'Invalid URL provided' })
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    debugMode &&
      consola.error(`Failed to proxy request to ${chalk.red.bold(targetUrl)}: ${chalk.yellow(errorMessage)}`)

    res.status(500).json({
      error: 'Error fetching data',
      details: errorMessage,
    })
  }
}

export const healthCheck = async (_req: Request, res: Response) => {
  debugMode && consola.info(`Health check ${chalk.green.bold('OK')}`)
  res.json({ message: 'Server is running' })
}

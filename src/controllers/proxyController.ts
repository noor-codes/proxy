import chalk from 'chalk'
import consola from 'consola'

import { config } from '@/config'
import { fetchUrl } from '@utils/fetch'
import { AxiosError } from 'axios'
import { Request, Response } from 'express'

const isDev = config.nodeEnv === 'development'

export const proxyRequest = async (req: Request, res: Response) => {
  const url = req.params.url

  if (!url) {
    isDev && consola.warn('Missing URL parameter in request')
    return res.status(400).json({ error: 'URL parameter is required' })
  }

  try {
    isDev && consola.info(`Proxying request to: ${chalk.blue.underline(url)}`)
    const response = await fetchUrl(url)
    isDev && consola.success(`Successfully proxied request to: ${chalk.green.bold(url)}`)
    res.json(response.data)
  } catch (error) {
    const axiosError = error as AxiosError
    isDev &&
      consola.error(`Failed to proxy request to ${chalk.red.bold(url)}: ${chalk.yellow(axiosError.message)}`)
    res.status(axiosError.response?.status || 500).json({
      error: 'Error fetching data',
      details: axiosError.message,
    })
  }
}

export const healthCheck = async (req: Request, res: Response) => {
  isDev && consola.info(`Health check ${chalk.green.bold('OK')}`)
  res.json({ message: 'Server is running' })
}

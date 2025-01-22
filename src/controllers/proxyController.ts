import { Request, Response } from 'express'
import { AxiosError } from 'axios'
import { fetchUrl } from '@utils/fetch'

export const proxyRequest = async (req: Request, res: Response) => {
  const url = req.params.url

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' })
  }

  try {
    const response = await fetchUrl(url)
    res.json(response.data)
  } catch (error) {
    const axiosError = error as AxiosError
    res.status(axiosError.response?.status || 500).json({
      error: 'Error fetching data',
      details: axiosError.message,
    })
  }
}

export const healthCheck = async (req: Request, res: Response) => {
  res.json({ message: 'Server is running' })
}

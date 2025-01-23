import { Request, Response } from 'express'

export const healthCheck = (_req: Request, res: Response<{ message: string }>) => {
  res.json({ message: 'Server is running' })
}

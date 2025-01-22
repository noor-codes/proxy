import { Request, Response, NextFunction } from 'express'

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const protocol = req.protocol
  const host = req.get('host')
  console.log(`Server running at ${protocol}://${host}`)
  next()
}

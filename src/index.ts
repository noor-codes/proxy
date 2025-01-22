import cors from 'cors'
import chalk from 'chalk'
import express from 'express'
import consola from 'consola'
import proxyRoutes from '@/routes/routes'

import { config } from '@/config'

const app = express()

// Clear console in development mode
if (config.nodeEnv === 'development') {
  console.clear()
}

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/', proxyRoutes)

// Start server
app.listen(config.port, () => {
  const protocol = config.nodeEnv === 'production' ? 'https' : 'http'
  const host = `localhost:${config.port}`
  const url = `${protocol}://${host}`
  consola.success(`The server is running at ${chalk.blue.underline(url)}`)
})

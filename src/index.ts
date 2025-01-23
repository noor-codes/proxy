import cors from 'cors'
import chalk from 'chalk'
import helmet from 'helmet'
import express from 'express'
import consola from 'consola'
import proxyRoutes from '@/routes/routes'

import { config } from '@/config'

// Configure consola based on debug mode
if (config.debugMode) {
  consola.level = 4  // Show debug logs
} else {
  consola.level = 3  // Show info logs and above
}

const app = express()

// Clear console in development mode
if (config.nodeEnv === 'development' && config.debugMode) {
  console.clear()
}

// Middleware
app.use(cors())
app.use(helmet())
app.use(express.json())

// Serve favicon for root path
app.get('/favicon.ico', (_req, res) => {
  res.status(204).end() // No content response, cleaner than 404
})

// Routes
app.use('/', proxyRoutes)

// Start server
app.listen(config.port, () => {
  const protocol = config.nodeEnv === 'production' ? 'https' : 'http'
  const host = `localhost:${config.port}`
  const url = `${protocol}://${host}`
  consola.success(`The server is running at ${chalk.blue.underline(url)}`)
})

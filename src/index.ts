import { config } from '@/config'
import { getGuide } from '@/controllers/guideController'

import path from 'path'
import cors from 'cors'
import chalk from 'chalk'
import helmet from 'helmet'
import consola from 'consola'
import express from 'express'
import proxyRoutes from '@/routes/routes'

// Configure consola based on debug mode
if (config.debugMode) {
  consola.level = 4 // Show debug logs
} else {
  consola.level = 3 // Show info logs and above
}

const app = express()

// Clear console in development mode
if (config.nodeEnv === 'development' && config.debugMode) {
  console.clear()
}

// Middleware
app.use(cors())
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP for static files
  }),
)
app.use(express.json())

// Serve favicon
app.get('/favicon.ico', (_req, res) => {
  res.status(204).end()
})

// Landing page - serve static files
app.use(express.static(path.join(__dirname, '../docs/dist')))

// Handle proxy and guide routes
app.get('/', (req, res, next) => {
  // If it's a direct request to root, serve the landing page
  if (req.path === '/') {
    res.sendFile(path.join(__dirname, '../docs/dist/index.html'))
  } else {
    // For other paths, let the proxy routes handle it
    next()
  }
})

// Proxy routes for all other paths
app.use('/', proxyRoutes)

// Handle invalid URLs with guide
app.use((err: any, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err) {
    getGuide(_req, res)
  } else {
    next()
  }
})

// Start server
app.listen(config.port, () => {
  const protocol = config.nodeEnv === 'production' ? 'https' : 'http'
  const host = `localhost:${config.port}`
  const url = `${protocol}://${host}`
  consola.success(`🚀 Proxy server launched at ${chalk.blue.underline.bold(url)} 🛡️`)
})

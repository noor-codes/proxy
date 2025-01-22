import cors from 'cors'
import express from 'express'
import proxyRoutes from '@/routes/routes'

import { config } from '@/config'
import { loggerMiddleware } from '@middleware/logger'

const app = express()

// Clear console in development mode
if (config.nodeEnv === 'development') {
  console.clear()
}

// Middleware
app.use(cors())
app.use(express.json())
app.use(loggerMiddleware)

// Routes
app.use('/', proxyRoutes)

// Start server
app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`)
})

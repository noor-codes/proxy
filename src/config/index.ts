import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development'
}

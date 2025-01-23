import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

interface Config {
  readonly port: string | number;
  readonly nodeEnv: string;
  readonly proxyUrl: string;
  readonly debugMode: boolean;
}

export const config: Config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  proxyUrl: process.env.PROXY_URL || 'http://localhost:3000',
  debugMode: process.env.DEBUG_MODE === 'true' || false
}

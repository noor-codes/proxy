# Why a Proxy Server?

When developing web applications, you might encounter several challenges that a proxy server can solve:

- **CORS Issues**: The primary motivation for this project. Browser security prevents direct requests to different domains (CORS), but a proxy server can handle these requests server-side, bypassing these restrictions.
- **API Key Protection**: Keep sensitive API keys on the server instead of exposing them in client-side code
- **Rate Limiting**: Manage and control the rate of requests to external APIs
- **Request Modification**: Add custom headers or transform requests before they reach their destination
- **Response Caching**: Cache responses to improve performance and reduce API calls

# TypeScript Proxy Server

A lightweight and type-safe proxy server built with Express and TypeScript. This server allows you to proxy HTTP requests through your server while maintaining clean code architecture and type safety.

## Features

- 🚀 Express.js with TypeScript
- 🔄 Request proxying with Axios
- 🎯 Path aliases for clean imports
- 🛠️ Development hot-reload
- 🏗️ Production-ready build setup
- 🔍 Health check endpoint

## Project Structure

```
src/
├── config/         # Configuration and environment variables
├── controllers/    # Request handlers
├── middleware/     # Express middleware
├── routes/         # Route definitions
├── utils/         # Utility functions
└── index.ts       # Application entry point
```

## Prerequisites

- Node.js (v14 or higher)
- Yarn or npm

## Installation and Running the Project

1. Clone the repository
2. Install dependencies and run the project:

```bash
# Install dependencies
yarn

# Build the project
yarn build

# Start the server
yarn start
```

## Development

Run the development server with hot-reload:

```bash
yarn dev
```

## Usage

### Proxy Service

A powerful and secure proxy service for making HTTP requests.

#### Using Fetch API

```javascript
// Without proxy (will fail due to CORS)
fetch('https://google.com')
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.error('Error:', error))

// With proxy (will work)
fetch('http://localhost:3000/google.com')
  .then((response) => response.text())
  .then((html) => console.log(html))
  .catch((error) => console.error('Error:', error))
```

> **Note**: If you're pasting this code in the browser console, make sure you're on a page where the proxy is running (e.g., `http://localhost:3000`). It won't work if you are on `github.com`'s browser console, even with the proxy.

#### Using Axios

```javascript
// Using axios with proxy
const axios = require('axios')

axios
  .get('http://localhost:3000/google.com')
  .then((response) => console.log(response.data))
  .catch((error) => console.error('Error:', error))
```

### Features

- Automatic HTTPS (if protocol is not specified)
- Header forwarding
- CORS support
- Error handling

### Notes

- The proxy will automatically add `https://` if protocol is not specified
- All headers and body are forwarded to the target URL
- Supports all HTTP methods (GET, POST, PUT, DELETE, etc.)

### Health Check

You can verify the server is running by accessing the health check endpoint:

```
GET http://localhost:3000/health-check
```

Response:

```json
{
  "message": "Server is running"
}
```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```bash
PORT=3000              # Port number for the server
NODE_ENV=development   # Environment (development/production)
DEBUG_MODE=true       # Enable debug logging
PROXY_URL=https://your-proxy-domain.com  # Your proxy server's public URL
```

The `PROXY_URL` is used in the API documentation and response examples. Make sure to set it to your actual proxy domain in production.

## Available Scripts

- `yarn dev`: Start development server with hot-reload
- `yarn build`: Build for production
- `yarn start`: Start production server
- `yarn watch`: Watch for TypeScript changes

## License

MIT

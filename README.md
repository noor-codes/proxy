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

## Installation

1. Clone the repository
2. Install dependencies:
```bash
yarn install
```

## Development

Run the development server with hot-reload:
```bash
yarn dev
```

## Production

Build and start the production server:
```bash
yarn build
yarn start
```

## Usage

### Proxy Endpoint

The proxy server accepts requests in the following format:
```
http://localhost:3000/https://api.example.com/data
```

Example using axios:
```javascript
// Proxy a GET request to example.com using axios
const axios = require('axios');

axios.get('http://localhost:3000/https://api.example.com/data')
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));
```

Example using fetch:
```javascript
// Proxy a GET request to example.com
fetch('http://localhost:3000/https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

Example using curl:
```bash
curl "http://localhost:3000/https://api.example.com/data"
```

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

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```

## Available Scripts

- `yarn dev`: Start development server with hot-reload
- `yarn build`: Build for production
- `yarn start`: Start production server
- `yarn watch`: Watch for TypeScript changes

## License

MIT

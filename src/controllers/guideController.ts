import { config } from '@/config'
import { Request, Response } from 'express'

export const getGuide = (_req: Request, res: Response) => {
  const guide = {
    name: 'Proxy',
    description: 'A powerful and secure proxy service for making HTTP requests',
    version: '1.0.0',
    baseUrl: config.proxyUrl,
    usage: {
      directUrl: {
        description: 'Access a URL directly through the proxy',
        example: `${config.proxyUrl}/google.com`,
        note: 'The proxy will automatically add https:// if protocol is not specified',
      },
      apiClient: {
        description: 'Use the proxy service in your application',
        setup: {
          proxyUrl: config.proxyUrl,
          steps: [
            'Set the proxy URL as your base URL',
            'Make requests to the proxy URL followed by your target URL',
            'The proxy will forward your request with all headers and body',
          ],
        },
      },
      corsExample: {
        description: 'Try these examples in your browser console:',
        withoutProxy: `fetch('https://google.com')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => console.error('Error:', error));`,
        withProxy: `fetch('${config.nodeEnv === 'development' ? `http://localhost:${config.port}` : config.proxyUrl}/google.com')
  .then(response => response.text())
  .then(html => console.log(html))
  .catch(error => console.error('Error:', error));`,
      },
    },
    features: [
      'Automatic HTTPS',
      'Header forwarding',
      'All HTTP methods support',
      'Request body forwarding',
      'Error handling',
    ],
    examples: [
      {
        url: `${config.proxyUrl}/jsonplaceholder.typicode.com/users/1`,
        method: 'GET',
      },
      {
        url: `${config.proxyUrl}/jsonplaceholder.typicode.com/todos/1`,
        method: 'GET',
      },
      {
        url: `${config.proxyUrl}/jsonplaceholder.typicode.com/posts`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          title: 'Example Post',
          body: 'This is a test post',
          userId: 1,
        },
      },
    ],
    errors: {
      'Invalid URL': {
        description: 'The provided URL is not valid',
        causes: ['Missing protocol (http:// or https://)', 'Malformed URL structure'],
      },
      'Request Failed': {
        description: 'The proxy request failed',
        causes: ['Target server is down', 'Network connectivity issues', 'Invalid request parameters'],
      },
    },
    repository: 'https://github.com/noor-codes/proxy',
  }

  res.json(guide)
}

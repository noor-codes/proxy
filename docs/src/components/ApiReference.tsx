import { motion } from 'framer-motion'

const endpoints = [
  {
    title: 'Direct URL Access',
    method: 'ANY',
    path: '/:url',
    description: 'Access any URL directly through the proxy',
    parameters: [
      {
        name: 'url',
        type: 'string',
        description: 'The target URL to proxy (without protocol)',
      },
    ],
    example: {
      request: 'GET /api.example.com/users',
      response: '// Response from api.example.com/users',
    },
  },
]

const errors = [
  {
    code: 'Invalid URL',
    description: 'The provided URL is not valid',
    causes: ['Missing protocol (http:// or https://)', 'Malformed URL structure'],
  },
  {
    code: 'Request Failed',
    description: 'The proxy request failed',
    causes: ['Target server is down', 'Network connectivity issues', 'Invalid request parameters'],
  },
]

export default function ApiReference() {
  return (
    <div id='api' className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:text-center'>
          <h2 className='text-base font-semibold leading-7 text-primary-600'>Documentation</h2>
          <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>API Reference</p>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            Complete API documentation with examples and error handling.
          </p>
        </div>

        <div className='mt-16 space-y-20'>
          {/* Endpoints */}
          <div>
            <h3 className='text-2xl font-bold tracking-tight text-gray-900'>Endpoints</h3>
            <div className='mt-6 space-y-8'>
              {endpoints.map((endpoint, index) => (
                <motion.div
                  key={endpoint.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className='rounded-lg bg-gray-50 p-6'
                >
                  <h4 className='text-lg font-semibold text-gray-900'>{endpoint.title}</h4>
                  <div className='mt-2 flex items-center space-x-2'>
                    <span className='rounded bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700'>
                      {endpoint.method}
                    </span>
                    <code className='text-sm text-gray-600'>{endpoint.path}</code>
                  </div>
                  <p className='mt-2 text-sm text-gray-600'>{endpoint.description}</p>

                  {/* Parameters */}
                  <div className='mt-4'>
                    <h5 className='text-sm font-medium text-gray-900'>Parameters</h5>
                    <div className='mt-2 space-y-2'>
                      {endpoint.parameters.map((param) => (
                        <div key={param.name} className='flex items-start space-x-2 text-sm'>
                          <code className='text-primary-600'>{param.name}</code>
                          <span className='text-gray-500'>({param.type})</span>
                          <span className='text-gray-600'>{param.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Example */}
                  <div className='mt-4'>
                    <h5 className='text-sm font-medium text-gray-900'>Example</h5>
                    <div className='mt-2 space-y-2'>
                      <pre className='rounded bg-gray-800 p-4 text-sm text-white'>
                        <code>{endpoint.example.request}</code>
                      </pre>
                      <pre className='rounded bg-gray-800 p-4 text-sm text-white'>
                        <code>{endpoint.example.response}</code>
                      </pre>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Errors */}
          <div>
            <h3 className='text-2xl font-bold tracking-tight text-gray-900'>Error Handling</h3>
            <div className='mt-6 space-y-8'>
              {errors.map((error, index) => (
                <motion.div
                  key={error.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className='rounded-lg bg-gray-50 p-6'
                >
                  <h4 className='text-lg font-semibold text-red-600'>{error.code}</h4>
                  <p className='mt-2 text-sm text-gray-600'>{error.description}</p>
                  <div className='mt-4'>
                    <h5 className='text-sm font-medium text-gray-900'>Possible Causes</h5>
                    <ul className='mt-2 list-disc pl-5 text-sm text-gray-600'>
                      {error.causes.map((cause) => (
                        <li key={cause}>{cause}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

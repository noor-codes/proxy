import { motion } from 'framer-motion'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

const stats = [
  { name: 'Easy Setup', value: '< 5 min' },
  { name: 'Memory Usage', value: '< 50MB' },
  { name: 'Configuration', value: 'Simple' },
  { name: 'Security', value: 'Built-in' },
]

export default function Hero() {
  return (
    <div className='relative isolate'>
      {/* Background gradient */}
      <div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
        <div
          className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-500 to-emerald-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Content */}
      <div className='mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0'
        >
          <div className='mt-24 sm:mt-32 lg:mt-16'>
            <a href='https://github.com/noor-codes/proxy' className='inline-flex space-x-6'>
              <span className='rounded-full bg-green-600/10 px-3 py-1 text-sm font-semibold leading-6 text-green-700 ring-1 ring-inset ring-green-600/20'>
                Open Source
              </span>
              <span className='inline-flex items-center space-x-2 text-sm font-semibold leading-6 text-gray-700'>
                <span>Self-hosted Solution</span>
                <ArrowTopRightOnSquareIcon className='h-5 w-5 text-gray-500' aria-hidden='true' />
              </span>
            </a>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500'
          >
            Self-Hosted Proxy Infrastructure
          </motion.h1>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            Deploy your own secure proxy infrastructure with our open-source solution. Take control of your
            data and customize the proxy to your needs.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className='mt-10 flex items-center gap-x-6'
          >
            <a
              href='#documentation'
              className='rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
            >
              View Documentation
            </a>
            <a
              href='https://github.com/noor-codes/proxy'
              className='group text-sm font-semibold leading-6 text-gray-900 hover:text-green-600 inline-flex items-center gap-x-2 transition-all duration-300'
            >
              GitHub{' '}
              <span
                aria-hidden='true'
                className='transition-transform duration-300 group-hover:translate-x-1'
              >
                →
              </span>
            </a>
          </motion.div>

          {/* Creator Attribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className='mt-16 pt-8 border-t border-gray-200/60'
          >
            <a
              href='https://noorullah.dev'
              target='_blank'
              rel='noopener noreferrer'
              className='group inline-flex items-center gap-x-2 text-sm'
            >
              <span className='text-gray-600'>Built by</span>
              <span className='font-medium text-gray-900 group-hover:text-green-600 transition-colors duration-300'>
                Noorullah Ahmadzai
              </span>
              <ArrowTopRightOnSquareIcon className='h-4 w-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300' />
            </a>
          </motion.div>
        </motion.div>

        {/* Right side - Server Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-44 lg:ml-10 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32'
        >
          <div className='max-w-xl lg:max-w-lg'>
            <div className='grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-12'>
              {stats.map((stat) => (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className='flex flex-col-reverse gap-y-3 border-l border-green-200/30 pl-6'
                >
                  <dt className='text-base leading-7 text-gray-600'>{stat.name}</dt>
                  <dd className='text-3xl font-semibold tracking-tight text-gray-900'>{stat.value}</dd>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

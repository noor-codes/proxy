import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, StarIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'Documentation', href: '#documentation' },
  { name: 'GitHub', href: 'https://github.com/noor-codes/proxy' },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='absolute inset-x-0 top-0 z-50 backdrop-blur-md bg-white/70'
    >
      <nav className='flex items-center justify-between p-6 lg:px-8' aria-label='Global'>
        <div className='flex lg:flex-1'>
          <Link to='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Proxy</span>
            <span className='text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
              Proxy
            </span>
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <div className='hidden lg:flex lg:gap-x-12'>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-sm font-semibold leading-6 text-gray-900 hover:text-green-600 transition-colors'
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
          <a
            href='https://github.com/noor-codes/proxy'
            className='group text-sm font-semibold leading-6 text-gray-900 hover:text-green-600 inline-flex items-center gap-x-2 transition-all duration-300'
            target='_blank'
            rel='noopener noreferrer'
          >
            <StarIcon className='h-5 w-5 transition-transform duration-300 group-hover:scale-110' />
            Star
          </a>
        </div>
      </nav>
      <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className='fixed inset-0 z-50' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white/90 backdrop-blur-lg px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <Link to='/' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Proxy</span>
              <span className='text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
                Proxy
              </span>
            </Link>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </motion.header>
  )
}

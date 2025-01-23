import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      <main className="relative">
        {/* Background decoration */}
        <div className="absolute inset-x-0 top-0 h-[1000px] overflow-hidden -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-blue-50 opacity-50" />
          <div
            className="absolute -top-[40rem] left-1/2 -z-10 transform -translate-x-1/2 blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1200/800] w-[90rem] bg-gradient-to-tr from-primary-200 to-primary-400 opacity-20"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>
        {children}
      </main>
      <Footer />
    </div>
  )
}

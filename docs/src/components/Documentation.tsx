import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import docs from '../content/docs.md?raw'

interface CodeProps {
  node?: any
  inline?: boolean
  className?: string
  children?: React.ReactNode
}

const SyntaxHighlighterComponent = SyntaxHighlighter as any

export default function Documentation() {
  return (
    <div id="documentation" className='relative isolate px-6 py-24 sm:py-32 lg:px-8 bg-white'>
      {/* Background gradient */}
      <div className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
        <div
          className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-500 to-emerald-500 opacity-5 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className='mx-auto max-w-4xl divide-y divide-gray-900/10'>
        <article className='prose prose-lg prose-emerald max-w-none'>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className, children, ...props }: CodeProps) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighterComponent
                    style={dracula}
                    language={match[1]}
                    PreTag='div'
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighterComponent>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
              h1: ({ children }) => (
                <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className='text-3xl font-bold tracking-tight text-gray-900 mt-16 first:mt-0'>
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className='text-2xl font-semibold tracking-tight text-gray-900'>{children}</h3>
              ),
              p: ({ children }) => <p className='mt-6 text-xl leading-8 text-gray-600'>{children}</p>,
              ul: ({ children }) => (
                <ul className='mt-8 space-y-4 text-xl leading-8 text-gray-600'>{children}</ul>
              ),
              li: ({ children }) => (
                <li className='flex gap-x-3 items-start'>
                  <span className='text-primary-600'>•</span>
                  <span>{children}</span>
                </li>
              ),
            }}
          >
            {docs}
          </ReactMarkdown>
        </article>
      </div>

      {/* Bottom gradient */}
      <div className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'>
        <div
          className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-green-500 to-emerald-500 opacity-5 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  )
}
